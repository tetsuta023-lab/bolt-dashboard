import Head from "next/head";
import Link from "next/link";
import { GetServerSidePropsContext } from "next";
import { supabase } from "../../../lib/supabaseClient";

type BlogPost = {
  id: number;
  title: string;
  status: "draft" | "published";
  date: string | null;
  excerpt: string | null;
  thumbnail?: string | null;
  body?: string | null; // 将来本文を入れる用
};

type Props = { post: BlogPost | null };

export default function BlogPreview({ post }: Props) {
  if (!post) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-8">
        <p className="text-gray-600">記事が見つかりませんでした。</p>
        <Link href="/blog" className="text-indigo-600 hover:underline">
          ← 管理に戻る
        </Link>
      </main>
    );
  }

  return (
    <>
      <Head><title>{post.title} | プレビュー</title></Head>
      <main className="max-w-3xl mx-auto px-4 py-8">
        <Link href="/blog" className="text-indigo-600 hover:underline">
          ← 管理に戻る
        </Link>

        <h1 className="mt-2 text-2xl font-semibold">{post.title}</h1>

        <div className="mt-2 flex items-center gap-3 text-sm">
          <span
            className={`inline-block rounded-full px-2 py-0.5 ${
              post.status === "published"
                ? "bg-green-100 text-green-800"
                : "bg-amber-100 text-amber-800"
            }`}
          >
            {post.status === "published" ? "公開中" : "下書き"}
          </span>
          <span className="text-gray-500">
            {post.date ? new Date(post.date).toISOString().slice(0, 10) : ""}
          </span>
          <span className="text-gray-400">ID: {post.id}</span>
        </div>

        <hr className="my-6" />

        <article className="prose max-w-none">
          <p className="text-gray-700">
            {post.excerpt ?? "（本文サンプル）ここに本文が入ります。"}
          </p>
        </article>
      </main>
    </>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const id = Number(ctx.params?.id);
  if (!id) return { props: { post: null } };

  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return { props: { post: null } };
  return { props: { post: data } };
}
