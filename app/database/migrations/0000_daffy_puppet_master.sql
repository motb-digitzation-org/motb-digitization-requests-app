CREATE TABLE "requests" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"object_class" text NOT NULL,
	"object_name" text NOT NULL,
	"object_code" text NOT NULL,
	"object_tier" integer,
	"object_on_display" boolean DEFAULT false NOT NULL,
	"object_location" text,
	"object_width" text,
	"object_height" text,
	"object_depth" text,
	"object_mule" text,
	"object_pulled_date" timestamp,
	"object_put_back_date" timestamp,
	"request_due_date" timestamp,
	"request_type" text NOT NULL,
	"request_notes" text,
	"request_start_date" timestamp,
	"request_end_date" timestamp,
	"request_export_date" timestamp,
	"request_total_img_size" text,
	"admin_notes" text,
	"user_id" bigint NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"session_name" text NOT NULL,
	"image_count" integer,
	"qc1" boolean DEFAULT false NOT NULL,
	"qc2" boolean DEFAULT false NOT NULL,
	"request_id" bigint NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"email" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "requests" ADD CONSTRAINT "requests_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_request_id_requests_id_fk" FOREIGN KEY ("request_id") REFERENCES "public"."requests"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "requests_user_idx" ON "requests" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "requests_object_code_idx" ON "requests" USING btree ("object_code");--> statement-breakpoint
CREATE INDEX "sessions_request_idx" ON "sessions" USING btree ("request_id");