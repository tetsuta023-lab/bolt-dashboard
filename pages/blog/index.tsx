// pages/blog/index.tsx
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/blog/data";

export default function BlogIndexPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">✏️ ブログ管理</h1>
        <Link
          href="/blog/new"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          ＋ 新規記事
        </Link>
      </div>

      {/* 投稿カード一覧 */}
      <div className="grid md:grid-cols-2 gap-6">
        {BLOG_POSTS.map((post) => (
          <div
            key={post.id}
            className="border border-gray-200 rounded-lg p-5 shadow-sm bg-white hover:shadow-md transition"
          >
            <div className="flex justify-between items-center mb-2">
              <span
                className={`text-xs px-2 py-1 rounded ${
                  post.status === "published"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {post.status === "published" ? "公開中" : "下書き"}
              </span>
              <span className="text-sm text-gray-500">{post.date}</span>
            </div>

            <h2 className="text-lg font-semibold mb-1">{post.title}</h2>
            <p className="text-sm text-gray-600 mb-4">{post.excerpt}</p>

            <div className="flex gap-2">
              <Link
                href={`/blog/edit/${post.id}`}
                className="px-3 py-1 text-sm rounded-md border border-gray-300 hover:bg-gray-100"
              >
                編集
              </Link>

              <Link
                href={`/blog/preview/${post.id}`} // ← ここがポイント！
                className="px-3 py-1 text-sm rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
              >
                プレビュー
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <Link href="/dashboard-v2" className="text-indigo-600 hover:underline">
          ← Dashboard v2 に戻る
        </Link>
      </div>
    </main>
  );
}
