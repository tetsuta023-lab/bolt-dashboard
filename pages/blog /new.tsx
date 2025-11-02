// pages/blog/new.tsx
import { useState } from 'react';
import Link from 'next/link';
import { supabase } from '../../lib/supabaseClient';

type Status = 'draft' | 'published';

export default function NewPostPage() {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState<Status>('draft');
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [excerpt, setExcerpt] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    const { error } = await supabase.from('blog_posts').insert([
      { title, status, date, excerpt, thumbnail, content }
    ]);

    if (error) {
      setMessage(`保存に失敗しました：${error.message}`);
    } else {
      setMessage('保存しました！一覧に戻ってご確認ください。');
      setTitle(''); setExcerpt(''); setThumbnail(''); setContent('');
      setStatus('draft');
      setDate(new Date().toISOString().slice(0, 10));
    }
    setSaving(false);
  };

  return (
    <div className="container">
      <h1>新規記事</h1>
      <form onSubmit={handleSubmit} className="form">
        <label>タイトル
          <input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="記事タイトル" required />
        </label>

        <label>ステータス
          <select value={status} onChange={(e)=>setStatus(e.target.value as Status)}>
            <option value="draft">draft（下書き）</option>
            <option value="published">published（公開）</option>
          </select>
        </label>

        <label>日付
          <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} required />
        </label>

        <label>抜粋（カード用）
          <input value={excerpt} onChange={(e)=>setExcerpt(e.target.value)} placeholder="カードに表示する短い説明" />
        </label>

        <label>サムネイルURL
          <input value={thumbnail} onChange={(e)=>setThumbnail(e.target.value)} placeholder="https://..." />
        </label>

        <label>本文（Markdown）
          <textarea rows={14} value={content} onChange={(e)=>setContent(e.target.value)} placeholder="# 見出し1 などMarkdownで入力" />
        </label>

        <div className="row">
          <button type="submit" disabled={saving}>{saving ? '保存中...' : '保存する'}</button>
          <Link className="link" href="/blog">一覧に戻る</Link>
        </div>

        {message && <p className="msg">{message}</p>}
      </form>
    </div>
  );
}
