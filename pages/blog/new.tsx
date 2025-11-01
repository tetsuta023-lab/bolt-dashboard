// pages/blog/new.tsx
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function NewPost() {
  const r = useRouter();
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState<'draft'|'published'>('draft');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');

  // デモ用：実保存はせず一覧へ戻す
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    r.push('/blog'); // 実運用ではAPI保存→/blog へ
  };

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold">新規記事</h1>
      <form onSubmit={onSubmit} className="mt-6 space-y-5">
        <Field label="タイトル">
          <input value={title} onChange={e=>setTitle(e.target.value)} className="input" placeholder="記事タイトル" />
        </Field>

        <Field label="ステータス">
          <select value={status} onChange={e=>setStatus(e.target.value as any)} className="input">
            <option value="draft">下書き</option>
            <option value="published">公開中</option>
          </select>
        </Field>

        {/* ★ サムネイルURL */}
        <Field label="サムネイルURL（任意）">
          <input value={thumbnailUrl} onChange={e=>setThumbnailUrl(e.target.value)} className="input" placeholder="https://..." />
          <p className="hint">未入力でもOK。Unsplash等の画像URLを貼ると一覧に表示されます。</p>
        </Field>

        <Field label="概要（excerpt）">
          <textarea value={excerpt} onChange={e=>setExcerpt(e.target.value)} className="input h-24" />
        </Field>

        <Field label="本文">
          <textarea value={content} onChange={e=>setContent(e.target.value)} className="input h-40" />
        </Field>

        <div className="flex gap-3">
          <Link href="/blog" className="btn-secondary">キャンセル</Link>
          <button type="submit" className="btn-primary">保存（デモ）</button>
        </div>
      </form>
    </main>
  );
}

function Field(props: {label:string; children:React.ReactNode}) {
  return (
    <label className="block">
      <span className="text-sm text-gray-600">{props.label}</span>
      <div className="mt-1">{props.children}</div>
      <style jsx>{`
        .input { width:100%; border:1px solid #e5e7eb; border-radius:0.5rem; padding:0.5rem 0.75rem; }
        .btn-primary { background:#4f46e5; color:#fff; padding:0.5rem 0.9rem; border-radius:0.5rem; }
        .btn-secondary { border:1px solid #e5e7eb; padding:0.5rem 0.9rem; border-radius:0.5rem; }
        .hint { font-size:.75rem; color:#6b7280; margin-top:.25rem; }
      `}</style>
    </label>
  );
}
