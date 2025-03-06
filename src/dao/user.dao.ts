import { db } from '../../database/index';
import { users } from '../../database/schema';
import { eq } from "drizzle-orm";

// 사용자 생성
export const createUser = async (name: string, email: string, password: string) => {
    return await db.insert(users).values({ name, email, password });
};

// 사용자 조회 (단일 사용자)
export const getUserById = async (id: number) => {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || null;  // 배열 대신 단일 객체 반환
};

// 모든 사용자 조회
export const getAllUsers = async () => {
    return await db.select().from(users);
};

// 사용자 업데이트 (선택적 업데이트)
export const updateUser = async (id: number, data: Partial<{ name: string, email: string, password: string }>) => {
    return await db.update(users).set(data).where(eq(users.id, id));
};

// 사용자 삭제
export const deleteUser = async (id: number) => {
    return await db.delete(users).where(eq(users.id, id));
};
``
