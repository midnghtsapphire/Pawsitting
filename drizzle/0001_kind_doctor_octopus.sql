CREATE TABLE `activityFeed` (
	`id` int AUTO_INCREMENT NOT NULL,
	`bookingId` int NOT NULL,
	`petId` int NOT NULL,
	`type` enum('photo','video','note','health_check','feeding','walk_start','walk_end') NOT NULL DEFAULT 'note',
	`content` text,
	`mediaUrl` text,
	`timestamp` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `activityFeed_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `bookings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`clientId` int NOT NULL,
	`petId` int,
	`serviceId` int NOT NULL,
	`status` enum('pending','confirmed','in_progress','completed','cancelled') NOT NULL DEFAULT 'pending',
	`scheduledDate` timestamp NOT NULL,
	`endDate` timestamp,
	`address` text,
	`city` varchar(100),
	`specialInstructions` text,
	`totalPrice` decimal(10,2),
	`stripePaymentId` varchar(255),
	`paymentStatus` enum('unpaid','paid','refunded') NOT NULL DEFAULT 'unpaid',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `bookings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `chatMessages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`sessionId` varchar(100) NOT NULL,
	`userId` int,
	`role` enum('user','assistant') NOT NULL,
	`content` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `chatMessages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `galleryItems` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(200),
	`description` text,
	`imageUrl` text NOT NULL,
	`category` varchar(50) NOT NULL,
	`animalName` varchar(100),
	`featured` boolean DEFAULT false,
	`sortOrder` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `galleryItems_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `inquiries` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(200) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(20),
	`city` varchar(100),
	`animalType` varchar(50),
	`message` text NOT NULL,
	`status` enum('new','responded','closed') NOT NULL DEFAULT 'new',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `inquiries_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `pets` (
	`id` int AUTO_INCREMENT NOT NULL,
	`ownerId` int NOT NULL,
	`name` varchar(100) NOT NULL,
	`species` varchar(50) NOT NULL,
	`breed` varchar(100),
	`age` varchar(50),
	`weight` varchar(50),
	`specialNeeds` text,
	`medications` text,
	`vetInfo` text,
	`photoUrl` text,
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `pets_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `reportCards` (
	`id` int AUTO_INCREMENT NOT NULL,
	`bookingId` int NOT NULL,
	`petId` int NOT NULL,
	`sitterId` int NOT NULL,
	`mood` enum('happy','calm','playful','anxious','tired','energetic') NOT NULL DEFAULT 'happy',
	`healthStatus` enum('excellent','good','fair','needs_attention') NOT NULL DEFAULT 'good',
	`feedingCompleted` boolean DEFAULT false,
	`walkCompleted` boolean DEFAULT false,
	`walkDuration` int,
	`walkDistance` decimal(5,2),
	`gpsTrackData` json,
	`activities` text,
	`notes` text,
	`aiInsights` text,
	`photoUrls` json,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `reportCards_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `services` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(200) NOT NULL,
	`description` text,
	`category` varchar(50) NOT NULL,
	`animalTypes` json,
	`tier` enum('basic','standard','premium','farm_ranch') NOT NULL DEFAULT 'standard',
	`pricePerVisit` decimal(10,2),
	`pricePerHour` decimal(10,2),
	`pricePerDay` decimal(10,2),
	`duration` varchar(50),
	`isActive` boolean NOT NULL DEFAULT true,
	`iconName` varchar(50),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `services_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `users` ADD `phone` varchar(20);--> statement-breakpoint
ALTER TABLE `users` ADD `address` text;--> statement-breakpoint
ALTER TABLE `users` ADD `city` varchar(100);--> statement-breakpoint
ALTER TABLE `users` ADD `avatarUrl` text;