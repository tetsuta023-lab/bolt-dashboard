// pages/blog/preview/[id].tsx
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import { BLOG_POSTS } from "../../../lib/blog/data";

export default function BlogPreviewPage() {
  const router = useRouter();
  const { id } = router.query;

  const post = BLOG_POSTS.find(p => String(p.id) === String(id));

  if (!post) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-xl font-semibold mb-6">記事が見つかりませんでした</h1>
        <Link href="/blog" className="text-indigo-600 hover:underline">← ブログ管理へ戻る</Link>
      </main>
    );
  }

  return (
    <>
      <Head>
        <title>{post.title} | プレビュー</title>
        <meta name="description" content={post.excerpt} />
      </Head>

      <main className="max-w-3xl mx-auto px-4 py-10">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">{post.title}</h1>
          <span className={`text-sm px-2 py-1 rounded ${
            post.status === "published" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-800"
          }`}>
            {post.status === "published" ? "公開中" : "下書き"}
          </span>
        </div>

        <p className="text-gray-500 text-sm mb-4">{post.date}</p>

        {post.thumbnail && (
          <img
            src={post.thumbnail}
            alt={post.title}
            className="w-full rounded-md mb-6"
          />
        )}

        {/* 本文（Markdownっぽく見える簡易表示：改行を反映） */}
        <article className="prose max-w-none">
          {post.body ? (
            post.body.split("\n").map((line, i) => (
              <p key={i} className="mb-3 whitespace-pre-wrap">{line}</p>
            ))
          ) : (
            <p className="text-gray-600">
              本文が未入力です。編集ページから本文（body）を追加してください。
            </p>
          )}
        </article>

        <div className="mt-10 flex gap-4">
          <Link href="/blog" className="text-indigo-600 hover:underline">← ブログ管理へ</Link>
          <Link href={`/blog/edit/${post.id}`} className="text-gray-600 hover:underline">編集する →</Link>
        </div>
      </main>
    </>
  );
}
