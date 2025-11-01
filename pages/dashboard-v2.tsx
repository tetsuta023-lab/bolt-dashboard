// pages/dashboard-v2.tsx
import Head from 'next/head';

const cards = [
  { title: 'ブログ管理', href: '#', desc: 'Open' },
  { title: '神社&旅ログ', href: '#', desc: 'Open' },
  { title: 'マイル&ポイント', href: '#', desc: 'Open' },
  { title: 'Airbnb利益計算', href: '#', desc: 'Open' },
  { title: 'Kindle出版', href: '#', desc: 'Open' },
  { title: 'AI画像倉庫', href: '#', desc: 'Open' },
  { title: 'スポーツ記録', href: '#', desc: 'Open' },
  { title: '優しさマップ', href: '#', desc: 'Open' },
];

export default function DashboardV2() {
  return (
    <>
      <Head>
        <title>Tetsuta Creative Lab — Dashboard v2</title>
      </Head>

      {/* 背景グラデーション */}
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-teal-50">
        <main className="mx-auto max-w-5xl px-5 py-12">
          <h1 className="text-center text-2xl font-semibold tracking-wide text-gray-800 mb-8">
            Tetsuta Creative Lab — Dashboard v2
          </h1>

          {/* カードグリッド */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((c) => (
              <a
                key={c.title}
                href={c.href}
                className="rounded-xl border border-gray-200 bg-white/70 p-5 shadow-sm backdrop-blur-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="text-lg font-medium text-gray-900">{c.title}</div>
                <div className="mt-1 text-sm text-gray-500">{c.desc}</div>
              </a>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
