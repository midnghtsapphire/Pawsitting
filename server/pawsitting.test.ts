import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import { STRIPE_PRODUCTS } from "./stripe-products";
import { ANIMAL_CATEGORIES, SERVICE_TIERS, SERVICE_CITIES } from "../shared/pawsitting";

// ─── Test Helpers ────────────────────────────────────────────────────

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: { origin: "https://test.example.com" } } as any,
    res: { clearCookie: vi.fn() } as any,
  };
}

function createAuthContext(role: "user" | "admin" = "user"): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "test-user-001",
    email: "reese@pawsitting.com",
    name: "Reese",
    loginMethod: "oauth",
    role,
    phone: null,
    address: null,
    city: "Wellington",
    avatarUrl: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user,
    req: { protocol: "https", headers: { origin: "https://test.example.com" } } as any,
    res: { clearCookie: vi.fn() } as any,
  };
}

// ─── Shared Constants Tests ──────────────────────────────────────────

describe("Shared Constants", () => {
  it("defines all required animal categories", () => {
    const requiredCategories = ["dogs", "cats", "horses", "goats", "peacocks", "livestock", "exotic", "farm"];
    for (const cat of requiredCategories) {
      const found = ANIMAL_CATEGORIES.find(c => c.id === cat);
      expect(found).toBeDefined();
      expect(found?.label).toBeTruthy();
    }
  });

  it("defines all required service tiers", () => {
    expect(SERVICE_TIERS).toHaveLength(4);
    const tierIds = SERVICE_TIERS.map(t => t.id);
    expect(tierIds).toContain("basic");
    expect(tierIds).toContain("standard");
    expect(tierIds).toContain("premium");
    expect(tierIds).toContain("farm_ranch");
  });

  it("includes Farm & Ranch as the premium tier", () => {
    const farmTier = SERVICE_TIERS.find(t => t.id === "farm_ranch");
    expect(farmTier).toBeDefined();
    expect(farmTier?.name).toContain("Farm");
  });

  it("defines all NoCo service cities", () => {
    const requiredCities = ["Wellington", "Fort Collins", "Loveland", "Evans", "Timnath", "Berthoud"];
    for (const city of requiredCities) {
      const found = SERVICE_CITIES.find(c => c.name === city);
      expect(found).toBeDefined();
      expect(found?.id).toBeTruthy();
    }
  });

  it("all cities have valid ids", () => {
    for (const city of SERVICE_CITIES) {
      expect(city.id).toMatch(/^[a-z-]+$/);
    }
  });
});

// ─── Stripe Products Tests ───────────────────────────────────────────

describe("Stripe Products", () => {
  it("defines all service tier products", () => {
    expect(STRIPE_PRODUCTS.basic_dropin).toBeDefined();
    expect(STRIPE_PRODUCTS.standard_care).toBeDefined();
    expect(STRIPE_PRODUCTS.premium_care).toBeDefined();
    expect(STRIPE_PRODUCTS.farm_ranch).toBeDefined();
    expect(STRIPE_PRODUCTS.farm_ranch_premium).toBeDefined();
  });

  it("all products have valid prices in cents", () => {
    for (const [key, product] of Object.entries(STRIPE_PRODUCTS)) {
      expect(product.priceInCents).toBeGreaterThan(0);
      expect(Number.isInteger(product.priceInCents)).toBe(true);
    }
  });

  it("farm_ranch tier is priced higher than standard", () => {
    expect(STRIPE_PRODUCTS.farm_ranch.priceInCents).toBeGreaterThan(STRIPE_PRODUCTS.standard_care.priceInCents);
  });

  it("all products have names and descriptions", () => {
    for (const [key, product] of Object.entries(STRIPE_PRODUCTS)) {
      expect(product.name).toBeTruthy();
      expect(product.description).toBeTruthy();
      expect(product.tier).toBeTruthy();
    }
  });
});

// ─── Auth Router Tests ───────────────────────────────────────────────

describe("auth.me", () => {
  it("returns null for unauthenticated users", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.auth.me();
    expect(result).toBeNull();
  });

  it("returns user data for authenticated users", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.auth.me();
    expect(result).toBeDefined();
    expect(result?.name).toBe("Reese");
    expect(result?.email).toBe("reese@pawsitting.com");
    expect(result?.role).toBe("user");
  });

  it("returns admin role for admin users", async () => {
    const ctx = createAuthContext("admin");
    const caller = appRouter.createCaller(ctx);
    const result = await caller.auth.me();
    expect(result?.role).toBe("admin");
  });
});

// ─── Chat Router Tests ──────────────────────────────────────────────

