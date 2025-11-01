import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Post } from "../../lib/types";
import { listPosts } from "../../lib/mockPosts";

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("ja-JP", { year: "numeric", month: "short", day: "numeric" });
}

function StatusBadge({ status }: { status: "draft" | "published" }) {
  const base =
    "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ring-1";
  if (status === "draft") {
    return <span className={`${base} bg-yellow-50 text-yellow-700 ring-yellow-200`}>● 下書き</span>;
  }
  return <span className={`${base} bg-green-50 text-green-700 ring-green-200`}>● 公開中</span>;
}

export default function BlogIndex() {
  const [items, setItems] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<"all" | "draft" | "published">("all");

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await listPosts();
      setItems(data);
      setLoading(false);
    })();
  }, []);

  const filtered = useMemo(() => {
    return items.filter((p) => {
      const hitQ =
        !q ||
        p.title.toLowerCase().includes(q.toLowerCase()) ||
        p.content.toLowerCase().includes(q.toLowerCase());
      const hitS = status === "all" ? true : p.status === status;
      return hitQ && hitS;
    });
  }, [items, q, status]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100">
      {/* ヘッダー */}
      <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <h1 className="text-xl font-semibold tracking-tight text-gray-800">
            ✏️ ブログ管理
          </h1>
          <Link
            href="/blog/new"
            className="rounded-lg bg-gradient-to-r from-indigo-600 to-blue-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:opacity-90"
          >
            ＋ 新規記事
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-5 py-8">
        {/* 検索・フィルター */}
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="🔍 検索：タイトルや本文を入力"
            className="w-full max-w-md rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500"
          />

          <div className="inline-flex overflow-hidden rounded-lg border border-gray-200 shadow-sm">
            {(["all", "draft", "published"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                className={[
                  "px-3 py-2 text-sm font-medium transition-all",
                  status === s
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50",
                ].join(" ")}
              >
                {s === "all" ? "すべて" : s === "draft" ? "下書き" : "公開中"}
              </button>
            ))}
          </div>
        </div>

        {/* カード */}
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <li
              key={p.id}
              className="group rounded-xl border border-gray-200 bg-white/70 p-5 shadow-sm backdrop-blur transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-3 flex items-center justify-between">
                <StatusBadge status={p.status} />
                <time className="text-xs text-gray-500">{formatDate(p.updatedAt)}</time>
              </div>
              <h2 className="line-clamp-2 text-base font-semibold text-gray-900 group-hover:text-indigo-600">
                {p.title}
              </h2>
              <p className="mt-2 line-clamp-3 text-sm text-gray-600">{p.content}</p>
              <div className="mt-4 flex gap-2">
                <Link
                  href={`/blog/edit/${p.id}`}
                  className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  編集
                </Link>
                <Link
                  href={`/blog/preview/${p.id}`}
                  className="flex-1 rounded-lg bg-indigo-600 px-3 py-2 text-sm text-white hover:opacity-90"
                >
                  プレビュー
                </Link>
              </div>
            </li>
          ))}
        </ul>

        {/* 空表示 */}
        {!loading && filtered.length === 0 && (
          <div className="mt-10 rounded-xl border border-dashed border-gray-300 bg-white/70 p-10 text-center text-gray-600">
            該当する記事がありません。
          </div>
        )}
      </section>
    </main>
  );
}
