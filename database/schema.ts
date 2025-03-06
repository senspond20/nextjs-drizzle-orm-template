import { pgTable, serial, text, varchar, timestamp, integer } from 'drizzle-orm/pg-core';

// 사용자 테이블 정의
export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    password: text('password').notNull(),
});

// 게시물 테이블 정의 (외래 키 수정)
export const posts = pgTable('posts', {
    id: serial('id').primaryKey(),
    title: varchar('title', { length: 255 }).notNull(),
    content: text('content').notNull(),
    userId: integer('user_id').notNull().references(() => users.id),  
    createdAt: timestamp('created_at').defaultNow(),
});