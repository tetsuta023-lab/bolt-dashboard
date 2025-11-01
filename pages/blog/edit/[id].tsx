import { GetServerSideProps } from "next";
import { useState } from "react";
import Link from "next/link";
import { supabase } from "../../../lib/supabaseClient";

type Post = {
  id: number;
  title: string;
  status: "draft" | "published";
  date: string | null;
  excerpt: string | null;
};

type Props = { post: Post | null };

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const id = Number(ctx.params?.id);
  if (Number.isNaN(id)) return { notFound: true };

  const { data, error } = await supabase
    .from("blog_posts")
    .select("id,title,status,date,excerpt")
    .eq("id", id)
    .single();

  if (error || !data) return { notFound: true };
  return { props: { post: data as Post } };
};

export default function EditPage({ post }: Props) {
  if (!post) return null;

  const [title, setTitle] = useState(post.title);
  const [status, setStatus] = useState<Post["status"]>(post.status);
  const [date, setDate] = useState(post.date ?? "");
  const [excerpt, setExcerpt] = useState(post.excerpt ?? "");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const onSave = async () => {
    setSaving(true);
    setMsg(null);
    const { error } = await supabase
      .from("blog_posts")
      .update({ title, status, date, excerpt })
      .eq("id", post.id);
    setSaving(false);
    setMsg(error ? `保存失敗: ${error.message}` : "保存しました");
  };

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <Link href="/blog" className="text-indigo-600 underline">
        ← 管理に戻る
      </Link>
      <h1 className="text-2xl font-semibold mt-3">記事を編集</h1>

      <div className="mt-6 space-y-4">
        <label className="block">
          <span className="text-sm text-gray-700">タイトル</span>
          <input
            className="mt-1 w-full rounded border px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label className="block">
          <span className="text-sm text-gray-700">ステータス</span>
          <select
            className="mt-1 w-full rounded border px-3 py-2"
            value={status}
            onChange={(e) => setStatus(e.target.value as Post["status"])}
          >
            <option value="draft">draft（下書き）</option>
            <option value="published">published（公開）</option>
          </select>
        </label>

        <label className="block">
          <span className="text-sm text-gray-700">日付</span>
          <input
            type="date"
            className="mt-1 w-full rounded border px-3 py-2"
            value={date ?? ""}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>

        <label className="block">
          <span className="text-sm text-gray-700">抜粋（概要）</span>
          <textarea
            rows={4}
            className="mt-1 w-full rounded border px-3 py-2"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
          />
        </label>

        <div className="flex gap-2">
          <button
            onClick={onSave}
            disabled={saving}
            className="px-4 py-2 rounded bg-indigo-600 text-white disabled:opacity-60"
          >
            {saving ? "保存中…" : "保存"}
          </button>
          <Link
            href={`/blog/preview/${post.id}`}
            className="px-4 py-2 rounded border"
          >
            プレビューを見る
          </Link>
        </div>

        {msg && <p className="text-sm mt-2">{msg}</p>}
      </div>
    </main>
  );
}
