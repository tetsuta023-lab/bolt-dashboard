import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { supabase } from '../../lib/supabaseClient';

type Status = 'draft' | 'published';

function todayISO() {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${mm}-${dd}`;
}

export default function NewPostPage() {
  const router = useRouter();
  const [title, setTitle] = useState<string>('');
  const [status, setStatus] = useState<Status>('draft');
  const [date, setDate] = useState<string>(todayISO());
  const [excerpt, setExcerpt] = useState<string>('');
  const [thumbnail, setThumbnail] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function savePost(nextStatus: Status) {
    setSaving(true);
    setErrorMsg(null);
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .insert([
          {
            title: title.trim(),
            status: nextStatus,
            date: date || null,
            excerpt: excerpt || null,
            thumbnail: thumbnail || null,
            content: content || null,
          },
        ])
        .select('id')
        .single();

      if (error) throw error;

      // 保存後は一覧へ（またはプレビューへ飛ばしたい場合は /blog/preview/${data.id} に）
      await router.push('/blog');
    } catch (e: any) {
      setErrorMsg(e.message ?? '保存に失敗しました');
    } finally {
      setSaving(false);
    }
  }

  return (
    <main style={{ maxWidth: 860, margin: '24px auto', padding: '0 16px' }}>
      <div style={{ marginBottom: 16 }}>
        <Link href="/blog">
          <a style={{ color: '#6366f1' }}>← 管理に戻る</a>
        </Link>
      </div>

      <h1 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: 16 }}>新規記事の作成</h1>

      {errorMsg && (
        <div style={{ background: '#fee2e2', color: '#991b1b', padding: '8px 12px', borderRadius: 6, marginBottom: 12 }}>
          {errorMsg}
        </div>
      )}

      <div style={{ display: 'grid', gap: 12 }}>
        <label style={{ display: 'grid', gap: 6 }}>
          <span>タイトル</span>
          <input
            type="text"
            placeholder="記事タイトルを入力"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={saving}
            style={{ padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: 8 }}
          />
        </label>

        <div style={{ display: 'grid', gap: 12, gridTemplateColumns: '1fr 1fr' }}>
          <label style={{ display: 'grid', gap: 6 }}>
            <span>公開状態</span>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as Status)}
              disabled={saving}
              style={{ padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: 8 }}
            >
              <option value="draft">下書き</option>
              <option value="published">公開中</option>
            </select>
          </label>

          <label style={{ display: 'grid', gap: 6 }}>
            <span>日付</span>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              disabled={saving}
              style={{ padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: 8 }}
            />
          </label>
        </div>

        <label style={{ display: 'grid', gap: 6 }}>
          <span>サマリー（抜粋）</span>
          <textarea
            placeholder="一覧に出す短い説明"
            rows={3}
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            disabled={saving}
            style={{ padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: 8 }}
          />
        </label>

        <label style={{ display: 'grid', gap: 6 }}>
          <span>サムネイルURL（任意）</span>
          <input
            type="url"
            placeholder="https://example.com/thumbnail.jpg"
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
            disabled={saving}
            style={{ padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: 8 }}
          />
        </label>

        <label style={{ display: 'grid', gap: 6 }}>
          <span>本文（Markdown対応）</span>
          <textarea
            placeholder={`# 見出し\n本文を書いてください。\n\n---\n**太字** や 改行 もOK`}
            rows={16}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={saving}
            style={{ padding: '12px 14px', border: '1px solid #e5e7eb', borderRadius: 8, fontFamily: 'inherit' }}
          />
        </label>

        <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
          <button
            onClick={() => savePost('draft')}
            disabled={saving || !title.trim()}
            style={{
              padding: '10px 14px',
              borderRadius: 8,
              border: '1px solid #e5e7eb',
              background: '#fff',
            }}
          >
            下書きとして保存
          </button>
          <button
            onClick={() => savePost('published')}
            disabled={saving || !title.trim()}
            style={{
              padding: '10px 14px',
              borderRadius: 8,
              border: '1px solid #4338ca',
              background: '#4f46e5',
              color: '#fff',
            }}
          >
            公開して保存
          </button>
        </div>
      </div>
    </main>
  );
}
