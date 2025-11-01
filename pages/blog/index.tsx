import Head from "next/head";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";

type BlogPost = {
  id: number;
  title: string;
  status: "draft" | "published";
  date: string | null;
  excerpt: string | null;
  thumbnail?: string | null;
};

type Props = { posts: BlogPost[] };

export default function BlogList({ posts }: Props) {
  return (
    <>
      <Head><title>ブログ管理</title></Head>
      <main className="max-w-5xl mx-auto px-4 py-6">
        <h1 className="text-xl font-semibold mb-4">📒 ブログ管理</h1>

        <div className="mb-4">
          <Link
            href="/blog/new"
            className="inline-block rounded-md bg-indigo-600 px-4 py-2 text-white hover:opacity-90"
          >
            + 新規記事
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {posts.map((p) => (
            <div key={p.id} className="rounded-lg border bg-white p-4">
              <div className="flex items-center gap-2 text-sm mb-1">
                <span
                  className={`inline-block rounded-full px-2 py-0.5 ${
                    p.status === "published"
                      ? "bg-green-100 text-green-800"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {p.status === "published" ? "公開中" : "下書き"}
                </span>
                <span className="text-gray-500">
                  {p.date ? new Date(p.date).toISOString().slice(0, 10) : ""}
                </span>
              </div>

              <div className="font-medium">{p.title}</div>
              <div className="text-sm text-gray-600 line-clamp-2">{p.excerpt}</div>

              <div className="mt-3 flex gap-8">
                <Link href={`/blog/edit/${p.id}`} className="text-indigo-600 hover:underline">
                  編集
                </Link>
                <Link href={`/blog/preview/${p.id}`} className="text-indigo-600 hover:underline">
                  プレビュー
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <Link href="/dashboard-v2" className="text-indigo-600 hover:underline">
            ← Dashboard v2 に戻る
          </Link>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("id,title,status,date,excerpt,thumbnail")
    .order("id", { ascending: true });

  if (error) {
    // 空配列でも描画できるようにする
    return { props: { posts: [] as BlogPost[] } };
  }

  return { props: { posts: (data ?? []) as BlogPost[] } };
}
