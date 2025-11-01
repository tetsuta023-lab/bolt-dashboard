// pages/blog/edit/[id].tsx
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getPostById } from '../data';
import { useMemo, useState } from 'react';

export default function EditPost() {
  const { query } = useRouter();
  const post = useMemo(()=> getPostById(String(query.id)), [query.id]);

  const [title, setTitle] = useState(post?.title ?? '');
  const [status, setStatus] = useState<'draft'|'published'>(post?.status ?? 'draft');
  const [thumbnailUrl, setThumbnailUrl] = useState(post?.thumbnailUrl ?? '');
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? '');
  const [content, setContent] = useState(post?.content ?? '');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // デモ：保存処理はスキップ
    alert('デモのため見た目だけ更新。実保存は未実装です。');
  };

  if (!post) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-8">
        <p className="text-gray-600">対象の記事が見つかりませんでした。</p>
        <Link href="/blog" className="text-indigo-600 hover:underline">← 一覧に戻る</Link>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold">記事を編集：{post.title}</h1>

      {/* プレビュー用サムネ */}
      <div className="mt-4 rounded-lg overflow-hidden border">
        {thumbnailUrl ? (
          <img src={thumbnailUrl} alt="thumb" className="w-full h-52 object-cover" />
        ) : (
          <div className="w-full h-52 bg-gradient-to-br from-gray-100 to-gray-200" />
        )}
      </div>

      <form onSubmit={onSubmit} className="mt-6 space-y-5">
        <Field label="タイトル">
          <input value={title} onChange={e=>setTitle(e.target.value)} className="input" />
        </Field>

        <Field label="ステータス">
          <select value={status} onChange={e=>setStatus(e.target.value as any)} className="input">
            <option value="draft">下書き</option>
            <option value="published">公開中</option>
          </select>
        </Field>

        <Field label="サムネイルURL">
          <input value={thumbnailUrl} onChange={e=>setThumbnailUrl(e.target.value)} className="input" placeholder="https://..." />
        </Field>

        <Field label="概要（excerpt）">
          <textarea value={excerpt} onChange={e=>setExcerpt(e.target.value)} className="input h-24" />
        </Field>

        <Field label="本文">
          <textarea value={content} onChange={e=>setContent(e.target.value)} className="input h-40" />
        </Field>

        <div className="flex gap-3">
          <Link href="/blog" className="btn-secondary">戻る</Link>
          <button type="submit" className="btn-primary">保存（デモ）</button>
          <Link href={`/blog/preview/${post.id}`} className="btn-secondary">プレビューを開く</Link>
        </div>
      </form>

      <style jsx>{`
        .input { width:100%; border:1px solid #e5e7eb; border-radius:0.5rem; padding:0.5rem 0.75rem; }
        .btn-primary { background:#4f46e5; color:#fff; padding:0.5rem 0.9rem; border-radius:0.5rem; }
        .btn-secondary { border:1px solid #e5e7eb; padding:0.5rem 0.9rem; border-radius:0.5rem; }
      `}</style>
    </main>
  );
}

function Field(props: {label:string; children:React.ReactNode}) {
  return (
    <label className="block">
      <span className="text-sm text-gray-600">{props.label}</span>
      <div className="mt-1">{props.children}</div>
    </label>
  );
}
