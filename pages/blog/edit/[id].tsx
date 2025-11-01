import { useRouter } from "next/router";
import Link from "next/link";

export default function BlogEdit() {
  const { query } = useRouter();
  const id = String(query.id || "");

  const mock = {
    title: id === "draft-1" ? "（下書き）長岡花火の取材メモ" : "Hotel Okura Tokyo Bay 宿泊レビュー",
    content:
      id === "draft-1"
        ? "ここに長岡花火の取材メモ（ダミー）が入ります。"
        : "ここにホテル宿泊レビュー（ダミー）が入ります。",
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-3xl px-6 py-8">
        <h1 className="text-2xl font-semibold text-gray-900">記事を編集</h1>
        <p className="mt-1 text-sm text-gray-500">ID: {id}</p>

        <form className="mt-6 space-y-4">
          <div>
            <label className="block text-sm text-gray-700">タイトル</label>
            <input defaultValue={mock.title} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm text-gray-700">本文</label>
            <textarea defaultValue={mock.content} rows={12} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 outline-none" />
          </div>

          <div className="flex gap-2">
            <button type="button" className="rounded-md bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700">
              更新（ダミー）
            </button>
            <Link href={`/blog/preview/${id}`} className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
              プレビューを見る
            </Link>
          </div>
        </form>

        <div className="mt-6">
          <Link href="/blog" className="text-sm text-indigo-600 hover:text-indigo-700">
            ← 一覧へ戻る
          </Link>
        </div>
      </div>
    </main>
  );
}
