// pages/blog/preview/[id].tsx
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import Image from "next/image";
import { BLOG_POSTS, BlogPost } from "@/lib/blog/data";

type Props = { post: BlogPost };

export default function PreviewBlogPage({ post }: Props) {
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
      <div className="flex items-center gap-3 mb-6">
        <Link href="/blog" className="text-indigo-600 hover:underline">← 管理に戻る</Link>
        <span className="text-sm text-gray-500">ID: {post.id}</span>
      </div>

      <h1 className="text-3xl font-bold mb-3">{post.title}</h1>
      <div className="flex gap-3 items-center mb-6">
        <span className={`text-xs px-2 py-1 rounded ${post.status === "published" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-800"}`}>
          {post.status === "published" ? "公開中" : "下書き"}
        </span>
        <span className="text-sm text-gray-500">{post.date}</span>
      </div>

      {post.thumbnail && (
        <div className="mb-6">
          {/* デモ用なので next/image の幅高さは固定 */}
          <Image src={post.thumbnail} alt="" width={800} height={420} className="rounded" />
        </div>
      )}

      <p className="text-lg leading-8 text-gray-800">{post.excerpt}</p>
    </main>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = BLOG_POSTS.map((p) => ({ params: { id: String(p.id) } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const id = Number(params?.id);
  const post = BLOG_POSTS.find((p) => p.id === id) || null;
  return { props: { post } };
};
