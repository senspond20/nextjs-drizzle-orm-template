import { NextRequest, NextResponse } from "next/server";
import { getPosts, createPost } from "@/dao/post.dao";

// GET: 게시글 목록 조회 (페이징 포함)
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    try {
        const posts = await getPosts(page, limit);
        return NextResponse.json(posts);
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

// POST: 새 게시글 생성
export async function POST(req: NextRequest) {
    try {
        const { title, content, userId } = await req.json();
        if (!title || !content || !userId) {
            return NextResponse.json({ message: "필수 필드가 누락되었습니다." }, { status: 400 });
        }

        const newPost = await createPost(title, content, userId);
        return NextResponse.json(newPost, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
