# PawSitting API Documentation

**Protocol:** tRPC v11 over HTTP
**Base Path:** `/api/trpc`
**Transport:** SuperJSON
**Last Updated:** February 2026

---

## Authentication

All protected endpoints require a valid session cookie obtained through the OAuth flow. The session cookie is set automatically after successful authentication at `/api/oauth/callback`.

| Procedure Level | Description |
|----------------|-------------|
| `publicProcedure` | No authentication required |
| `protectedProcedure` | Requires valid session (any authenticated user) |
| `adminProcedure` | Requires admin role |

---

## Endpoints

### auth.me
**Type:** Query | **Access:** Public

Returns the current authenticated user or `null`.

**Response:** `User | null`

---

### auth.logout
**Type:** Mutation | **Access:** Public

Clears the session cookie and logs the user out.

**Response:** `{ success: true }`

---

### chat.send
**Type:** Mutation | **Access:** Public

Sends a message to the AI chat assistant and receives a response. The assistant has full context about PawSitting services, pricing, service areas, and animal types.

**Input:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| message | string | Yes | User message (1-2000 chars) |

**Response:** `{ reply: string }`

---

### bookings.create
**Type:** Mutation | **Access:** Protected

Creates a new booking request.

**Input:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| scheduledDate | number | Yes | UTC timestamp (ms) |
| animalType | string | Yes | Animal species |
| tier | string | Yes | Service tier |
| petName | string | No | Pet name |
| address | string | Yes | Service address |
| city | string | Yes | City name |
| specialInstructions | string | No | Special notes |

**Response:** `{ success: true }`

---

### bookings.myBookings
**Type:** Query | **Access:** Protected

Returns all bookings for the authenticated user, ordered by scheduled date descending.

**Response:** `Booking[]`

---

### bookings.all
**Type:** Query | **Access:** Admin

Returns all bookings across all users.

**Response:** `Booking[]`

---

### bookings.updateStatus
**Type:** Mutation | **Access:** Admin

Updates the status of a booking.

**Input:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| bookingId | number | Yes | Booking ID |
| status | enum | Yes | pending, confirmed, in_progress, completed, cancelled |

**Response:** `{ success: true }`

---

### pets.create
**Type:** Mutation | **Access:** Protected

Registers a new pet for the authenticated user.

**Input:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | Yes | Pet name |
| species | string | Yes | Animal species |
| breed | string | No | Breed |
| age | string | No | Age |
| weight | string | No | Weight |
| specialNeeds | string | No | Special needs |
| medications | string | No | Medications |
| vetInfo | string | No | Vet contact |
| notes | string | No | Additional notes |

**Response:** `{ success: true }`

---

### pets.myPets
**Type:** Query | **Access:** Protected

Returns all pets belonging to the authenticated user.

**Response:** `Pet[]`

---

### reportCards.create
**Type:** Mutation | **Access:** Admin

Creates a report card for a pet visit. Automatically generates AI insights based on the visit data.

**Input:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| bookingId | number | Yes | Booking ID |
| petId | number | Yes | Pet ID |
| mood | enum | Yes | happy, calm, playful, anxious, tired, energetic |
| healthStatus | enum | Yes | excellent, good, fair, needs_attention |
| feedingCompleted | boolean | Yes | Feeding done |
| walkCompleted | boolean | Yes | Walk done |
| walkDuration | number | No | Walk minutes |
| walkDistance | string | No | Walk miles |
| activities | string | Yes | Activity description |
| notes | string | No | Additional notes |

**Response:** `{ success: true }`

---

### reportCards.byPet
**Type:** Query | **Access:** Protected

Returns all report cards for a specific pet.

**Input:** `{ petId: number }`

**Response:** `ReportCard[]`

---

### activityFeed.create
**Type:** Mutation | **Access:** Admin

Creates a new activity feed entry (Pet Cam update).

**Input:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| bookingId | number | Yes | Booking ID |
| petId | number | Yes | Pet ID |
| type | enum | Yes | photo, video, note, health_check, feeding, walk_start, walk_end |
| content | string | No | Text content |
| mediaUrl | string | No | Media URL |

**Response:** `{ success: true }`

---

### activityFeed.byBooking
**Type:** Query | **Access:** Protected

Returns activity feed for a specific booking.

**Input:** `{ bookingId: number }`

**Response:** `ActivityFeedItem[]`

---

### gallery.list
**Type:** Query | **Access:** Public

Returns all gallery items.

**Response:** `GalleryItem[]`

---

### gallery.create
**Type:** Mutation | **Access:** Admin

Adds a new gallery image.

**Input:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| title | string | No | Image title |
| description | string | No | Description |
| imageUrl | string | Yes | Image URL |
| category | string | Yes | Animal category |
| animalName | string | No | Animal name |
| featured | boolean | No | Featured flag |

**Response:** `{ success: true }`

---

### inquiries.create
**Type:** Mutation | **Access:** Public

Submits a contact inquiry.

**Input:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | Yes | Contact name |
| email | string | Yes | Valid email |
| phone | string | No | Phone number |
| city | string | No | City |
| animalType | string | No | Animal type |
| message | string | Yes | Inquiry text |

**Response:** `{ success: true }`

---

### inquiries.all
**Type:** Query | **Access:** Admin

Returns all contact inquiries.

**Response:** `Inquiry[]`

---

### services.list
**Type:** Query | **Access:** Public

Returns all active services.

**Response:** `Service[]`

---

### payments.createCheckout
**Type:** Mutation | **Access:** Protected

Creates a Stripe Checkout session for payment.

**Input:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| productKey | string | Yes | Product key from stripe-products.ts |
| bookingId | number | No | Associated booking ID |

**Response:** `{ checkoutUrl: string }`

---

## Webhook Endpoints

### POST /api/stripe/webhook

Handles Stripe webhook events. Requires raw body parsing and signature verification.

**Events Handled:**
- `checkout.session.completed` — Payment completed
- `payment_intent.succeeded` — Payment successful
- `payment_intent.payment_failed` — Payment failed

---

## Error Handling

All tRPC procedures return typed errors:

| Code | Description |
|------|-------------|
| UNAUTHORIZED | No valid session |
| FORBIDDEN | Insufficient permissions (admin required) |
| BAD_REQUEST | Invalid input |
| INTERNAL_SERVER_ERROR | Server error |
