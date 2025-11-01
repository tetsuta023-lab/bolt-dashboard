import Head from "next/head";
import Link from "next/link";

type Entry = {
  id: string;
  title: string;
  date: string;
  tag: "Travel" | "Work" | "Creative";
  note: string;
};

const demo: Entry[] = [
  { id: "1", title: "長岡花火の取材メモ", date: "2025-08-03", tag: "Travel", note: "フェニックスの撮影位置 / 交通 / 宿" },
  { id: "2", title: "Kindle第5冊 章立て草案", date: "2025-10-15", tag: "Creative", note: "“応援から参加へ”の第2章修正" },
  { id: "3", title: "TCLダッシュボードUI改善", date: "2025-10-28", tag: "Work", note: "Tailwind導入・カード設計" },
];

export default function JournalIndex() {
  return (
    <>
      <Head>
        <title>Journal | Tetsuta Creative Lab</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
        <header className="border-b bg-white/80 backdrop-blur">
          <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
            <h1 className="text-xl sm:text-2xl font-bold">Journal</h1>
            <nav className="text-sm">
              <Link href="/" className="text-indigo-600 hover:underline">Home</Link>
            </nav>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-8">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-gray-600 text-sm">旅・制作・仕事のログ。まずはダミーデータで表示しています。</p>
            <Link
              href="/journal/new"
              className="rounded-lg bg-indigo-600 px-4 py-2 text-white text-sm hover:bg-indigo-700"
            >
              + New Entry
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {demo.map((e) => (
              <article
                key={e.id}
                className="rounded-xl border bg-white p-5 shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{e.title}</h3>
                  <span className="text-xs rounded-full border px-2 py-0.5 text-gray-500">
                    {e.tag}
                  </span>
                </div>
                <p className="mt-1 text-xs text-gray-500">{e.date}</p>
                <p className="mt-3 text-sm text-gray-700">{e.note}</p>
              </article>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
