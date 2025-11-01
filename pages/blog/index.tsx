import { GetServerSideProps } from "next";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";

type Post = {
  id: number;
  title: string;
  status: "draft" | "published";
  date: string | null;
  excerpt: string | null;
  thumbnail: string | null;
};

type Props = { posts: Post[] };

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("id,title,status,date,excerpt,thumbnail")
    .order("date", { ascending: false });

  if (error) {
    console.error("fetch posts error:", error);
    return { props: { posts: [] } };
  }
  return { props: { posts: (data ?? []) as Post[] } };
};

export default function BlogIndex({ posts }: Props) {
  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">📝 ブログ管理</h1>

      <div className="flex justify-end mb-4">
        <Link
          href="/blog/new"
          className="px-3 py-2 rounded-md bg-indigo-600 text-white text-sm"
        >
          + 新規記事
        </Link>
      </div>

      {posts.length === 0 && (
        <p className="text-gray-500">まだ記事がありません。「新規記事」から作成してください。</p>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        {posts.map((p) => (
          <div key={p.id} className="rounded-lg border p-4">
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  p.status === "published"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {p.status === "published" ? "公開中" : "下書き"}
              </span>
              <span className="text-xs text-gray-500">
                {p.date ?? ""}
              </span>
            </div>
            <h2 className="font-medium">{p.title}</h2>
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
              {p.excerpt ?? ""}
            </p>

            <div className="flex gap-2 mt-3">
              <Link
                href={`/blog/edit/${p.id}`}
                className="px-3 py-1.5 text-sm rounded border"
              >
                編集
              </Link>
              <Link
                href={`/blog/preview/${p.id}`}
                className="px-3 py-1.5 text-sm rounded bg-indigo-600 text-white"
              >
                プレビュー
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <Link href="/dashboard-v2" className="text-indigo-600 underline">
          ← Dashboard v2 に戻る
        </Link>
      </div>
    </main>
  );
}
