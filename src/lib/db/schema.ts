import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

export const $letters = pgTable('letters', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    content: text('content').notNull()
});

export type LetterType = typeof $letters.$inferInsert;