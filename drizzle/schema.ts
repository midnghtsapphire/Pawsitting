import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean, json, decimal } from "drizzle-orm/mysql-core";

// ─── Users ───────────────────────────────────────────────────────────
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  phone: varchar("phone", { length: 20 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  address: text("address"),
  city: varchar("city", { length: 100 }),
  avatarUrl: text("avatarUrl"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// ─── Pets ────────────────────────────────────────────────────────────
export const pets = mysqlTable("pets", {
  id: int("id").autoincrement().primaryKey(),
  ownerId: int("ownerId").notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  species: varchar("species", { length: 50 }).notNull(), // dog, cat, horse, goat, peacock, livestock, exotic, farm
  breed: varchar("breed", { length: 100 }),
  age: varchar("age", { length: 50 }),
  weight: varchar("weight", { length: 50 }),
  specialNeeds: text("specialNeeds"),
  medications: text("medications"),
  vetInfo: text("vetInfo"),
  photoUrl: text("photoUrl"),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Pet = typeof pets.$inferSelect;
export type InsertPet = typeof pets.$inferInsert;

// ─── Services ────────────────────────────────────────────────────────
export const services = mysqlTable("services", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  description: text("description"),
  category: varchar("category", { length: 50 }).notNull(), // standard, farm_ranch, exotic
  animalTypes: json("animalTypes"), // ["dog","cat"] etc
  tier: mysqlEnum("tier", ["basic", "standard", "premium", "farm_ranch"]).default("standard").notNull(),
  pricePerVisit: decimal("pricePerVisit", { precision: 10, scale: 2 }),
  pricePerHour: decimal("pricePerHour", { precision: 10, scale: 2 }),
  pricePerDay: decimal("pricePerDay", { precision: 10, scale: 2 }),
  duration: varchar("duration", { length: 50 }), // "30min", "1hr", "full-day"
  isActive: boolean("isActive").default(true).notNull(),
  iconName: varchar("iconName", { length: 50 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Service = typeof services.$inferSelect;
export type InsertService = typeof services.$inferInsert;

// ─── Bookings ────────────────────────────────────────────────────────
export const bookings = mysqlTable("bookings", {
  id: int("id").autoincrement().primaryKey(),
  clientId: int("clientId").notNull(),
  petId: int("petId"),
  serviceId: int("serviceId").notNull(),
  status: mysqlEnum("status", ["pending", "confirmed", "in_progress", "completed", "cancelled"]).default("pending").notNull(),
  scheduledDate: timestamp("scheduledDate").notNull(),
  endDate: timestamp("endDate"),
  address: text("address"),
  city: varchar("city", { length: 100 }),
  specialInstructions: text("specialInstructions"),
  totalPrice: decimal("totalPrice", { precision: 10, scale: 2 }),
  stripePaymentId: varchar("stripePaymentId", { length: 255 }),
  paymentStatus: mysqlEnum("paymentStatus", ["unpaid", "paid", "refunded"]).default("unpaid").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = typeof bookings.$inferInsert;

// ─── Report Cards ────────────────────────────────────────────────────
export const reportCards = mysqlTable("reportCards", {
  id: int("id").autoincrement().primaryKey(),
  bookingId: int("bookingId").notNull(),
  petId: int("petId").notNull(),
  sitterId: int("sitterId").notNull(),
  mood: mysqlEnum("mood", ["happy", "calm", "playful", "anxious", "tired", "energetic"]).default("happy").notNull(),
  healthStatus: mysqlEnum("healthStatus", ["excellent", "good", "fair", "needs_attention"]).default("good").notNull(),
  feedingCompleted: boolean("feedingCompleted").default(false),
  walkCompleted: boolean("walkCompleted").default(false),
  walkDuration: int("walkDuration"), // minutes
  walkDistance: decimal("walkDistance", { precision: 5, scale: 2 }), // miles
  gpsTrackData: json("gpsTrackData"), // [{lat, lng, timestamp}]
  activities: text("activities"),
  notes: text("notes"),
  aiInsights: text("aiInsights"),
  photoUrls: json("photoUrls"), // ["url1","url2"]
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ReportCard = typeof reportCards.$inferSelect;
export type InsertReportCard = typeof reportCards.$inferInsert;

// ─── Pet Cam / Activity Feed ─────────────────────────────────────────
export const activityFeed = mysqlTable("activityFeed", {
  id: int("id").autoincrement().primaryKey(),
  bookingId: int("bookingId").notNull(),
  petId: int("petId").notNull(),
  type: mysqlEnum("type", ["photo", "video", "note", "health_check", "feeding", "walk_start", "walk_end"]).default("note").notNull(),
  content: text("content"),
  mediaUrl: text("mediaUrl"),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ActivityFeedItem = typeof activityFeed.$inferSelect;
export type InsertActivityFeedItem = typeof activityFeed.$inferInsert;

// ─── Gallery ─────────────────────────────────────────────────────────
export const galleryItems = mysqlTable("galleryItems", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 200 }),
  description: text("description"),
  imageUrl: text("imageUrl").notNull(),
  category: varchar("category", { length: 50 }).notNull(), // dog, cat, horse, goat, peacock, livestock, exotic, farm
  animalName: varchar("animalName", { length: 100 }),
  featured: boolean("featured").default(false),
  sortOrder: int("sortOrder").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type GalleryItem = typeof galleryItems.$inferSelect;
export type InsertGalleryItem = typeof galleryItems.$inferInsert;

// ─── Chat Messages ───────────────────────────────────────────────────
export const chatMessages = mysqlTable("chatMessages", {
  id: int("id").autoincrement().primaryKey(),
  sessionId: varchar("sessionId", { length: 100 }).notNull(),
  userId: int("userId"),
  role: mysqlEnum("role", ["user", "assistant"]).notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ChatMessage = typeof chatMessages.$inferSelect;
export type InsertChatMessage = typeof chatMessages.$inferInsert;

// ─── Contact Inquiries ───────────────────────────────────────────────
export const inquiries = mysqlTable("inquiries", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  city: varchar("city", { length: 100 }),
  animalType: varchar("animalType", { length: 50 }),
  message: text("message").notNull(),
  status: mysqlEnum("status", ["new", "responded", "closed"]).default("new").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Inquiry = typeof inquiries.$inferSelect;
export type InsertInquiry = typeof inquiries.$inferInsert;
