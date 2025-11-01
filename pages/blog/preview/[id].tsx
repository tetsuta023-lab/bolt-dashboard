// pages/blog/preview/[id].tsx
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { posts } from "../../../lib/blog/data";

export default function BlogPreview() {
  const router = useRouter();
  const id = Number(router.query.id);
  const post = posts.find((p) => p.id === id);

  if (!post) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-8">
        <p className="text-gray-600">記事が見つかりません。（id: {id}）</p>
        <Link href="/blog" className="text-indigo-600 underline">
          ← 一覧へ
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold">👀 プレビュー</h1>
        <Link href={`/blog/edit/${id}`} className="text-indigo-600 underline">
          編集へ戻る →
        </Link>
      </div>

      <article className="prose max-w-none">
        <h2>{post.title}</h2>
        <p className="text-sm text-gray-500">{post.date}</p>
        <p>
          <span
            className={`rounded-full px-2 py-0.5 text-xs ${
              post.status === "published"
                ? "bg-green-100 text-green-700"
                : "bg-amber-100 text-amber-700"
            }`}
          >
            {post.status === "published" ? "公開中" : "下書き"}
          </span>
        </p>

        {post.thumbnail && (
          <div className="my-4 overflow-hidden rounded-md border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" src={post.thumbnail} className="w-full" />
          </div>
        )}

        <p className="text-gray-700">{post.excerpt}</p>
        <hr />
        <p className="text-gray-500">
          ※デモ表示です。本文や保存は次のステップで Supabase と接続します。
        </p>
      </article>
    </main>
  );
}
