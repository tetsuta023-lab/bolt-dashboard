// pages/blog/edit/[id].tsx
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { BLOG_POSTS, BlogPost } from "@/lib/blog/data";

type Props = { post: BlogPost };

export default function EditBlogPage({ post }: Props) {
  if (!post) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-10">
        <p className="text-gray-600">記事が見つかりませんでした。</p>
        <Link href="/blog" className="text-indigo-600 hover:underline">← 一覧へ戻る</Link>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">📝 記事を編集</h1>

      <form className="space-y-4">
        <div>
          <label className="block text-sm text-gray-700 mb-1">タイトル</label>
          <input defaultValue={post.title} className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">概要</label>
          <textarea defaultValue={post.excerpt} className="w-full border rounded px-3 py-2 h-28" />
        </div>
        <div className="flex gap-2">
          <span className="text-sm px-2 py-1 rounded bg-gray-100">
            ステータス: {post.status === "published" ? "公開中" : "下書き"}
          </span>
          <span className="text-sm text-gray-500">{post.date}</span>
        </div>

        <div className="flex gap-3 pt-4">
          <button type="button" className="px-4 py-2 rounded bg-indigo-600 text-white">保存（ダミー）</button>
          <Link href={`/blog/preview/${post.id}`} className="px-4 py-2 rounded border hover:bg-gray-50">
            プレビューへ
          </Link>
          <Link href="/blog" className="px-4 py-2 rounded text-indigo-600 hover:underline">一覧へ戻る</Link>
        </div>
      </form>
    </main>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // 既知の id を列挙（デモ用：全件）
  const paths = BLOG_POSTS.map((p) => ({ params: { id: String(p.id) } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const id = Number(params?.id);
  const post = BLOG_POSTS.find((p) => p.id === id) || null;
  return { props: { post } };
};
