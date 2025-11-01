// pages/blog/edit/[id].tsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getPost, updatePost } from '../../../lib/mockPosts';
import { Post } from '../../../lib/types';
import Link from 'next/link';

export default function BlogEdit() {
  const r = useRouter();
  const { id } = r.query as { id?: string };
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => { if (id) getPost(id).then(setPost); }, [id]);

  if (!post) return <main className="p-8">Loading...</main>;

  return (
    <main className="max-w-3xl mx-auto px-6 py-8">
      <h1 className="text-xl font-semibold mb-4">記事を編集</h1>

      <input
        value={post.title}
        onChange={(e) => setPost({ ...post, title: e.target.value })}
        className="w-full border rounded px-3 py-2 mb-4"
      />

      <textarea
        value={post.content}
        onChange={(e) => setPost({ ...post, content: e.target.value })}
        className="w-full h-56 border rounded px-3 py-2 mb-4"
      />

      <select
        value={post.status}
        onChange={(e) =>
          setPost({ ...post, status: e.target.value as 'draft' | 'published' })
        }
        className="border rounded px-3 py-2 mb-6"
      >
        <option value="draft">下書き</option>
        <option value="published">公開</option>
      </select>

      <div className="flex gap-2">
        <button
          onClick={async () => { if (post) await updatePost(post.id, post); }}
          className="rounded border px-4 py-2 hover:bg-gray-50"
        >
          保存
        </button>
        <Link
          href={`/blog/preview/${post.id}`}
          className="rounded border px-4 py-2 hover:bg-gray-50"
        >
          プレビュー
        </Link>
        <Link href="/blog" className="rounded border px-4 py-2 hover:bg-gray-50">
          一覧へ
        </Link>
      </div>
    </main>
  );
}
