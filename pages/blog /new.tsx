import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/router";

export default function NewPostPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [date, setDate] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [content, setContent] = useState("");

  const save = async () => {
    const { data, error } = await supabase.from("blog_posts").insert({
      title,
      status,
      date: date || null,
      excerpt: excerpt || null,
      thumbnail: thumbnail || null,
      content
    }).select().single();

    if (error) {
      alert(`保存に失敗: ${error.message}`);
      return;
    }
    router.push(`/blog/preview/${data.id}`);
  };

  return (
    <main className="p-6">
      <a href="/blog" className="text-sm text-indigo-600 hover:underline">
        ← 管理に戻る
      </a>
      <h1 className="mt-3 text-2xl font-semibold">新規記事</h1>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {/* 入力フォーム */}
        <div className="rounded border bg-white p-4 shadow-sm">
          <label className="block text-sm font-medium">タイトル</label>
          <input
            className="mt-1 w-full rounded border px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">ステータス</label>
              <select
                className="mt-1 w-full rounded border px-3 py-2"
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
              >
                <option value="draft">下書き</option>
                <option value="published">公開</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">日付</label>
              <input
                type="date"
                className="mt-1 w-full rounded border px-3 py-2"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>

          <label className="mt-4 block text-sm font-medium">サムネURL</label>
          <input
            className="mt-1 w-full rounded border px-3 py-2"
            placeholder="https://…"
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
          />

          <label className="mt-4 block text-sm font-medium">抜粋</label>
          <textarea
            className="mt-1 h-24 w-full rounded border px-3 py-2"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
          />

          <label className="mt-4 block text-sm font-medium">
            本文（Markdown対応）
          </label>
          <textarea
            className="mt-1 h-56 w-full rounded border px-3 py-2 font-mono"
            placeholder="## 見出し\n本文を **Markdown** で書けます。"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <button
            onClick={save}
            className="mt-4 rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
          >
            保存してプレビューへ
          </button>
        </div>

        {/* ライブプレビュー */}
        <div className="rounded border bg-white p-4 shadow-sm">
          <h2 className="mb-2 text-sm font-medium text-gray-500">プレビュー</h2>
          {thumbnail ? (
            <img src={thumbnail} alt="" className="mb-4 w-full rounded" />
          ) : null}
          <article className="prose prose-neutral">
            <h1>{title || "（タイトル）"}</h1>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content || "本文（Markdown）がここに表示されます。"}
            </ReactMarkdown>
          </article>
        </div>
      </div>
    </main>
  );
}
