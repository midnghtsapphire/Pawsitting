import express from "express";
import Stripe from "stripe";
import { ENV } from "./_core/env";

export function registerStripeWebhook(app: express.Express) {
  const stripe = new Stripe(ENV.stripeSecretKey || "", { apiVersion: "2026-01-28.clover" });

  // MUST be registered BEFORE express.json() middleware
  app.post(
    "/api/stripe/webhook",
    express.raw({ type: "application/json" }),
    async (req, res) => {
      const sig = req.headers["stripe-signature"];
      if (!sig || !ENV.stripeWebhookSecret) {
        return res.status(400).json({ error: "Missing signature or webhook secret" });
      }

      let event: Stripe.Event;
      try {
        event = stripe.webhooks.constructEvent(req.body, sig, ENV.stripeWebhookSecret);
      } catch (err: any) {
        console.error("[Stripe Webhook] Signature verification failed:", err.message);
        return res.status(400).json({ error: `Webhook Error: ${err.message}` });
      }

      // Handle test events
      if (event.id.startsWith("evt_test_")) {
        console.log("[Webhook] Test event detected, returning verification response");
        return res.json({ verified: true });
      }

      console.log(`[Stripe Webhook] Received event: ${event.type} (${event.id})`);

      try {
        switch (event.type) {
          case "checkout.session.completed": {
            const session = event.data.object as Stripe.Checkout.Session;
            console.log(`[Stripe] Checkout completed for user: ${session.metadata?.user_id}, amount: ${session.amount_total}`);
            // Update booking payment status via metadata
            break;
          }
          case "payment_intent.succeeded": {
            const pi = event.data.object as Stripe.PaymentIntent;
            console.log(`[Stripe] Payment succeeded: ${pi.id}, amount: ${pi.amount}`);
            break;
          }
          case "payment_intent.payment_failed": {
            const pi = event.data.object as Stripe.PaymentIntent;
            console.log(`[Stripe] Payment failed: ${pi.id}`);
            break;
          }
          default:
            console.log(`[Stripe Webhook] Unhandled event type: ${event.type}`);
        }
      } catch (err) {
        console.error("[Stripe Webhook] Error processing event:", err);
      }

      res.json({ received: true });
    }
  );
}
