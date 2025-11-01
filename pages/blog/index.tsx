// pages/blog/index.tsx
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Post } from '../../lib/types';
import { listPosts } from '../../lib/mockPosts';

export default function BlogIndex() {
  const [items, setItems] = useState<Post[]>([]);
  const [q, setQ] = useState('');
  const [status, setStatus] = useState<'all' | 'draft' | 'published'>('all');

  useEffect(() => {
    listPosts().then(setItems);
  }, []);

  const filtered = items.filter((p) => {
    const matchQ =
      !q ||
      p.title.toLowerCase().includes(q.toLowerCase()) ||
      p.content.toLowerCase().includes(q.toLowerCase());
    const matchS = status === 'all' ? true : p.status === status;
    return matchQ && matchS;
  });

  return (
    <main className="max-w-5xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-semibold mb-4">ブログ管理</h1>

      <div className="flex flex-col sm:flex-row gap-3 sm:items-center mb-6">
        <input
          placeholder="キーワードで検索（例：ディズニー / 花火）"
          className="w-full sm:w-96 border rounded px-3 py-2"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <select
          className="w-full sm:w-48 border rounded px-3 py-2"
          value={status}
          onChange={(e) => setStatus(e.target.value as any)}
        >
          <option value="all">すべてのステータス</option>
          <option value="draft">下書き</option>
          <option value="published">公開中</option>
        </select>
        <Link
          href="/blog/new"
          className="inline-block rounded-md border px-4 py-2 hover:bg-gray-50"
        >
          ＋ 新規記事
        </Link>
      </div>

      <ul className="space-y-3">
        {filtered.map((p) => (
          <li
            key={p.id}
            className="rounded-lg border p-4 flex items-center justify-between"
          >
            <div>
              <div className="font-medium">{p.title}</div>
              <div className="text-sm text-gray-500">
                ステータス：
                {p.status === 'draft' ? '下書き' : '公開中'}・更新日：
                {new Date(p.updatedAt).toLocaleDateString()}
              </div>
            </div>
            <div className="flex gap-2">
              <Link
                href={`/blog/edit/${p.id}`}
                className="rounded border px-3 py-1 text-sm hover:bg-gray-50"
              >
                編集
              </Link>
              <Link
                href={`/blog/preview/${p.id}`}
                className="rounded border px-3 py-1 text-sm hover:bg-gray-50"
              >
                プレビュー
              </Link>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <Link href="/dashboard-v2" className="text-indigo-600 hover:underline">
          ← Dashboard v2 に戻る
        </Link>
      </div>
    </main>
  );
}
