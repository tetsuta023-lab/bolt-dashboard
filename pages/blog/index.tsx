import Link from "next/link";

type Post = {
  id: string;
  title: string;
  status: "draft" | "published";
  updatedAt: string; // YYYY-MM-DD
};

const demoPosts: Post[] = [
  { id: "draft-1", title: "（下書き）長岡花火の取材メモ", status: "draft", updatedAt: "2025-10-31" },
  { id: "pub-1", title: "Hotel Okura Tokyo Bay 宿泊レビュー", status: "published", updatedAt: "2025-10-25" },
];

export default function BlogManager() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <div className="mx-auto max-w-5xl px-6 py-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">ブログ管理</h1>
            <p className="mt-1 text-gray-600">
              下書きの整理・公開管理を行います。あとで Supabase 連携も追加予定。
            </p>
          </div>
          <Link
            href="/blog/new"
            className="rounded-md border border-indigo-600 px-3.5 py-2.5 text-sm font-medium text-indigo-600 hover:bg-indigo-50"
          >
            ＋ 新規記事
          </Link>
        </div>

        {/* 検索＆フィルタ（ダミーUI） */}
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <input
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500"
            placeholder="キーワードで検索（例：ディズニー / 花火 など）"
          />
          <select className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500">
            <option value="all">すべてのステータス</option>
            <option value="draft">下書き</option>
            <option value="published">公開済み</option>
          </select>
        </div>

        {/* 一覧 */}
        <div className="mt-6 divide-y divide-gray-200 overflow-hidden rounded-lg border border-gray-200 bg-white">
          {demoPosts.map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6"
            >
              <div>
                <h3 className="text-base font-medium text-gray-900">{p.title}</h3>
                <p className="mt-1 text-sm text-gray-500">
                  ステータス:{" "}
                  {p.status === "draft" ? (
                    <span className="rounded bg-yellow-50 px-2 py-0.5 text-yellow-700">
                      下書き
                    </span>
                  ) : (
                    <span className="rounded bg-green-50 px-2 py-0.5 text-green-700">
                      公開中
                    </span>
                  )}{" "}
                  ・ 更新日: {p.updatedAt}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href={`/blog/edit/${p.id}`}
                  className="rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
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

          {demoPosts.length === 0 && (
            <div className="px-4 py-10 text-center text-sm text-gray-500 sm:px-6">
              まだ記事がありません。右上の「＋ 新規記事」から作成してください。
            </div>
          )}
        </div>

        {/* 戻るリンク */}
        <div className="mt-6">
          <Link
            href="/dashboard-v2"
            className="text-sm text-indigo-600 hover:text-indigo-700"
          >
            ← Dashboard v2 に戻る
          </Link>
        </div>
      </div>
    </main>
  );
}
