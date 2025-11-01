import Link from "next/link";

type Card = { title: string; href: string };

const cards: Card[] = [
  { title: "ブログ管理",       href: "/blog" },
  { title: "神社&旅ログ",      href: "/travel" },
  { title: "マイル&ポイント",  href: "/miles" },
  { title: "Airbnb利益計算",   href: "/airbnb" },
  { title: "Kindle出版",       href: "/kindle" },
  { title: "AI画像倉庫",       href: "/ai-images" },
  { title: "スポーツ記録",     href: "/sports" },
  { title: "優しさマップ",     href: "/kindness" },
];

export default function DashboardV2() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      <div className="max-w-5xl mx-auto px-5 py-10">
        <h1 className="text-center text-2xl font-semibold mb-8">
          Tetsuta Creative Lab — Dashboard v2
        </h1>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => (
            <Link
              key={c.title}
              href={c.href} // ← 先頭スラッシュの絶対パス
              className="block rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition"
            >
              <div className="font-medium">{c.title}</div>
              <div className="text-sm text-gray-500 mt-1">Open</div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
import Link from "next/link";

type Post = { id: string; title: string; status: "draft" | "public"; updatedAt: string };

const posts: Post[] = [
  { id: "draft-1",  title: "（下書き）長岡花火の取材メモ",        status: "draft",  updatedAt: "2025-10-31" },
  { id: "review-1", title: "Hotel Okura Tokyo Bay 宿泊レビュー", status: "public", updatedAt: "2025-10-25" },
];

export default function BlogIndex() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-5 py-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">ブログ管理</h1>
          <Link
            href="/blog/new" // ← 絶対パス
            className="px-3 py-2 rounded bg-indigo-600 text-white text-sm hover:bg-indigo-500"
          >
            ＋ 新規記事
          </Link>
        </div>

        <div className="space-y-3">
          {posts.map((p) => (
            <div key={p.id} className="rounded-lg border bg-white p-4 flex items-center justify-between">
              <div>
                <div className="font-medium">{p.title}</div>
                <div className="text-sm text-gray-500">
                  ステータス：{p.status === "draft" ? "下書き" : "公開中"} ・ 更新日：{p.updatedAt}
                </div>
              </div>
              <div className="flex gap-2">
                <Link
                  href={`/blog/edit/${p.id}`}   // ← 絶対パス
                  className="px-3 py-1.5 rounded border text-sm hover:bg-gray-50"
                >
                  編集
                </Link>
                <Link
                  href={`/blog/preview/${p.id}`} // ← 絶対パス
                  className="px-3 py-1.5 rounded bg-blue-600 text-white text-sm hover:bg-blue-500"
                >
                  プレビュー
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <Link href="/dashboard-v2" className="text-indigo-600 hover:underline">
            ← Dashboard v2 に戻る
          </Link>
        </div>
      </div>
    </main>
  );
}
