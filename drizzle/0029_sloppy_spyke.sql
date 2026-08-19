CREATE TYPE "public"."order_status" AS ENUM('reserved', 'in_production', 'sent', 'delivered');--> statement-breakpoint
CREATE TABLE "molds" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"customer_id" uuid NOT NULL,
	"design" varchar(150) NOT NULL,
	"shape" varchar(100) NOT NULL,
	"reference_image_url" text,
	"delivery_date" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"total_price" numeric(10, 2) NOT NULL,
	"amount_paid" numeric(10, 2) DEFAULT '0.00' NOT NULL,
	"left_hand_measures" smallint[] NOT NULL,
	"right_hand_measures" smallint[] NOT NULL,
	"note" text,
	"status" "order_status" DEFAULT 'reserved' NOT NULL
);
--> statement-breakpoint
ALTER TABLE "molds" ADD CONSTRAINT "molds_customer_id_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_molds_customer_id" ON "molds" USING btree ("customer_id");--> statement-breakpoint
CREATE INDEX "idx_molds_status" ON "molds" USING btree ("status");