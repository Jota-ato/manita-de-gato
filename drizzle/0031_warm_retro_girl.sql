ALTER TABLE "molds" ALTER COLUMN "status" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "molds" ALTER COLUMN "status" SET DEFAULT 'reserved'::text;--> statement-breakpoint
DROP TYPE "public"."order_status";--> statement-breakpoint
CREATE TYPE "public"."order_status" AS ENUM('reserved', 'in_production', 'sent', 'delivered', 'cancelled');--> statement-breakpoint
ALTER TABLE "molds" ALTER COLUMN "status" SET DEFAULT 'reserved'::"public"."order_status";--> statement-breakpoint
ALTER TABLE "molds" ALTER COLUMN "status" SET DATA TYPE "public"."order_status" USING "status"::"public"."order_status";