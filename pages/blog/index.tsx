// pages/blog/index.tsx
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Post } from "../../lib/types";
import { listPosts } from "../../lib/mockPosts";

/** 日付の見やすい整形（YYYY/MM/DD HH:mm） */
function formatDate(iso: string) {
  const d = new Date(iso);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `${y}/${m}/${day} ${hh}:${mm}`;
}

/** ステータスバッジ */
function StatusBadge({ status }: { status: "draft" | "published" }) {
  const base = "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium";
  if (status === "draft") {
    return <span className={`${base} bg-yellow-50 text-yellow-700 ring-1 ring-yellow-200`}>● 下書き</span>;
  }
  return <span className={`${base} bg-green-50 text-green-700 ring-1 ring-green-200`}>● 公開中</span>;
}

/** ローディング用の簡易スケルトン */
function SkeletonCard() {
  return (
    <li className="rounded-xl border border-gray-200 p-4 shadow-sm">
      <div className="h-5 w-2/3 animate-pulse rounded bg-gray-200" />
      <div className="mt-2 h-4 w-1/3 animate-pulse rounded bg-gray-200" />
      <div className="mt-4 flex gap-2">
        <div className="h-8 w-20 animate-pulse rounded bg-gray-200" />
        <div className="h-8 w-24 animate-pulse rounded bg-gray-200" />
      </div>
    </li>
  );
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
    <main className="mx-auto max-w-6xl px-5 py-8">
      {/* ヘッダー（タイトル + 新規ボタン） */}
      <div className="sticky top-0 z-10 -mx-5 mb-6 border-b border-gray-200 bg-white/90 px-5 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <h1 className="text-xl font-semibold tracking-tight text-gray-900">ブログ管理</h1>
          <Link
            href="/blog/new"
            className="inline-flex items-center rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            ＋ 新規記事
          </Link>
        </div>
      </div>

      {/* フィルター行（検索 + ステータスタブ + 件数） */}
      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 items-center gap-2">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="検索：タイトル / 本文"
            className="w-full max-w-md rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500"
          />
          <span className="hidden text-sm text-gray-500 md:inline">該当：{filtered.length}件</span>
        </div>

        <div className="inline-flex overflow-hidden rounded-lg border border-gray-200">
          {(["all", "draft", "published"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={[
                "px-3 py-2 text-sm",
                status === s ? "bg-gray-900 text-white" : "bg-white text-gray-700 hover:bg-gray-50",
              ].join(" ")}
              aria-pressed={status === s}
            >
              {s === "all" ? "すべて" : s === "draft" ? "下書き" : "公開中"}
            </button>
          ))}
        </div>
      </div>

      {/* 空状態 */}
      {!loading && filtered.length === 0 && (
        <div className="rounded-xl border border-dashed border-gray-300 p-10 text-center">
          <p className="text-gray-600">該当する記事がありません。</p>
          <div className="mt-4">
            <Link
              href="/blog/new"
              className="inline-flex items-center rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              ＋ 最初の記事を作成
            </Link>
          </div>
        </div>
      )}

      {/* 一覧カード */}
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          : filtered.map((p) => (
              <li
                key={p.id}
                className="group rounded-xl border border-gray-200 p-4 shadow-sm transition hover:shadow-md"
              >
                <div className="mb-2 flex items-center justify-between">
                  <StatusBadge status={p.status} />
                  <time className="text-xs text-gray-500">{formatDate(p.updatedAt)}</time>
                </div>

                <h2 className="line-clamp-2 min-h-[3rem] text-base font-semibold text-gray-900">
                  {p.title}
                </h2>

                <p className="mt-2 line-clamp-2 min-h-[2.5rem] text-sm text-gray-600">
                  {p.content || "（本文未入力）"}
                </p>

                <div className="mt-4 flex gap-2">
                  <Link
                    href={`/blog/edit/${p.id}`}
                    className="inline-flex flex-1 items-center justify-center rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    編集
                  </Link>
                  <Link
                    href={`/blog/preview/${p.id}`}
                    className="inline-flex flex-1 items-center justify-center rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:opacity-90"
                  >
                    プレビュー
                  </Link>
                </div>
              </li>
            ))}
      </ul>

      {/* 戻るリンク */}
      <div className="mt-8">
        <Link href="/dashboard-v2" className="text-sm text-indigo-600 hover:underline">
          ← Dashboard v2 に戻る
        </Link>
      </div>
    </main>
  );
}

