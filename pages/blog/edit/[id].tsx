import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditPostPage() {
  const { query } = useRouter();
  const id = String(query.id ?? "");

  const [title, setTitle] = useState("");
  const [body, setBody]   = useState("");

  useEffect(() => {
    if (!id) return;
    // ここで本来は id を使ってデータ取得（今はダミー）
    setTitle(`Post ${id} のタイトル`);
    setBody("ここに本文（ダミー）。Supabase 連携時に差し替え。");
  }, [id]);

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">記事を編集（ID: {id}）</h1>

      <div className="space-y-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded border px-3 py-2"
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={10}
          className="w-full rounded border px-3 py-2"
        />
      </div>

      <div className="mt-6 flex gap-3">
        <button className="rounded bg-indigo-600 px-4 py-2 text-white cursor-not-allowed opacity-50">
          更新（ダミー）
        </button>
        <Link href="/blog" className="rounded border px-4 py-2 hover:bg-gray-50">
          戻る
        </Link>
      </div>
    </main>
  );
}
