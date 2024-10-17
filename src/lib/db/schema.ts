import { sql } from "drizzle-orm";
import { pgTable, serial, timestamp, text, varchar } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    fname: varchar('fname', { length: 100 }).notNull(),
    lname: varchar('lname', {length: 100}).notNull(),
    email: varchar('email', { length: 100 }).notNull(),
    provider: varchar('provider', { length: 20 }),
    externalId: varchar('externalId', { length: 100 }).notNull(), 
    image: text('image'),
    role: varchar('role', { length: 12 }).notNull().default('customer'), 
    updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`),
    createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`)
})

