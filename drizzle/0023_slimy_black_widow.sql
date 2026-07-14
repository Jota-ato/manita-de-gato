CREATE TYPE "public"."roles" AS ENUM ('customer', 'admin', 'employee');--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "role" SET DATA TYPE "public"."roles" USING "role"::"public"."roles";--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'customer';