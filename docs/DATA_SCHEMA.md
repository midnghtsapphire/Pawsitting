# PawSitting Data Schema

**Database:** MySQL/TiDB
**ORM:** Drizzle ORM
**Last Updated:** February 2026

---

## Entity Relationship Overview

```
Users ─┬─< Pets
       ├─< Bookings ─┬─< ReportCards
       │              └─< ActivityFeed
       └─< ChatMessages

GalleryItems (standalone)
Inquiries (standalone)
Services (standalone)
```

## Table: users

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INT | PK, AUTO_INCREMENT | Surrogate primary key |
| openId | VARCHAR(64) | NOT NULL, UNIQUE | OAuth identifier |
| name | TEXT | NULLABLE | Display name |
| email | VARCHAR(320) | NULLABLE | Email address |
| phone | VARCHAR(20) | NULLABLE | Phone number |
| loginMethod | VARCHAR(64) | NULLABLE | OAuth provider |
| role | ENUM('user','admin') | DEFAULT 'user' | Access control role |
| address | TEXT | NULLABLE | Street address |
| city | VARCHAR(100) | NULLABLE | City name |
| avatarUrl | TEXT | NULLABLE | Profile image URL |
| createdAt | TIMESTAMP | DEFAULT NOW | Account creation |
| updatedAt | TIMESTAMP | ON UPDATE NOW | Last modification |
| lastSignedIn | TIMESTAMP | DEFAULT NOW | Last login |

## Table: pets

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INT | PK, AUTO_INCREMENT | Pet identifier |
| ownerId | INT | NOT NULL, FK→users.id | Pet owner |
| name | VARCHAR(100) | NOT NULL | Pet name |
| species | VARCHAR(50) | NOT NULL | dog, cat, horse, goat, peacock, livestock, exotic, farm |
| breed | VARCHAR(100) | NULLABLE | Breed or variety |
| age | VARCHAR(50) | NULLABLE | Age description |
| weight | VARCHAR(50) | NULLABLE | Weight description |
| specialNeeds | TEXT | NULLABLE | Special care requirements |
| medications | TEXT | NULLABLE | Current medications |
| vetInfo | TEXT | NULLABLE | Veterinarian contact |
| photoUrl | TEXT | NULLABLE | Pet photo URL |
| notes | TEXT | NULLABLE | Additional notes |
| createdAt | TIMESTAMP | DEFAULT NOW | Record creation |
| updatedAt | TIMESTAMP | ON UPDATE NOW | Last modification |

## Table: services

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INT | PK, AUTO_INCREMENT | Service identifier |
| name | VARCHAR(200) | NOT NULL | Service name |
| description | TEXT | NULLABLE | Service description |
| category | VARCHAR(50) | NOT NULL | standard, farm_ranch, exotic |
| animalTypes | JSON | NULLABLE | Array of animal types |
| tier | ENUM | DEFAULT 'standard' | basic, standard, premium, farm_ranch |
| pricePerVisit | DECIMAL(10,2) | NULLABLE | Per-visit price |
| pricePerHour | DECIMAL(10,2) | NULLABLE | Hourly rate |
| pricePerDay | DECIMAL(10,2) | NULLABLE | Daily rate |
| duration | VARCHAR(50) | NULLABLE | Service duration |
| isActive | BOOLEAN | DEFAULT TRUE | Active status |
| iconName | VARCHAR(50) | NULLABLE | Lucide icon name |
| createdAt | TIMESTAMP | DEFAULT NOW | Record creation |

## Table: bookings

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INT | PK, AUTO_INCREMENT | Booking identifier |
| clientId | INT | NOT NULL, FK→users.id | Client who booked |
| petId | INT | NULLABLE, FK→pets.id | Pet being cared for |
| serviceId | INT | NOT NULL, FK→services.id | Service selected |
| status | ENUM | DEFAULT 'pending' | pending, confirmed, in_progress, completed, cancelled |
| scheduledDate | TIMESTAMP | NOT NULL | Scheduled start |
| endDate | TIMESTAMP | NULLABLE | Scheduled end |
| address | TEXT | NULLABLE | Service location |
| city | VARCHAR(100) | NULLABLE | City |
| specialInstructions | TEXT | NULLABLE | Client instructions |
| totalPrice | DECIMAL(10,2) | NULLABLE | Total charge |
| stripePaymentId | VARCHAR(255) | NULLABLE | Stripe payment reference |
| paymentStatus | ENUM | DEFAULT 'unpaid' | unpaid, paid, refunded |
| createdAt | TIMESTAMP | DEFAULT NOW | Record creation |
| updatedAt | TIMESTAMP | ON UPDATE NOW | Last modification |

