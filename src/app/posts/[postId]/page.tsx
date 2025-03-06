import { Post } from "@/types/post.type";
import Link from "next/link";
import { notFound } from "next/navigation";

// 게시글 가져오기 함수
async function getPost(postId: number): Promise<Post | null> {
  if (!postId || isNaN(postId)) return null;

  try {
    // 서버 클라이언트는 절대 url필요
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"; // 없으면 기본값
    const res = await fetch(`${baseUrl}/api/posts/${postId}`, { cache: "no-store" });

    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("게시글 조회 오류:", error);
    return null;
  }
}

// 게시글 상세 페이지 컴포넌트 (Next15)
export default async function PostPage({ params }: { params: Promise<{ postId: string }> } ){
  // `postId`가 유효한지 확인
  const param = await params;
  const postId = param.postId

  // 게시글 조회
  const post = await getPost(Number(postId));
  if (!post) notFound(); // 게시글이 없으면 404 페이지 이동

  return (
    <main className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="text-sm text-gray-500 mt-2">
        작성자: {post.userName} • {new Date(post.createdAt).toLocaleString()}
      </p>
      <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow">
        <p className="text-lg">{post.content}</p>
      </div>
      <Link href="/" className="mt-4 block text-blue-500 underline">목록으로</Link>
    </main>
  );
}
