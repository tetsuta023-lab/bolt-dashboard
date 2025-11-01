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
};

type Props = { post: BlogPost | null };

export default function BlogEdit({ post }: Props) {
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
      <Head><title>{post.title} | 編集</title></Head>
      <main className="max-w-3xl mx-auto px-4 py-8">
        <Link href="/blog" className="text-indigo-600 hover:underline">
          ← 管理に戻る
        </Link>
        <h1 className="mt-3 text-2xl font-semibold">編集（閲覧用ダミー）</h1>

        <div className="mt-6 space-y-3">
          <div>
            <div className="text-sm text-gray-500">タイトル</div>
            <div className="rounded-md border bg-white px-3 py-2">{post.title}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">ステータス</div>
            <div className="rounded-md border bg-white px-3 py-2">{post.status}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">日付</div>
            <div className="rounded-md border bg-white px-3 py-2">
              {post.date ? new Date(post.date).toISOString().slice(0, 10) : ""}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-500">概要</div>
            <div className="rounded-md border bg-white px-3 py-2">{post.excerpt}</div>
          </div>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const id = Number(ctx.params?.id);
  if (!id) return { props: { post: null } };

  const { data, error } = await supabase
    .from("blog_posts")
    .select("id,title,status,date,excerpt")
    .eq("id", id)
    .single();

  if (error) return { props: { post: null } };
  return { props: { post: data } };
}