## Table: reportCards

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INT | PK, AUTO_INCREMENT | Report card identifier |
| bookingId | INT | NOT NULL, FK→bookings.id | Associated booking |
| petId | INT | NOT NULL, FK→pets.id | Pet reported on |
| sitterId | INT | NOT NULL, FK→users.id | Sitter who created |
| mood | ENUM | DEFAULT 'happy' | happy, calm, playful, anxious, tired, energetic |
| healthStatus | ENUM | DEFAULT 'good' | excellent, good, fair, needs_attention |
| feedingCompleted | BOOLEAN | DEFAULT FALSE | Feeding done |
| walkCompleted | BOOLEAN | DEFAULT FALSE | Walk done |
| walkDuration | INT | NULLABLE | Walk minutes |
| walkDistance | DECIMAL(5,2) | NULLABLE | Walk miles |
| gpsTrackData | JSON | NULLABLE | GPS coordinates array |
| activities | TEXT | NULLABLE | Activity description |
| notes | TEXT | NULLABLE | Additional notes |
| aiInsights | TEXT | NULLABLE | AI-generated insights |
| photoUrls | JSON | NULLABLE | Photo URL array |
| createdAt | TIMESTAMP | DEFAULT NOW | Record creation |

## Table: activityFeed

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INT | PK, AUTO_INCREMENT | Feed item identifier |
| bookingId | INT | NOT NULL, FK→bookings.id | Associated booking |
| petId | INT | NOT NULL, FK→pets.id | Pet in activity |
| type | ENUM | DEFAULT 'note' | photo, video, note, health_check, feeding, walk_start, walk_end |
| content | TEXT | NULLABLE | Text content |
| mediaUrl | TEXT | NULLABLE | Media file URL |
| timestamp | TIMESTAMP | DEFAULT NOW | Activity time |
| createdAt | TIMESTAMP | DEFAULT NOW | Record creation |

## Table: galleryItems

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INT | PK, AUTO_INCREMENT | Gallery item identifier |
| title | VARCHAR(200) | NULLABLE | Image title |
| description | TEXT | NULLABLE | Image description |
| imageUrl | TEXT | NOT NULL | Image URL |
| category | VARCHAR(50) | NOT NULL | Animal category |
| animalName | VARCHAR(100) | NULLABLE | Animal name |
| featured | BOOLEAN | DEFAULT FALSE | Featured flag |
| sortOrder | INT | DEFAULT 0 | Display order |
| createdAt | TIMESTAMP | DEFAULT NOW | Record creation |

## Table: chatMessages

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INT | PK, AUTO_INCREMENT | Message identifier |
| sessionId | VARCHAR(100) | NOT NULL | Chat session ID |
| userId | INT | NULLABLE, FK→users.id | User if authenticated |
| role | ENUM('user','assistant') | NOT NULL | Message sender |
| content | TEXT | NOT NULL | Message content |
| createdAt | TIMESTAMP | DEFAULT NOW | Message time |

## Table: inquiries

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INT | PK, AUTO_INCREMENT | Inquiry identifier |
| name | VARCHAR(200) | NOT NULL | Contact name |
| email | VARCHAR(320) | NOT NULL | Contact email |
| phone | VARCHAR(20) | NULLABLE | Contact phone |
| city | VARCHAR(100) | NULLABLE | City |
| animalType | VARCHAR(50) | NULLABLE | Animal type |
| message | TEXT | NOT NULL | Inquiry message |
| status | ENUM | DEFAULT 'new' | new, responded, closed |
| createdAt | TIMESTAMP | DEFAULT NOW | Inquiry time |
