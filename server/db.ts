import { eq, desc, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertUser, users,
  pets, InsertPet,
  bookings, InsertBooking,
  reportCards, InsertReportCard,
  activityFeed, InsertActivityFeedItem,
  galleryItems, InsertGalleryItem,
  chatMessages, InsertChatMessage,
  inquiries, InsertInquiry,
  services, InsertService,
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// ─── Users ──────────────────────────────────────────────────────────
export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }
  const db = await getDb();
  if (!db) { console.warn("[Database] Cannot upsert user: database not available"); return; }

  try {
    const values: InsertUser = { openId: user.openId };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];
    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };
    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) { values.lastSignedIn = user.lastSignedIn; updateSet.lastSignedIn = user.lastSignedIn; }
    if (user.role !== undefined) { values.role = user.role; updateSet.role = user.role; }
    else if (user.openId === ENV.ownerOpenId) { values.role = 'admin'; updateSet.role = 'admin'; }
    if (!values.lastSignedIn) { values.lastSignedIn = new Date(); }
    if (Object.keys(updateSet).length === 0) { updateSet.lastSignedIn = new Date(); }

    await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) { console.warn("[Database] Cannot get user: database not available"); return undefined; }
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// ─── Bookings ───────────────────────────────────────────────────────
export async function createBooking(data: InsertBooking) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(bookings).values(data);
  return { success: true };
}

export async function getBookingsByClient(clientId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(bookings).where(eq(bookings.clientId, clientId)).orderBy(desc(bookings.scheduledDate));
}

export async function getAllBookings() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(bookings).orderBy(desc(bookings.scheduledDate));
}

export async function updateBookingStatus(bookingId: number, status: "pending" | "confirmed" | "in_progress" | "completed" | "cancelled") {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(bookings).set({ status }).where(eq(bookings.id, bookingId));
  return { success: true };
}

// ─── Pets ───────────────────────────────────────────────────────────
export async function createPet(data: InsertPet) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(pets).values(data);
  return { success: true };
}

export async function getPetsByOwner(ownerId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(pets).where(eq(pets.ownerId, ownerId));
}

// ─── Report Cards ───────────────────────────────────────────────────
export async function createReportCard(data: InsertReportCard) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(reportCards).values(data);
  return { success: true };
}

export async function getReportCardsByBooking(bookingId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(reportCards).where(eq(reportCards.bookingId, bookingId)).orderBy(desc(reportCards.createdAt));
}

export async function getReportCardsByPet(petId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(reportCards).where(eq(reportCards.petId, petId)).orderBy(desc(reportCards.createdAt));
}

// ─── Activity Feed (Pet Cam) ────────────────────────────────────────
export async function createActivityFeedItem(data: InsertActivityFeedItem) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(activityFeed).values(data);
  return { success: true };
}

export async function getActivityFeedByBooking(bookingId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(activityFeed).where(eq(activityFeed.bookingId, bookingId)).orderBy(desc(activityFeed.timestamp));
}

// ─── Gallery ────────────────────────────────────────────────────────
export async function getGalleryItems() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(galleryItems).orderBy(desc(galleryItems.createdAt));
}

export async function createGalleryItem(data: InsertGalleryItem) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(galleryItems).values(data);
  return { success: true };
}

// ─── Chat Messages ──────────────────────────────────────────────────
export async function saveChatMessage(data: InsertChatMessage) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(chatMessages).values(data);
  return { success: true };
}

export async function getChatHistory(sessionId: string, limit = 20) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(chatMessages).where(eq(chatMessages.sessionId, sessionId)).orderBy(desc(chatMessages.createdAt)).limit(limit);
}

// ─── Inquiries ──────────────────────────────────────────────────────
export async function createInquiry(data: InsertInquiry) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(inquiries).values(data);
  return { success: true };
}

export async function getAllInquiries() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(inquiries).orderBy(desc(inquiries.createdAt));
}

// ─── Services ───────────────────────────────────────────────────────
export async function getActiveServices() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(services).where(eq(services.isActive, true));
}
