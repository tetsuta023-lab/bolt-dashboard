import Link from "next/link";
import { useState } from "react";

export default function NewPostPage() {
  const [title, setTitle] = useState("");
  const [body, setBody]   = useState("");

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">新規記事作成</h1>

      <div className="space-y-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="タイトル"
          className="w-full rounded border px-3 py-2"
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="本文（ダミー・保存は未実装）"
          rows={10}
          className="w-full rounded border px-3 py-2"
        />
      </div>

      <div className="mt-6 flex gap-3">
        <button className="rounded bg-indigo-600 px-4 py-2 text-white cursor-not-allowed opacity-50">
          保存（ダミー）
        </button>
        <Link href="/blog" className="rounded border px-4 py-2 hover:bg-gray-50">
          キャンセル
        </Link>
      </div>
    </main>
  );
}
