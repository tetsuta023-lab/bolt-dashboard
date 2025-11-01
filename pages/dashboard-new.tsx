import Head from "next/head";
import Link from "next/link";

export default function Dashboard() {
  const modules = [
    { title: "Journal", href: "/journal", desc: "旅・制作・仕事のログを記録" },
    { title: "Finance", href: "/finance", desc: "売上・経費・共済をトラッキング" },
    { title: "Kindle", href: "/kindle", desc: "出版ネタ・原稿・売上管理" },
    { title: "Shrines", href: "/shrines", desc: "参拝ログ・御朱印・写真" },
    { title: "Miles & Points", href: "/miles", desc: "デルタ/ANA/JALの積算と特典" },
    { title: "Airbnb / 民泊", href: "/bnb", desc: "物件メモと収支シミュレーション" },
  ];

  return (
    <>
      <Head>
        <title>Tetsuta Creative Lab — Dashboard</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* 背景グラデーション */}
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
        {/* ヘッダー */}
        <header className="border-b bg-white/70 backdrop-blur">
          <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
              Tetsuta Creative Lab <span className="text-indigo-600">Dashboard</span>
            </h1>
            <Link
              href="/"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
            >
              ← Home
            </Link>
          </div>
        </header>

        {/* コンテンツ */}
        <main className="mx-auto max-w-6xl px-4 py-10">
          {/* ステータス帯 */}
          <section className="mb-8">
            <div className="rounded-xl border bg-white p-5 shadow-sm">
              <p className="text-sm text-gray-600">
                ようこそ！ここから各モジュールへアクセスできます。まずは「Journal」か「Finance」を作っていきましょう。
              </p>
            </div>
          </section>

          {/* カードグリッド */}
          <section>
            <h2 className="mb-4 text-lg font-semibold text-gray-900">Modules</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {modules.map((m) => (
                <Link
                  key={m.title}
                  href={m.href}
                  className="group rounded-xl border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold">{m.title}</h3>
                    <span className="rounded-full border px-2 py-0.5 text-xs text-gray-500 group-hover:border-indigo-300 group-hover:text-indigo-600">
                      Open
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">{m.desc}</p>
                  <div className="mt-4 h-1 w-full rounded bg-gradient-to-r from-indigo-500 to-sky-400 opacity-70 group-hover:opacity-100" />
                </Link>
              ))}
            </div>
          </section>
        </main>

        {/* フッター */}
        <footer className="mt-10 border-t bg-white/60">
          <div className="mx-auto max-w-6xl px-4 py-6 text-xs text-gray-500">
            © {new Date().getFullYear()} Tetsuta Creative Lab
          </div>
        </footer>
      </div>
    </>
  );
}
