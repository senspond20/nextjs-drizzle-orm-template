import { getAllUsers } from "../../src/dao/user.dao";
import { db } from "../../database";  // 데이터베이스 연결 파일

afterAll(async () => {
    // 데이터베이스 연결 종료...;
    if (db.$client) {
        await db.$client.end();
    }
});


test("select Users", async () => {
    const users = await getAllUsers();
    console.log("Retrieved Users:", users);
    
    expect(users).toBeDefined();  // users가 정의되어 있어야 함
    expect(Array.isArray(users)).toBe(true);  // users가 배열인지 확인
    expect(users.length).toBeGreaterThanOrEqual(0);  // 최소 0개 이상의 유저가 있어야 함
});
