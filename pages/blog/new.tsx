// pages/blog/new.tsx
import { useRouter } from 'next/router';
import { useState } from 'react';
import { createPost } from '../../lib/mockPosts';

export default function BlogNew() {
  const r = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState<'draft' | 'published'>('draft');

  return (
    <main className="max-w-3xl mx-auto px-6 py-8">
      <h1 className="text-xl font-semibold mb-4">新規記事</h1>

      <label className="block mb-2">タイトル</label>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border rounded px-3 py-2 mb-4"
      />

      <label className="block mb-2">本文</label>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full h-56 border rounded px-3 py-2 mb-4"
      />

      <label className="block mb-2">ステータス</label>
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value as any)}
        className="border rounded px-3 py-2 mb-6"
      >
        <option value="draft">下書き</option>
        <option value="published">公開</option>
      </select>

      <div className="flex gap-2">
        <button
          onClick={async () => {
            const p = await createPost({ title, content, status });
            r.push(`/blog/edit/${p.id}`);
          }}
          className="rounded border px-4 py-2 hover:bg-gray-50"
        >
          保存して編集へ
        </button>
        <button
          onClick={() => r.push('/blog')}
          className="rounded border px-4 py-2 hover:bg-gray-50"
        >
          キャンセル
        </button>
      </div>
    </main>
  );
}
