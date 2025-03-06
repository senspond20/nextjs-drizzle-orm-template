import { NextRequest, NextResponse } from "next/server";
import { getPostById } from "@/dao/post.dao";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ postId: string }> } 
) {
    const { postId } = await params;  
    const post = await getPostById(Number(postId));
    if (!post) {
        return NextResponse.json({ message: "게시물을 찾을 수 없습니다." }, { status: 404 });
    }
    return NextResponse.json(post);
}
