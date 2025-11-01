import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { supabase } from '../../../lib/supabaseClient';
import ReactMarkdown from 'react-markdown';

type Post = {
  id: number;
  title: string;
  status: 'draft' | 'published';
  date: string | null;
  excerpt: string | null;
  thumbnail: string | null;
  content: string | null;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = Number(ctx.params?.id);
  const { data, error } = await supabase
    .from('blog_posts')
    .select('id, title, status, date, excerpt, thumbnail, content')
    .eq('id', id)
    .single();

  if (error || !data) {
    console.error('Error fetching post:', error);
    return { notFound: true };
  }

  return { props: { post: data } };
};

export default function BlogPreview({ post }: { post: Post }) {
  return (
    <main style={{ maxWidth: '700px', margin: '2rem auto', padding: '0 1rem' }}>
      <Link href="/blog">
        <a style={{ display: 'block', marginBottom: '1rem', color: '#0070f3' }}>← 管理に戻る</a>
      </Link>

      <h1 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{post.title}</h1>
      <p style={{ color: '#888', marginBottom: '1.5rem' }}>{post.date}</p>

      {post.thumbnail && (
        <img
          src={post.thumbnail}
          alt={post.title}
          style={{
            width: '100%',
            borderRadius: '8px',
            marginBottom: '1.5rem',
          }}
        />
      )}

      <div className="markdown-body">
        <ReactMarkdown>{post.content || ''}</ReactMarkdown>
      </div>
    </main>
  );
}
