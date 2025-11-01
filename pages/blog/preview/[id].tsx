// pages/blog/preview/[id].tsx
import { useRouter } from "next/router";
import Link from "next/link";

export default function PreviewPost() {
  const { query } = useRouter();
  const id = String(query.id ?? "");

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">プレビュー: {id}</h1>
      <p className="mb-6 text-gray-600">
        ここに本文のプレビューを表示します（いまはダミー）。後でSupabaseから取得に差し替えます。
      </p>
      <div className="flex gap-4">
        <Link href="/blog" className="text-indigo-600 underline">一覧へ</Link>
        <Link href={`/blog/edit/${id}`} className="text-indigo-600 underline">編集へ</Link>
      </div>
    </main>
  );
}
