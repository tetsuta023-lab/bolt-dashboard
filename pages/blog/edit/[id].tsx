import { GetServerSideProps } from "next";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { supabase } from "../../../lib/supabaseClient";
import { useRouter } from "next/router";

type Post = {
  id: number;
  title: string;
  status: "draft" | "published";
  date: string | null;
  excerpt: string | null;
  thumbnail: string | null;
  content: string | null;
};

type Props = { initial: Post | null };

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const id = Number(ctx.params?.id);
  if (!id) return { props: { initial: null } };

  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return { props: { initial: null } };
  return { props: { initial: data as Post } };
};

export default function EditPage({ initial }: Props) {
  const router = useRouter();
  if (!initial) return <main className="p-6">記事が見つかりません。</main>;

  const [title, setTitle] = useState(initial.title);
  const [status, setStatus] = useState<"draft" | "published">(initial.status);
  const [date, setDate] = useState(initial.date ?? "");
  const [excerpt, setExcerpt] = useState(initial.excerpt ?? "");
  const [thumbnail, setThumbnail] = useState(initial.thumbnail ?? "");
  const [content, setContent] = useState(initial.content ?? "");

  const save = async () => {
    const { error } = await supabase
      .from("blog_posts")
      .update({
        title,
        status,
        date: date || null,
        excerpt: excerpt || null,
        thumbnail: thumbnail || null,
        content
      })
      .eq("id", initial.id);

    if (error) {
      alert(`更新に失敗: ${error.message}`);
      return;
    }
    router.push(`/blog/preview/${initial.id}`);
  };

  return (
    <main className="p-6">
      <a href="/blog" className="text-sm text-indigo-600 hover:underline">
        ← 管理に戻る
      </a>
      <h1 className="mt-3 text-2xl font-semibold">記事を編集</h1>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {/* 入力 */}
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
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <button
            onClick={save}
            className="mt-4 rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
          >
            更新してプレビューへ
          </button>
        </div>

        {/* プレビュー */}
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
