import Link from "next/link";

type Post = {
  id: string;
  title: string;
  status: "draft" | "public";
  updatedAt: string;
};

// 仮データ（あとで Supabase 連携に差し替え）
const POSTS: Post[] = [
  { id: "1", title: "（下書き）長岡花火の取材メモ", status: "draft",  updatedAt: "2025-10-31" },
  { id: "2", title: "Hotel Okura Tokyo Bay 宿泊レビュー", status: "public", updatedAt: "2025-10-25" },
];

export default function BlogList() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">ブログ管理</h1>

      <div className="mb-6">
        <Link
          href="/blog/new"
          className="inline-flex items-center rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
        >
          ＋ 新規記事
        </Link>
      </div>

      <ul className="space-y-4">
        {POSTS.map((p) => (
          <li key={p.id} className="rounded border border-gray-200 p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <p className="font-medium">{p.title}</p>
                <p className="text-sm text-gray-500">
                  ステータス：{p.status === "draft" ? "下書き" : "公開中"} ・ 更新日：{p.updatedAt}
                </p>
              </div>
              <div className="flex gap-2">
                <Link
                  href={`/blog/edit/${p.id}`}
                  className="rounded border px-3 py-1 text-sm hover:bg-gray-50"
                >
                  編集
                </Link>
                <Link
                  href={`/blog/preview/${p.id}`}
                  className="rounded bg-gray-800 px-3 py-1 text-sm text-white hover:opacity-90"
                >
                  プレビュー
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <Link href="/dashboard-v2" className="text-sm text-indigo-600 hover:underline">
          ← Dashboard v2 に戻る
        </Link>
      </div>
    </main>
  );
}
