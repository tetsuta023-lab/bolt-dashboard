// ==== pages/blog/preview/[id].tsx ====
import { GetServerSideProps } from "next";
import Link from "next/link";
import { supabase } from "../../../lib/supabaseClient";

type Post = {
  id: number;
  title: string;
  status: "draft" | "published";
  date: string | null;
  excerpt: string | null;
  thumbnail: string | null;
};

type Props = { post: Post | null };

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const id = Number(ctx.params?.id);
  if (Number.isNaN(id)) return { notFound: true };

  const { data, error } = await supabase
    .from("blog_posts")
    .select("id,title,status,date,excerpt,thumbnail")
    .eq("id", id)
    .single();

  if (error || !data) return { notFound: true };
  return { props: { post: data as Post } };
};

export default function PreviewPage({ post }: Props) {
  if (!post) return null;

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <Link href="/blog" className="text-indigo-600 underline">← 管理に戻る</Link>

      <div className="mt-4 flex items-center gap-3">
        <span className={`text-xs px-2 py-0.5 rounded-full ${
          post.status === "published" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
        }`}>{post.status === "published" ? "公開中" : "下書き"}</span>
        <span className="text-xs text-gray-500">{post.date ?? ""}</span>
        <span className="text-xs text-gray-400">ID: {post.id}</span>
      </div>

      <h1 className="text-2xl font-semibold mt-3">{post.title}</h1>

      {post.thumbnail && (
        <img src={post.thumbnail} alt="" className="mt-4 w-full rounded-md border" />
      )}

      <article className="prose prose-sm mt-6">
        <p>{post.excerpt ?? ""}</p>
      </article>
    </main>
  );
}
