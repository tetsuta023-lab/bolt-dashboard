// pages/blog/preview/[id].tsx
import Link from 'next/link';
import type { GetServerSideProps } from 'next';
import { supabase } from '../../../lib/supabaseClient';
import { marked } from 'marked';

type Post = {
  id: number;
  title: string;
  status: 'draft' | 'published';
  date: string | null;
  excerpt: string | null;
  thumbnail: string | null;
  content: string | null;
};

type Props = { post: Post | null };

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const id = Number(ctx.params?.id);
  const { data, error } = await supabase
    .from('blog_posts')
    .select('id,title,status,date,excerpt,thumbnail,content')
    .eq('id', id)
    .single();

  if (error || !data) return { props: { post: null } };
  return { props: { post: data as Post } };
};

export default function PreviewPage({ post }: Props) {
  if (!post) {
    return (
      <div className="container">
        <p>記事が見つかりませんでした。</p>
        <Link className="link" href="/blog">一覧へ戻る</Link>
      </div>
    );
  }

  const html = marked.parse(post.content ?? '');

  return (
    <div className="container">
      <Link className="link" href="/blog">← 管理に戻る</Link>
      <div className="head">
        <span className={`badge ${post.status === 'published' ? 'ok' : ''}`}>
          {post.status === 'published' ? '公開中' : '下書き'}
        </span>
        <span className="date">{post.date ?? ''}</span>
        <span className="id">ID: {post.id}</span>
      </div>

      <h1>{post.title}</h1>

      {post.thumbnail && (
        <img className="thumb" src={post.thumbnail} alt={post.title} />
      )}

      {post.excerpt && <p className="excerpt">{post.excerpt}</p>}

      <article className="prose" dangerouslySetInnerHTML={{ __html: html }} />

      <div className="row">
        <Link className="link" href={`/blog/edit/${post.id}`}>編集</Link>
        <Link className="link" href="/blog">一覧へ</Link>
      </div>
    </div>
  );
}
