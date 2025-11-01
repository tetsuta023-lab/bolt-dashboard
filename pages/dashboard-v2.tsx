import Link from "next/link";

export default function DashboardV2() {
  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="text-2xl font-semibold mb-6">
        Tetsuta Creative Lab — Dashboard v2
      </h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card href="/blog" title="ブログ管理" />
        <Card href="/blog/new" title="新規記事" />
        <Card href="/miles" title="マイル&ポイント" />
        <Card href="/journal" title="ジャーナル" />
      </div>

      <div className="mt-8">
        <Link href="/dashboard" className="text-indigo-600 hover:underline">
          Dashboard v1 に戻る
        </Link>
      </div>
    </main>
  );
}

function Card({ href, title }: { href: string; title: string }) {
  return (
    <Link
      href={href}
      className="block rounded-md border border-gray-200 p-5 hover:bg-gray-50"
    >
      <span className="text-sm text-gray-500">Open</span>
      <div className="mt-1 text-lg font-medium">{title}</div>
    </Link>
  );
}
