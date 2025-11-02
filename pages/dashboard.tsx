// pages/dashboard.tsx
import Head from "next/head";
import Link from "next/link";

type Tile = { title: string; desc: string; href: string; badge?: string };

export default function Dashboard() {
  const tiles: Tile[] = [
    { title: "ブログ管理", desc: "記事の一覧・新規作成・編集・プレビュー", href: "/blog", badge: "運用中" },
    { title: "神社と旅の記録", desc: "参拝ログ／旅ログ／写真とメモ", href: "/journal", badge: "計画中" },
    { title: "マイル＆ポイント", desc: "デルタ/ANA/JALなどの積算と活用", href: "/miles", badge: "計画中" },
    { title: "Airbnb 収益計算", desc: "稼働率・単価・費用を想定して収支を試算", href: "/bnb", badge: "計画中" },
    { title: "Kindle 出版", desc: "企画・原稿・表紙・KDP 登録の進行管理", href: "/kindle", badge: "計画中" },
    { title: "AI 履歴書", desc: "職歴入力→自己PR/職務要約を自動草案", href: "/ai-resume", badge: "計画中" },
    { title: "補助金・融資", desc: "要件チェック／必要書類TODO／申請ステータス", href: "/grants", badge: "計画中" },
    { title: "気分の記録", desc: "1日数回のムード記録と簡単メモ", href: "/mood", badge: "計画中" },
    { title: "スポーツ記録", desc: "バスケ/筋トレのメニュー・成長トラッキング", href: "/sports", badge: "計画中" },
    { title: "優しさマップ", desc: "街で見つけた親切・良スポットを地図で記録", href: "/kindness-map", badge: "計画中" },
  ];

  return (
    <>
      <Head>
        <title>Tetsuta Creative Lab — Dashboard</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-sky-50 to-white">
        <header className="border-b bg-white/70 backdrop-blur">
          <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
              Tetsuta Creative Lab <span className="text-indigo-600">Dashboard</span>
            </h1>
            <nav className="text-sm font-medium space-x-4">
              <Link href="/dashboard" className="text-slate-600 hover:text-slate-800">Home</Link>
              <Link href="/blog" className="text-indigo-600 hover:text-indigo-700">ブログ管理</Link>
            </nav>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-10">
          <p className="mb-6 text-sm text-slate-600">
            クリエイティブ × ビジネス × 旅 × ライフログ を一元管理する統合ハブ。
          </p>

          <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {tiles.map((t) => (
              <Link
                key={t.title}
                href={t.href}
                className="group rounded-xl border bg-white/80 p-5 shadow-sm transition hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-base font-semibold text-slate-900">{t.title}</h3>
                  {t.badge && (
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] text-slate-600">
                      {t.badge}
                    </span>
                  )}
                </div>
                <p className="text-sm leading-6 text-slate-600">{t.desc}</p>
                <div className="mt-4 text-sm font-medium text-indigo-600">開く →</div>
              </Link>
            ))}
          </section>

          <footer className="mt-12 border-t pt-6 text-xs text-slate-500">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span>© {new Date().getFullYear()} Tetsuta Creative Lab</span>
              <div className="space-x-4">
                <Link href="/dashboard" className="hover:underline">Dashboard</Link>
                <Link href="/blog" className="hover:underline">Blog</Link>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </>
  );
}
