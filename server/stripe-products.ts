// PawSitting Stripe Product Configuration
// Defines service tiers and their pricing for Stripe Checkout

export const STRIPE_PRODUCTS = {
  basic_dropin: {
    name: "PawSitting - Basic Drop-In Visit",
    description: "Quick 30-minute check-in for your pet. Includes feeding, water, and a quick update.",
    priceInCents: 2500, // $25
    tier: "basic",
  },
  standard_care: {
    name: "PawSitting - Standard Care Visit",
    description: "Full pet sitting visit with walks, feeding, playtime, and photo updates.",
    priceInCents: 5000, // $50
    tier: "standard",
  },
  premium_care: {
    name: "PawSitting - Premium Care Visit",
    description: "Extended care with GPS walk tracking, detailed report card, and AI health insights.",
    priceInCents: 8000, // $80
    tier: "premium",
  },
  farm_ranch: {
    name: "PawSitting - Farm & Ranch Care",
    description: "Complete farm and ranch animal care. Horses, goats, livestock, and exotic animals. Our Blue Ocean specialty.",
    priceInCents: 15000, // $150
    tier: "farm_ranch",
  },
  farm_ranch_premium: {
    name: "PawSitting - Farm & Ranch Premium (Full Day)",
    description: "Full-day farm and ranch management. Multiple species, barn care, pasture checks, and comprehensive reporting.",
    priceInCents: 20000, // $200
    tier: "farm_ranch",
  },
} as const;

export type StripeProductKey = keyof typeof STRIPE_PRODUCTS;
