import { useRouter } from "next/router";
import Link from "next/link";

export default function BlogPreview() {
  const { query } = useRouter();
  const id = String(query.id ?? "");

  const mockTitle = id === "draft-1" ? "（下書き）長岡花火の取材メモ" : "Hotel Okura Tokyo Bay 宿泊レビュー";
  const mockBody = id === "draft-1"
    ? "これはプレビューのダミー本文です。長岡花火のポイント、移動、グルメなど。"
    : "これはプレビューのダミー本文です。部屋、朝食、アクセス、総評など。";

  return (
    <main className="min-h-screen bg-white">
      <article className="prose mx-auto max-w-3xl px-6 py-10">
        <h1>{mockTitle}</h1>
        <p>{mockBody}</p>
      </article>

      <div className="mx-auto max-w-3xl px-6">
        <Link href="/blog" className="text-sm text-indigo-600 hover:text-indigo-700">
          ← 一覧へ戻る
        </Link>
      </div>
    </main>
  );
}
