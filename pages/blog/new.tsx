import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient";

type Status = "draft" | "published";

export default function NewPost() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<Status>("draft");
  const [date, setDate] = useState<string>("");
  const [excerpt, setExcerpt] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const onCreate = async () => {
    setSaving(true);
    setMsg(null);

    const { data, error } = await supabase
      .from("blog_posts")
      .insert([{ title, status, date: date || null, excerpt: excerpt || null, thumbnail: thumbnail || null }])
      .select("id")
      .single();

    setSaving(false);

    if (error) {
      setMsg(`作成失敗: ${error.message}`);
      return;
    }

    setMsg("作成しました");
    // 作成後は編集画面へ
    if (data?.id) router.push(`/blog/edit/${data.id}`);
  };

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <Link href="/blog" className="text-indigo-600 underline">← 管理に戻る</Link>
      <h1 className="text-2xl font-semibold mt-3">新規記事</h1>

      <div className="mt-6 space-y-4">
        <label className="block">
          <span className="text-sm text-gray-700">タイトル</span>
          <input className="mt-1 w-full rounded border px-3 py-2"
            value={title} onChange={(e) => setTitle(e.target.value)} placeholder="記事タイトル" />
        </label>

        <label className="block">
          <span className="text-sm text-gray-700">ステータス</span>
          <select className="mt-1 w-full rounded border px-3 py-2"
            value={status} onChange={(e) => setStatus(e.target.value as Status)}>
            <option value="draft">draft（下書き）</option>
            <option value="published">published（公開）</option>
          </select>
        </label>

        <label className="block">
          <span className="text-sm text-gray-700">日付</span>
          <input type="date" className="mt-1 w-full rounded border px-3 py-2"
            value={date} onChange={(e) => setDate(e.target.value)} />
        </label>

        <label className="block">
          <span className="text-sm text-gray-700">抜粋（概要）</span>
          <textarea rows={4} className="mt-1 w-full rounded border px-3 py-2"
            value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="記事の概要…" />
        </label>

        <label className="block">
          <span className="text-sm text-gray-700">サムネURL（任意）</span>
          <input className="mt-1 w-full rounded border px-3 py-2"
            value={thumbnail} onChange={(e) => setThumbnail(e.target.value)} placeholder="https://…" />
        </label>

        <div className="flex gap-2">
          <button onClick={onCreate} disabled={saving || !title}
            className="px-4 py-2 rounded bg-indigo-600 text-white disabled:opacity-60">
            {saving ? "作成中…" : "作成する"}
          </button>
          <Link href="/blog" className="px-4 py-2 rounded border">キャンセル</Link>
        </div>

        {msg && <p className="text-sm mt-2">{msg}</p>}
      </div>
    </main>
  );
}
