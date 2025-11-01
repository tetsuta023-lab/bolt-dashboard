// pages/blog/index.tsx
import Link from "next/link";
import { useMemo, useState } from "react";
import { posts as seedPosts, type BlogPost } from "../../lib/blog/data";

export default function BlogIndex() {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<"all" | "draft" | "published">("all");

  const posts = useMemo(() => {
    let list = seedPosts;
    if (tab !== "all") list = list.filter((p) => p.status === tab);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q)
      );
    }
    // 新しい日付順
    return [...list].sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [query, tab]);

  const badge = (s: BlogPost["status"]) => (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs ${
        s === "published"
          ? "bg-green-100 text-green-700"
          : "bg-amber-100 text-amber-700"
      }`}
    >
      {s === "published" ? "公開中" : "下書き"}
    </span>
  );

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold">✏️ ブログ管理</h1>
        <Link
          href="/blog/new"
          className="rounded-md bg-indigo-600 px-3 py-2 text-white hover:bg-indigo-700"
        >
          + 新規記事
        </Link>
      </div>

      <div className="mb-5 flex flex-wrap items-center gap-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="検索：タイトルや本文"
          className="w-72 rounded-md border border-gray-300 px-3 py-2"
        />
        <div className="flex gap-2">
          {[
            { k: "all", label: "すべて" },
            { k: "draft", label: "下書き" },
            { k: "published", label: "公開中" },
          ].map((t) => (
            <button
              key={t.k}
              onClick={() => setTab(t.k as any)}
              className={`rounded-md border px-3 py-1.5 text-sm ${
                tab === t.k
                  ? "border-indigo-600 text-indigo-600"
                  : "border-gray-300 text-gray-700"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <span className="text-sm text-gray-500">{posts.length}件</span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {posts.map((p) => (
          <div
            key={p.id}
            className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
          >
            <div className="mb-2 flex items-center justify-between">
              {badge(p.status)}
              <span className="text-xs text-gray-500">{p.date}</span>
            </div>
            <h3 className="mb-1 text-base font-semibold">{p.title}</h3>
            <p className="mb-3 line-clamp-2 text-sm text-gray-600">
              {p.excerpt}
            </p>
            <div className="flex gap-2">
              <Link
                href={`/blog/edit/${p.id}`}
                className="rounded-md border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-50"
              >
                編集
              </Link>
              <Link
                href={`/blog/preview/${p.id}`}
                className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm text-white hover:bg-indigo-700"
              >
                プレビュー
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <Link href="/dashboard-v2" className="text-indigo-600 underline">
          ← Dashboard v2 に戻る
        </Link>
      </div>
    </main>
  );
}
