import { relations } from "drizzle-orm";
import { requestsTable, sessionsTable, usersTable } from "./schema";

// one-to-many: one user can have many requests
export const userRelations = relations(usersTable, ({ many }) => ({
  requests: many(requestsTable),
}));

// many-to-one:  many requests belong to one user
// one-to-many: one request can have many sessions
export const requestsRelations = relations(requestsTable, ({ one, many }) => ({
  user: one(usersTable, {
    fields: [requestsTable.userId],
    references: [usersTable.id],
  }),
  sessions: many(sessionsTable),
}));

// many-to-one: many sessions belong to one request
export const sessionsRelations = relations(sessionsTable, ({ one }) => ({
  request: one(requestsTable, {
    fields: [sessionsTable.requestId],
    references: [requestsTable.id],
  }),
}));


/**
 * Current table structure:
 * User
 ├─ Request A
 │   ├─ Session 1
 │   └─ Session 2
 │
 └─ Request B
     ├─ Session 1
     └─ Session 2
 */