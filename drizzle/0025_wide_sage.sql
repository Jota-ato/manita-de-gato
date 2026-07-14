CREATE TABLE "business_controls" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"start_hour" integer NOT NULL,
	"slot_duration" integer NOT NULL,
	"slots_per_day" integer NOT NULL
);
