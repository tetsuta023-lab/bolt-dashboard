// pages/blog/edit/[id].tsx
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { posts as seedPosts, type BlogPost } from "../../../lib/blog/data";

export default function BlogEdit() {
  const router = useRouter();
  const id = Number(router.query.id);
  const initial = useMemo(
    () => seedPosts.find((p) => p.id === id),
    [id]
  );

  const [title, setTitle] = useState(initial?.title ?? "");
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [status, setStatus] = useState<BlogPost["status"]>(
    initial?.status ?? "draft"
  );

  if (!initial) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-8">
        <p className="text-gray-600">記事が見つかりません。（id: {id}）</p>
        <Link href="/blog" className="text-indigo-600 underline">
          ← 一覧へ
        </Link>
      </main>
    );
  }

  const fakeSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert("（デモ）フォーム値を保存するなら Supabase 連携を追加します。");
    router.push(`/blog/preview/${id}`);
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold">📝 記事を編集</h1>
        <Link href={`/blog/preview/${id}`} className="text-indigo-600 underline">
          プレビューを見る →
        </Link>
      </div>

      <form onSubmit={fakeSave} className="space-y-5">
        <div>
          <label className="mb-1 block text-sm font-medium">タイトル</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">概要（抜粋）</label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={4}
            className="w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">ステータス</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as BlogPost["status"])}
            className="rounded-md border border-gray-300 px-3 py-2"
          >
            <option value="draft">下書き</option>
            <option value="published">公開中</option>
          </select>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
          >
            保存（デモ）
          </button>
          <Link href="/blog" className="text-gray-600 underline">
            キャンセル
          </Link>
        </div>
      </form>
    </main>
  );
}
