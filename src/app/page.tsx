"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Post } from "@/types/post.type";


export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // 데이터 가져오기 함수
  const fetchPosts = async (currentPage: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/posts?page=${currentPage}&limit=5`);
      if (!res.ok) throw new Error("게시글을 불러오는 중 오류가 발생했습니다.");
      const data = await res.json();

      console.log(data)
      
      setPosts(data.posts || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error("게시글 로딩 오류:", error);
    } finally {
      setLoading(false);
    }
  };

  // 페이지 변경 시 데이터 로드
  useEffect(() => {

    fetchPosts(page);
  }, [page]);

  return (
    <main className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">게시판</h1>

      <div className="mt-4 space-y-4">
        {loading ? (
          <p className="text-center text-gray-500">게시글을 불러오는 중...</p>
        ) : (
          posts.length > 0 ? (
            posts.map((post) => (
              <Link key={post.id} href={`/posts/${post.id}`} className="block p-4 bg-gray-100 rounded-lg shadow">
                <h2 className="text-xl font-semibold">{post.title}</h2>
                <p className="text-gray-700">{post.content}</p>
                <p className="text-sm text-gray-500">작성자: {post.userName}</p>
                <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleString()}</p>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-500">게시글이 없습니다.</p>
          )
        )}
      </div>

      {/* 페이지네이션 */}
      <div className="mt-4 flex justify-center space-x-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page <= 1 || loading}
          className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
        >
          ◀ 이전
        </button>
        <span className="px-4 py-2">{page} / {totalPages}</span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page >= totalPages || loading}
          className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
        >
          다음 ▶
        </button>
      </div>
    </main>
  );
}
