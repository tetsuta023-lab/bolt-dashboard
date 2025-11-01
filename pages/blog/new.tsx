import Link from "next/link";

export default function BlogNew() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-3xl px-6 py-8">
        <h1 className="text-2xl font-semibold text-gray-900">新規記事</h1>

        <form className="mt-6 space-y-4">
          <div>
            <label className="block text-sm text-gray-700">タイトル</label>
            <input className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm text-gray-700">本文</label>
            <textarea rows={10} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 outline-none" />
          </div>

          <div className="flex gap-2">
            <button type="button" className="rounded-md bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700">
              保存（ダミー）
            </button>
            <Link href="/blog" className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
              一覧へ戻る
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
