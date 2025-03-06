import { db } from '../../database/index';
import { posts, users } from '../../database/schema';
import { eq, sql } from "drizzle-orm";

// 게시물 생성
export const createPost = async (title: string, content: string, userId: number) => {
    return await db.insert(posts).values({ title, content, userId });
};

// 게시물 조회 (단일 조회)
export const getPostById = async (postId: number) => {
    const [post] = await db
        .select({
            id: posts.id,
            title: posts.title,
            content: posts.content,
            createdAt: posts.createdAt,
            userId: users.id,
            userName: users.name, // 작성자 이름 추가
        })
        .from(posts)
        .leftJoin(users, eq(posts.userId, users.id))
        .where(eq(posts.id, postId));

    return post || null;
};

//게시물 조회 (페이징 지원 + 유저 정보 포함)
export const getPosts = async (page: number = 1, limit: number = 10) => {
    const offset = (page - 1) * limit;

    // 1. 전체 게시글 수 가져오기 (페이징 적용 전)
    const [{ count }] = await db.select({ count: sql<number>`COUNT(*)` }).from(posts);

    // 2. 게시글 목록 가져오기 (JOIN으로 유저 정보 포함)
    const data = await db
        .select({
            id: posts.id,
            title: posts.title,
            content: posts.content,
            createdAt: posts.createdAt,
            userId: users.id,
            userName: users.name, // 작성자 이름 추가
        })
        .from(posts)
        .leftJoin(users, eq(posts.userId, users.id)) // 유저 정보 가져오기
        .limit(limit)
        .offset(offset);

    return {
        posts: data,
        total: count || 0,
        page,
        totalPages: Math.ceil((count || 0) / limit),
    };
};


// 게시물 업데이트 (선택적 업데이트 지원)
export const updatePost = async (id: number, data: Partial<{ title: string, content: string }>) => {
    return await db.update(posts).set(data).where(eq(posts.id, id));
};

// 게시물 삭제
export const deletePost = async (id: number) => {
    return await db.delete(posts).where(eq(posts.id, id));
};
