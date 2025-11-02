import { GetServerSideProps } from "next";
import Head from "next/head";
import { marked } from "marked"; // ← ここで 'marked' を正しく読み込み
import { supabase } from "../../../lib/supabaseClient";

type Post = {
  id: number;
  title: string;
  content: string;
  date: string;
  excerpt?: string;
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params || {};
  if (!id) return { notFound: true };

  const { data: post, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !post) {
    console.error("Error fetching post:", error);
    return { notFound: true };
  }

  return {
    props: {
      post,
    },
  };
};

export default function BlogPreview({ post }: { post: Post }) {
  const htmlContent = marked.parse(post.content || ""); // ← Markdown → HTML変換

  return (
    <>
      <Head>
        <title>{post.title} | Tetsuta Blog Preview</title>
        <meta name="description" content={post.excerpt || ""} />
      </Head>
      <main className="max-w-3xl mx-auto py-10 px-5">
        <article className="prose prose-indigo max-w-none">
          <h1>{post.title}</h1>
          <p className="text-gray-500 text-sm">{post.date}</p>
          <div
            className="mt-6"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </article>
      </main>
    </>
  );
}
