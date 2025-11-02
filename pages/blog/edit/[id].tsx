// pages/blog/edit/[id].tsx
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { supabase } from '../../../lib/supabaseClient';

type Status = 'draft' | 'published';

export default function EditPostPage() {
  const router = useRouter();
  const id = Number(router.query.id);

  const [title, setTitle] = useState('');
  const [status, setStatus] = useState<Status>('draft');
  const [date, setDate] = useState<string>('');
  const [excerpt, setExcerpt] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!router.isReady) return;
    (async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('title,status,date,excerpt,thumbnail,content')
        .eq('id', id)
        .single();
      if (error) {
        setMessage(`読み込み失敗：${error.message}`);
      } else if (data) {
        setTitle(data.title ?? '');
        setStatus((data.status as Status) ?? 'draft');
        setDate(data.date ?? '');
        setExcerpt(data.excerpt ?? '');
        setThumbnail(data.thumbnail ?? '');
        setContent(data.content ?? '');
      }
      setLoading(false);
    })();
  }, [router.isReady, id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    const { error } = await supabase
      .from('blog_posts')
      .update({ title, status, date, excerpt, thumbnail, content })
      .eq('id', id);
    setSaving(false);
    setMessage(error ? `更新失敗：${error.message}` : '更新しました！');
  };

  if (loading) return <div className="container"><p>読込中...</p></div>;

  return (
    <div className="container">
      <h1>記事を編集（ID: {id}）</h1>
      <form onSubmit={handleUpdate} className="form">
        <label>タイトル
          <input value={title} onChange={(e)=>setTitle(e.target.value)} required />
        </label>

        <label>ステータス
          <select value={status} onChange={(e)=>setStatus(e.target.value as Status)}>
            <option value="draft">draft</option>
            <option value="published">published</option>
          </select>
        </label>

        <label>日付
          <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} required />
        </label>

        <label>抜粋
          <input value={excerpt} onChange={(e)=>setExcerpt(e.target.value)} />
        </label>

        <label>サムネイルURL
          <input value={thumbnail} onChange={(e)=>setThumbnail(e.target.value)} />
        </label>

        <label>本文（Markdown）
          <textarea rows={14} value={content} onChange={(e)=>setContent(e.target.value)} />
        </label>

        <div className="row">
          <button type="submit" disabled={saving}>{saving ? '更新中...' : '更新する'}</button>
          <Link className="link" href={`/blog/preview/${id}`}>プレビュー</Link>
          <Link className="link" href="/blog">一覧へ</Link>
        </div>
        {message && <p className="msg">{message}</p>}
      </form>
    </div>
  );
}
