import { db } from '.'; // Adjust the import path as necessary
import { users, posts } from './schema';

// 초기 데이터 삽입 함수
export const insertInitialData = async () => {
    // 사용자 데이터 삽입
    await db.insert(users).values([
        { name: '홍길동', email: 'hong@example.com', password: 'password123' },
        { name: '김철수', email: 'kim@example.com', password: 'password456' },
    ]);

    // 게시물 데이터 삽입
    await db.insert(posts).values([
        { title: '첫 번째 게시물', content: '이것은 첫 번째 게시물입니다.', userId: 1 },
        { title: '두 번째 게시물', content: '이것은 두 번째 게시물입니다.', userId: 2 },
        ...Array.from({ length: 30 }, (_, i) => ({
            title: `게시물 #${i + 3}`,
            content: `이것은 ${i + 3}번째 게시물입니다.`,
            userId: (i) % 2 + 1,
        }))
    ]);
};

insertInitialData().catch((err) => {
    console.error("❌ Error inserting seed data:", err);
});