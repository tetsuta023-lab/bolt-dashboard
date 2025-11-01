// pages/blog/index.tsx
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { listPosts, Post } from './data';

export default function BlogIndex() {
  const [q, setQ] = useState('');
  const [tab, setTab] = useState<'all' | 'draft' | 'published'>('all');

  const posts = listPosts();

  const filtered = useMemo(() => {
    return posts.filter(p => {
      const okTab = tab === 'all' ? true : p.status === tab;
      const okQ =
        !q ||
        p.title.toLowerCase().includes(q.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(q.toLowerCase());
      return okTab && okQ;
    });
  }, [posts, q, tab]);

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <header className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">📝 ブログ管理</h1>
        <Link
          href="/blog/new"
          className="px-3 py-2 rounded-md bg-indigo-600 text-white text-sm hover:bg-indigo-700"
        >
          ＋ 新規記事
        </Link>
      </header>

      <div className="mt-6 flex items-center gap-3 flex-wrap">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="検索：タイトルや本文"
          className="w-full sm:w-80 rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
        <div className="flex items-center gap-2">
          <TabBtn active={tab==='all'} onClick={()=>setTab('all')}>すべて</TabBtn>
          <TabBtn active={tab==='draft'} onClick={()=>setTab('draft')}>下書き</TabBtn>
          <TabBtn active={tab==='published'} onClick={()=>setTab('published')}>公開中</TabBtn>
        </div>
        <span className="text-sm text-gray-500 ml-auto">{filtered.length}件</span>
      </div>

      <ul className="mt-6 grid sm:grid-cols-2 gap-4">
        {filtered.map((p) => (
          <li key={p.id} className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
            {/* ★ サムネイル */}
            {p.thumbnailUrl ? (
              <div className="relative aspect-[16/9] bg-gray-100">
                {/* Next/Image だと設定が要るので素の img を使用 */}
                <img
                  src={p.thumbnailUrl}
                  alt={p.title}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="aspect-[16/9] bg-gradient-to-br from-gray-100 to-gray-200" />
            )}

            <div className="p-4">
              <div className="flex items-center justify-between gap-3">
                <span
                  className={`text-xs px-2 py-1 rounded-full border ${
                    p.status === 'draft'
                      ? 'bg-amber-50 text-amber-700 border-amber-200'
                      : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  }`}
                >
                  {p.status === 'draft' ? '下書き' : '公開中'}
                </span>
                <time className="text-xs text-gray-500">{p.updatedAt}</time>
              </div>

              <h3 className="mt-2 font-medium">{p.title}</h3>
              <p className="mt-1 text-sm text-gray-600 line-clamp-2">{p.excerpt}</p>

              <div className="mt-3 flex gap-2">
                <Link
                  href={`/blog/edit/${p.id}`}
                  className="text-sm rounded-md border px-3 py-1.5 hover:bg-gray-50"
                >
                  編集
                </Link>
                <Link
                  href={`/blog/preview/${p.id}`}
                  className="text-sm rounded-md bg-indigo-600 text-white px-3 py-1.5 hover:bg-indigo-700"
                >
                  プレビュー
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <Link href="/dashboard-v2" className="text-sm text-indigo-600 hover:underline">
          ← Dashboard v2 に戻る
        </Link>
      </div>
    </main>
  );
}

function TabBtn(props: {active:boolean; onClick:()=>void; children:React.ReactNode}) {
  const {active, onClick, children} = props;
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 text-sm rounded-md border ${
        active ? 'bg-gray-900 text-white border-gray-900' : 'bg-white hover:bg-gray-50'
      }`}
    >
      {children}
    </button>
  );
}
