import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, adminProcedure, router } from "./_core/trpc";
import { invokeLLM } from "./_core/llm";
import { ENV } from "./_core/env";
import Stripe from "stripe";
import { STRIPE_PRODUCTS, StripeProductKey } from "./stripe-products";
import {
  createBooking, getBookingsByClient, getAllBookings, updateBookingStatus,
  createPet, getPetsByOwner,
  createReportCard, getReportCardsByPet,
  createActivityFeedItem, getActivityFeedByBooking,
  getGalleryItems, createGalleryItem,
  saveChatMessage, getChatHistory,
  createInquiry, getAllInquiries,
  getActiveServices,
} from "./db";

const PAWSITTING_SYSTEM_PROMPT = `You are PawSitting's AI assistant for a pet and farm animal sitting business in Northern Colorado run by a teenager named Reese.

SERVICE AREAS: Wellington, Fort Collins, Loveland, Evans, Timnath, Berthoud, and all surrounding Northern Colorado (NoCo) areas.

ANIMAL TYPES WE CARE FOR:
- Dogs, Cats (standard pet sitting)
- Horses, Goats, Peacocks, Cattle, Chickens (farm & ranch)
- Reptiles, Small mammals, and other exotic animals

SERVICE TIERS:
1. Basic Drop-In ($20-40/visit) - Quick 30-min check-ins
2. Standard Care ($40-80/visit) - Full visits with walks, feeding, play
3. Premium Care ($60-120/visit) - Extended care with detailed reports, GPS tracking
4. Farm & Ranch ($100-200+/visit) - Our Blue Ocean specialty! Full farm/ranch animal care

KEY FEATURES:
- Pet Report Cards after every visit (photos, health/mood logging, AI insights)
- GPS Walk Tracking for dogs
- Real-time Pet Cam (photo/video activity feed)
- AI-powered health and mood analysis
- Stripe payments for easy booking

BLUE OCEAN DIFFERENTIATOR: We are the ONLY pet sitting service in Northern Colorado that handles farm animals, livestock, and exotic animals. No competitor offers this.

AI FOR GOOD: This business shows how AI helps a teen entrepreneur provide 24/7 customer service. Reese uses AI to compete with established businesses while going to school.

Be friendly, helpful, and knowledgeable. Answer questions about services, pricing, availability, and animal care. If someone wants to book, direct them to the booking page. Keep responses concise but warm.`;

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // ─── AI Chat ────────────────────────────────────────────────────────
  chat: router({
    send: publicProcedure
      .input(z.object({ message: z.string().min(1).max(2000) }))
      .mutation(async ({ input }) => {
        try {
          const result = await invokeLLM({
            messages: [
              { role: "system", content: PAWSITTING_SYSTEM_PROMPT },
              { role: "user", content: input.message },
            ],
          });
          const reply = typeof result.choices[0]?.message?.content === "string"
            ? result.choices[0].message.content
            : "I'm here to help! Ask me about our pet sitting services, pricing, or service areas.";
          return { reply };
        } catch (error) {
          console.error("[Chat] LLM error:", error);
          return {
            reply: "I'm having a little trouble right now, but I'd love to help! You can book a visit directly on our booking page, or try asking me again in a moment. 🐾",
          };
        }
      }),
  }),

  // ─── Bookings ───────────────────────────────────────────────────────
  bookings: router({
    create: protectedProcedure
      .input(z.object({
        scheduledDate: z.number(),
        animalType: z.string(),
        tier: z.string(),
        petName: z.string().optional(),
        address: z.string(),
        city: z.string(),
        specialInstructions: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        // Map tier to a default service ID (1 for now)
        return createBooking({
          clientId: ctx.user.id,
          serviceId: 1,
          scheduledDate: new Date(input.scheduledDate),
          address: input.address,
          city: input.city,
          specialInstructions: input.specialInstructions || null,
          status: "pending",
          paymentStatus: "unpaid",
        });
      }),

    myBookings: protectedProcedure.query(async ({ ctx }) => {
      return getBookingsByClient(ctx.user.id);
    }),

    all: adminProcedure.query(async () => {
      return getAllBookings();
    }),

    updateStatus: adminProcedure
      .input(z.object({
        bookingId: z.number(),
        status: z.enum(["pending", "confirmed", "in_progress", "completed", "cancelled"]),
      }))
      .mutation(async ({ input }) => {
        return updateBookingStatus(input.bookingId, input.status);
      }),
  }),

  // ─── Pets ───────────────────────────────────────────────────────────
  pets: router({
    create: protectedProcedure
      .input(z.object({
        name: z.string().min(1),
        species: z.string(),
        breed: z.string().optional(),
        age: z.string().optional(),
        weight: z.string().optional(),
        specialNeeds: z.string().optional(),
        medications: z.string().optional(),
        vetInfo: z.string().optional(),
        notes: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        return createPet({
          ownerId: ctx.user.id,
          name: input.name,
          species: input.species,
          breed: input.breed || null,
          age: input.age || null,
          weight: input.weight || null,
          specialNeeds: input.specialNeeds || null,
          medications: input.medications || null,
          vetInfo: input.vetInfo || null,
          notes: input.notes || null,
        });
      }),

    myPets: protectedProcedure.query(async ({ ctx }) => {
      return getPetsByOwner(ctx.user.id);
    }),
  }),

  // ─── Report Cards ──────────────────────────────────────────────────
  reportCards: router({
    create: adminProcedure
      .input(z.object({
        bookingId: z.number(),
        petId: z.number(),
        mood: z.enum(["happy", "calm", "playful", "anxious", "tired", "energetic"]),
        healthStatus: z.enum(["excellent", "good", "fair", "needs_attention"]),
        feedingCompleted: z.boolean(),
        walkCompleted: z.boolean(),
        walkDuration: z.number().optional(),
        walkDistance: z.string().optional(),
        activities: z.string(),
        notes: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        // Generate AI insights
        let aiInsights = "";
        try {
          const result = await invokeLLM({
            messages: [
              {
                role: "system",
                content: "You are a pet care AI that generates brief, caring insights about a pet's visit. Be warm and professional. Keep it to 2-3 sentences.",
              },
              {
                role: "user",
                content: `Pet visit report: Mood: ${input.mood}, Health: ${input.healthStatus}, Activities: ${input.activities}, Walk: ${input.walkCompleted ? `${input.walkDuration} min, ${input.walkDistance} mi` : "N/A"}, Feeding: ${input.feedingCompleted ? "Complete" : "N/A"}. Generate a brief AI insight about this visit.`,
              },
            ],
          });
          aiInsights = typeof result.choices[0]?.message?.content === "string"
            ? result.choices[0].message.content
            : "";
        } catch (e) {
          console.error("[ReportCard] AI insights error:", e);
        }

        return createReportCard({
          bookingId: input.bookingId,
          petId: input.petId,
          sitterId: ctx.user.id,
          mood: input.mood,
          healthStatus: input.healthStatus,
          feedingCompleted: input.feedingCompleted,
          walkCompleted: input.walkCompleted,
          walkDuration: input.walkDuration || null,
          walkDistance: input.walkDistance || null,
          activities: input.activities,
          notes: input.notes || null,
          aiInsights,
        });
      }),

    byPet: protectedProcedure
      .input(z.object({ petId: z.number() }))
      .query(async ({ input }) => {
        return getReportCardsByPet(input.petId);
      }),
  }),

  // ─── Activity Feed (Pet Cam) ──────────────────────────────────────
  activityFeed: router({
    create: adminProcedure
      .input(z.object({
        bookingId: z.number(),
        petId: z.number(),
        type: z.enum(["photo", "video", "note", "health_check", "feeding", "walk_start", "walk_end"]),
        content: z.string().optional(),
        mediaUrl: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        return createActivityFeedItem({
          bookingId: input.bookingId,
          petId: input.petId,
          type: input.type,
          content: input.content || null,
          mediaUrl: input.mediaUrl || null,
        });
      }),

    byBooking: protectedProcedure
      .input(z.object({ bookingId: z.number() }))
      .query(async ({ input }) => {
        return getActivityFeedByBooking(input.bookingId);
      }),
  }),

  // ─── Gallery ──────────────────────────────────────────────────────
  gallery: router({
    list: publicProcedure.query(async () => {
      return getGalleryItems();
    }),

    create: adminProcedure
      .input(z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        imageUrl: z.string(),
        category: z.string(),
        animalName: z.string().optional(),
        featured: z.boolean().optional(),
      }))
      .mutation(async ({ input }) => {
        return createGalleryItem({
          title: input.title || null,
          description: input.description || null,
          imageUrl: input.imageUrl,
          category: input.category,
          animalName: input.animalName || null,
          featured: input.featured || false,
        });
      }),
  }),

  // ─── Inquiries ────────────────────────────────────────────────────
  inquiries: router({
    create: publicProcedure
      .input(z.object({
        name: z.string().min(1),
        email: z.string().email(),
        phone: z.string().optional(),
        city: z.string().optional(),
        animalType: z.string().optional(),
        message: z.string().min(1),
      }))
      .mutation(async ({ input }) => {
        return createInquiry({
          name: input.name,
          email: input.email,
          phone: input.phone || null,
          city: input.city || null,
          animalType: input.animalType || null,
          message: input.message,
        });
      }),

    all: adminProcedure.query(async () => {
      return getAllInquiries();
    }),
  }),

  // ─── Services ─────────────────────────────────────────────────────
  services: router({
    list: publicProcedure.query(async () => {
      return getActiveServices();
    }),
  }),

  // ─── Stripe Payments ──────────────────────────────────────────────
  payments: router({
    createCheckout: protectedProcedure
      .input(z.object({
        productKey: z.string(),
        bookingId: z.number().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const stripe = new Stripe(ENV.stripeSecretKey, { apiVersion: "2026-01-28.clover" });
        const product = STRIPE_PRODUCTS[input.productKey as StripeProductKey];
        if (!product) throw new Error("Invalid product");

        const origin = ctx.req.headers.origin || "";
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          line_items: [{
            price_data: {
              currency: "usd",
              product_data: {
                name: product.name,
                description: product.description,
              },
              unit_amount: product.priceInCents,
            },
            quantity: 1,
          }],
          mode: "payment",
          customer_email: ctx.user.email || undefined,
          client_reference_id: ctx.user.id.toString(),
          metadata: {
            user_id: ctx.user.id.toString(),
            customer_name: ctx.user.name || "",
            product_key: input.productKey,
            booking_id: input.bookingId?.toString() || "",
          },
          allow_promotion_codes: true,
          success_url: `${origin}/dashboard?payment=success`,
          cancel_url: `${origin}/booking?payment=cancelled`,
        });

        return { checkoutUrl: session.url };
      }),
  }),
});

export type AppRouter = typeof appRouter;
