// pages/blog/preview/[id].tsx
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getPostById } from '../data';

export default function PreviewPage() {
  const { query } = useRouter();
  const post = getPostById(String(query.id));

  if (!post) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-8">
        <p className="text-gray-600">対象の記事が見つかりませんでした。</p>
        <Link href="/blog" className="text-indigo-600 hover:underline">← 一覧に戻る</Link>
      </main>
    );
  }

  return (
    <article className="max-w-3xl mx-auto px-4 py-8 prose prose-indigo">
      <Link href="/blog" className="text-sm text-indigo-600 no-underline">← 一覧に戻る</Link>
      <h1 className="mb-2">{post.title}</h1>
      <p className="text-sm text-gray-500">{post.updatedAt}・{post.status === 'draft' ? '下書き' : '公開中'}</p>

      {/* ★ サムネイル */}
      {post.thumbnailUrl && (
        <div className="mt-4 rounded-xl overflow-hidden border">
          <img src={post.thumbnailUrl} alt="thumb" className="w-full h-64 object-cover" />
        </div>
      )}

      <p className="mt-6 text-gray-600">{post.excerpt}</p>
      <hr className="my-6" />
      <div>{post.content}</div>
    </article>
  );
}
