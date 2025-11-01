import Link from "next/link";
import { useRouter } from "next/router";

export default function PreviewPost() {
  const { query } = useRouter();
  const id = String(query.id ?? "");

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-bold mb-2">プレビュー（ID: {id}）</h1>
      <p className="text-gray-500 mb-6">本番プレビューの体裁（ダミー表示）</p>

      <article className="prose max-w-none">
        <h2>ダミータイトル {id}</h2>
        <p>ここに本文が入ります。Supabase 連携時に実データへ差し替え。</p>
      </article>

      <div className="mt-8">
        <Link href="/blog" className="text-indigo-600 hover:underline">
          ← 一覧へ戻る
        </Link>
      </div>
    </main>
  );
}