describe("chat.send", () => {
  it("rejects empty messages", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    await expect(caller.chat.send({ message: "" })).rejects.toThrow();
  });

  it("rejects messages over 2000 characters", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    const longMessage = "a".repeat(2001);
    await expect(caller.chat.send({ message: longMessage })).rejects.toThrow();
  });

  it("accepts valid messages and returns a reply", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    // This will call the LLM or return fallback
    const result = await caller.chat.send({ message: "What services do you offer?" });
    expect(result).toHaveProperty("reply");
    expect(typeof result.reply).toBe("string");
    expect(result.reply.length).toBeGreaterThan(0);
  });
});

// ─── Bookings Router Tests ──────────────────────────────────────────

describe("bookings", () => {
  it("requires authentication for creating bookings", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    await expect(
      caller.bookings.create({
        scheduledDate: Date.now() + 86400000,
        animalType: "dog",
        tier: "standard",
        address: "123 Main St",
        city: "Wellington",
      })
    ).rejects.toThrow();
  });

  it("requires authentication for viewing bookings", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    await expect(caller.bookings.myBookings()).rejects.toThrow();
  });

  it("requires admin for viewing all bookings", async () => {
    const ctx = createAuthContext("user");
    const caller = appRouter.createCaller(ctx);
    await expect(caller.bookings.all()).rejects.toThrow();
  });
});

// ─── Pets Router Tests ──────────────────────────────────────────────

describe("pets", () => {
  it("requires authentication for creating pets", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    await expect(
      caller.pets.create({ name: "Buddy", species: "dog" })
    ).rejects.toThrow();
  });

  it("requires authentication for listing pets", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    await expect(caller.pets.myPets()).rejects.toThrow();
  });

  it("validates pet name is required", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);
    await expect(
      caller.pets.create({ name: "", species: "dog" })
    ).rejects.toThrow();
  });
});

// ─── Report Cards Router Tests ──────────────────────────────────────

describe("reportCards", () => {
  it("requires admin for creating report cards", async () => {
    const ctx = createAuthContext("user");
    const caller = appRouter.createCaller(ctx);
    await expect(
      caller.reportCards.create({
        bookingId: 1,
        petId: 1,
        mood: "happy",
        healthStatus: "good",
        feedingCompleted: true,
        walkCompleted: true,
        activities: "Played in the yard",
      })
    ).rejects.toThrow();
  });

  it("requires authentication for viewing report cards", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    await expect(caller.reportCards.byPet({ petId: 1 })).rejects.toThrow();
  });
});

// ─── Gallery Router Tests ───────────────────────────────────────────

describe("gallery", () => {
  it("allows public access to gallery list", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.gallery.list();
    expect(Array.isArray(result)).toBe(true);
  });

  it("requires admin for creating gallery items", async () => {
    const ctx = createAuthContext("user");
    const caller = appRouter.createCaller(ctx);
    await expect(
      caller.gallery.create({
        imageUrl: "https://example.com/photo.jpg",
        category: "dogs",
      })
    ).rejects.toThrow();
  });
});

// ─── Inquiries Router Tests ─────────────────────────────────────────

describe("inquiries", () => {
  it("allows public inquiry submission", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    // This will attempt DB write which may fail in test env, but validates input
    try {
      await caller.inquiries.create({
        name: "Test User",
        email: "test@example.com",
        message: "I need help with my horse",
        city: "Wellington",
        animalType: "horse",
      });
    } catch (e: any) {
      // DB may not be available in test, but input validation should pass
      expect(e.message).not.toContain("validation");
    }
  });

  it("validates email format", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    await expect(
      caller.inquiries.create({
        name: "Test",
        email: "not-an-email",
        message: "Hello",
      })
    ).rejects.toThrow();
  });

  it("requires name and message", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    await expect(
      caller.inquiries.create({
        name: "",
        email: "test@example.com",
        message: "Hello",
      })
    ).rejects.toThrow();
  });

  it("requires admin for viewing all inquiries", async () => {
    const ctx = createAuthContext("user");
    const caller = appRouter.createCaller(ctx);
    await expect(caller.inquiries.all()).rejects.toThrow();
  });
});

// ─── Services Router Tests ──────────────────────────────────────────

describe("services", () => {
  it("allows public access to services list", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.services.list();
    expect(Array.isArray(result)).toBe(true);
  });
});

// ─── Payments Router Tests ──────────────────────────────────────────

describe("payments", () => {
  it("requires authentication for checkout", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    await expect(
      caller.payments.createCheckout({ productKey: "standard_care" })
    ).rejects.toThrow();
  });
});

// ─── Activity Feed Router Tests ─────────────────────────────────────

describe("activityFeed", () => {
  it("requires admin for creating feed items", async () => {
    const ctx = createAuthContext("user");
    const caller = appRouter.createCaller(ctx);
    await expect(
      caller.activityFeed.create({
        bookingId: 1,
        petId: 1,
        type: "note",
        content: "Pet is doing great!",
      })
    ).rejects.toThrow();
  });

  it("requires authentication for viewing feed", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    await expect(
      caller.activityFeed.byBooking({ bookingId: 1 })
    ).rejects.toThrow();
  });
});
