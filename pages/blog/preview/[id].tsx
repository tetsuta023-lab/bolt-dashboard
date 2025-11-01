import { GetServerSideProps } from "next";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { supabase } from "../../../lib/supabaseClient";

type Post = {
  id: number;
  title: string;
  status: string;
  date: string | null;
  excerpt: string | null;
  thumbnail: string | null;
  content: string | null;
};

type Props = { post: Post | null };

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const id = Number(ctx.params?.id);
  if (!id) return { props: { post: null } };

  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return { props: { post: null } };
  }
  return { props: { post: data as Post } };
};

export default function PreviewPage({ post }: Props) {
  if (!post) {
    return <main className="p-6">記事が見つかりませんでした。</main>;
  }

  return (
    <main className="p-6">
      <a href="/blog" className="text-sm text-indigo-600 hover:underline">
        ← 管理に戻る
      </a>

      <h1 className="mt-3 text-2xl font-semibold">{post.title}</h1>

      <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
        <span
          className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs ${
            post.status === "published"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {post.status === "published" ? "公開中" : "下書き"}
        </span>
        {post.date ? <span>{post.date}</span> : null}
        <span>ID: {post.id}</span>
      </div>

      {post.thumbnail ? (
        <img
          src={post.thumbnail}
          alt=""
          className="mt-6 w-full max-w-3xl rounded shadow"
        />
      ) : null}

      {/* 本文（Markdown） */}
      <article className="prose prose-neutral mt-8">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content ?? ""}
        </ReactMarkdown>
      </article>

      {/* 抜粋（任意） */}
      {post.excerpt ? (
        <p className="mt-10 text-sm text-gray-500">要約: {post.excerpt}</p>
      ) : null}
    </main>
  );
}
