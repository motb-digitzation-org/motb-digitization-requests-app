import {
  bigint,
  bigserial,
  boolean,
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * When to use text vs varchar?
 * Text = a string with no max length constraint; use when you need flexibility (user-generated content, dynamic descriptions)
 *
 * Varchar = a string with a max length constraint; use when you require strict length limits
 */

// ============ ENUMS = table constraints and restrictions for data types
export const userRoleEnum = pgEnum("user_role", ["requester", "fulfiller"]);

// ============ TABLE SCHEMAS
export const usersTable = pgTable("users", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  firstName: varchar("first_name", { length: 255 }).notNull(),
  lastName: varchar("last_name", { length: 255 }).notNull(),
  email: text("email").notNull().unique(),
  role: userRoleEnum("role").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const requestsTable = pgTable(
  "requests",
  {
    id: bigserial("id", { mode: "number" }).primaryKey(),
    objectClass: text("object_class").notNull(), // from dropdown
    objectName: text("object_name").notNull(),
    objectCode: text("object_code").notNull(), // e.x.: MOTB.BIB.000123
    objectTier: integer("object_tier"), // tier 1 - 4
    objectOnDisplay: boolean("object_on_display").default(false).notNull(), // on display? y/n
    objectLocation: text("object_location"),
    objectWidth: text("object_width"),
    objectHeight: text("object_height"),
    objectDepth: text("object_depth"),
    objectMule: text("object_mule"), // who pulled the object?
    objectPulledDate: timestamp("object_pulled_date"), // the date the object was pulled
    objectPutBackDate: timestamp("object_put_back_date"), // the date the object was put back
    requestDueDate: timestamp("request_due_date"),
    requestType: text("request_type").notNull(), // BC100, TSR, MSI
    requestNotes: text("request_notes"), // i.e.: additional notes
    requestStartDate: timestamp("request_start_date"), // when did digitisation start?
    requestEndDate: timestamp("request_end_date"), // when did you finish?
    requestExportDate: timestamp("request_export_date"), // when were all images exported?
    requestTotalImgSize: text("request_total_img_size"),
    requestStatus: text("request_status").notNull(),
    adminNotes: text("admin_notes"), // i.e.: digitisation notes
    userId: bigint("user_id", { mode: "number" })
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    index("requests_user_idx").on(table.userId),
    index("requests_object_code_idx").on(table.objectCode),
    /**
     * If you don't index user_id, PostgreSQL scans the entire table
     * If you do index user_id, PostgreSQL jumps directly to that user's rows
     *
     * this becomes critical once you have 100K+ rows
     */
  ],
);

export const sessionsTable = pgTable(
  "sessions",
  {
    id: bigserial("id", { mode: "number" }).primaryKey(),
    sessionName: text("session_name").notNull(), // e.x.: MOTB.BIB.00123_LP_Session001
    imageCount: integer("image_count"), // total number of imgs (typically 100)
    sessionQC1: boolean("qc1").default(false).notNull(), // finish QC1? y/n
    sessionQC2: boolean("qc2").default(false).notNull(), // finish QC2? y/n
    requestId: bigint("request_id", { mode: "number" })
      .notNull()
      .references(() => requestsTable.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [index("sessions_request_idx").on(table.requestId)],
);
