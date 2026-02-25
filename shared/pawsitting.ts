// ─── Animal Categories ───────────────────────────────────────────────
export const ANIMAL_CATEGORIES = [
  { id: "dogs", label: "Dogs", icon: "Dog", emoji: "🐕" },
  { id: "cats", label: "Cats", icon: "Cat", emoji: "🐈" },
  { id: "horses", label: "Horses", icon: "Horse", emoji: "🐴" },
  { id: "goats", label: "Goats", icon: "Goat", emoji: "🐐" },
  { id: "peacocks", label: "Peacocks", icon: "Bird", emoji: "🦚" },
  { id: "livestock", label: "Livestock", icon: "Beef", emoji: "🐄" },
  { id: "exotic", label: "Exotic Animals", icon: "Rabbit", emoji: "🦎" },
  { id: "farm", label: "Farm Animals", icon: "Tractor", emoji: "🐓" },
] as const;

export type AnimalCategory = (typeof ANIMAL_CATEGORIES)[number]["id"];

// ─── Service Tiers ───────────────────────────────────────────────────
export const SERVICE_TIERS = [
  {
    id: "basic",
    name: "Drop-In Visit",
    description: "Quick check-in, feeding, and love",
    priceRange: "$20-35/visit",
    features: ["30-minute visit", "Feeding & fresh water", "Medication administration", "Photo updates", "Pet report card"],
  },
  {
    id: "standard",
    name: "Pet Sitting",
    description: "Extended care for your companion animals",
    priceRange: "$35-60/visit",
    features: ["1-hour visit", "Walking & playtime", "Feeding & medication", "GPS walk tracking", "Real-time pet cam", "AI health insights", "Detailed report card"],
  },
  {
    id: "premium",
    name: "Overnight Stay",
    description: "24/7 care in your home",
    priceRange: "$65-100/night",
    features: ["Overnight in-home care", "Morning & evening routines", "Multiple walks", "Real-time updates", "Emergency vet coordination", "Full pet cam access"],
  },
  {
    id: "farm_ranch",
    name: "Farm & Ranch",
    description: "Premium care for large & exotic animals — our Blue Ocean specialty",
    priceRange: "$75-200+/visit",
    features: [
      "Horses, goats, peacocks, livestock",
      "Feeding & watering routines",
      "Pasture & barn checks",
      "Health monitoring & logging",
      "Exotic animal specialized care",
      "Emergency vet coordination",
      "AI health insights",
      "Comprehensive report card",
    ],
    isBlueOcean: true,
  },
] as const;

// ─── Service Area Cities ─────────────────────────────────────────────
export const SERVICE_CITIES = [
  {
    id: "wellington",
    name: "Wellington",
    state: "CO",
    tagline: "Where ranch meets town",
    description: "Serving Wellington and surrounding rural areas with expert pet and farm animal care. From neighborhood dogs to ranch horses, we cover it all.",
    features: ["Rural & ranch properties", "Large animal expertise", "Farm visits"],
  },
  {
    id: "fort-collins",
    name: "Fort Collins",
    state: "CO",
    tagline: "NoCo's pet-friendly hub",
    description: "Professional pet sitting in Fort Collins — from Old Town condos to mountain-view ranches. We care for every animal in the Choice City.",
    features: ["Urban & suburban coverage", "CSU area service", "Mountain property visits"],
  },
  {
    id: "loveland",
    name: "Loveland",
    state: "CO",
    tagline: "The Sweetheart City loves its pets",
    description: "Loveland pet sitting services for all animals. Whether you have a house cat or a herd of goats, PawSitting has you covered.",
    features: ["City & rural coverage", "Lake area service", "Hobby farm visits"],
  },
  {
    id: "evans",
    name: "Evans",
    state: "CO",
    tagline: "Growing community, growing herds",
    description: "Evans and Greeley-area pet and farm animal sitting. Affordable, reliable care for companion and livestock animals alike.",
    features: ["Affordable rates", "Agricultural area expertise", "Livestock care"],
  },
  {
    id: "timnath",
    name: "Timnath",
    state: "CO",
    tagline: "New neighborhoods, timeless care",
    description: "Pet sitting in Timnath's growing community. From new subdivisions to established ranches, we provide top-tier animal care.",
    features: ["New development coverage", "HOA-friendly service", "Mixed property types"],
  },
  {
    id: "berthoud",
    name: "Berthoud",
    state: "CO",
    tagline: "Small town heart, big animal care",
    description: "Berthoud pet and farm animal sitting. A small-town approach to animal care with big-city technology and AI-powered service.",
    features: ["Small-town personal service", "Agricultural properties", "Mountain-adjacent coverage"],
  },
  {
    id: "noco-farm",
    name: "Northern Colorado",
    state: "CO",
    tagline: "The only farm & ranch pet sitting service in NoCo",
    description: "The first and only pet sitting service in Northern Colorado that specializes in farm and ranch animals. Horses, goats, peacocks, livestock, and exotic animals — no other service does what we do.",
    features: ["Entire NoCo coverage", "Farm & ranch specialty", "Exotic animal expertise", "Blue Ocean service"],
  },
] as const;

export type CityId = (typeof SERVICE_CITIES)[number]["id"];

// ─── Moods & Health Statuses ─────────────────────────────────────────
export const PET_MOODS = ["happy", "calm", "playful", "anxious", "tired", "energetic"] as const;
export const HEALTH_STATUSES = ["excellent", "good", "fair", "needs_attention"] as const;
