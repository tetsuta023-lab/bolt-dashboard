// pages/blog/data.ts
export type PostStatus = 'draft' | 'published';

export type Post = {
  id: string;
  title: string;
  status: PostStatus;
  updatedAt: string; // YYYY-MM-DD
  excerpt: string;
  content: string;
  thumbnailUrl?: string; // ★ サムネイル（省略可）
};

// デモ用の固定データ（必要に応じて書き換えOK）
export const POSTS: Post[] = [
  {
    id: '1',
    title: '（下書き）長岡花火の取材メモ',
    status: 'draft',
    updatedAt: '2025-10-31',
    excerpt: 'メモサンプル：行程、撮影ポイント、費用など。',
    content: '本文（取材メモの詳細）',
    thumbnailUrl: 'https://images.unsplash.com/photo-1505022610485-0249ba5b3675?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: '2',
    title: 'Hotel Okura Tokyo Bay 宿泊レビュー',
    status: 'published',
    updatedAt: '2025-10-25',
    excerpt: '本文サンプル：チェックイン、朝食、アクセスなど。',
    content: '本文（宿泊レビュー詳細）',
    thumbnailUrl: 'https://images.unsplash.com/photo-1501117716987-c8e2a1a936a9?q=80&w=1200&auto=format&fit=crop'
  }
];

// 便利関数（UI用）
export const listPosts = () => POSTS;
export const getPostById = (id: string) => POSTS.find(p => p.id === id);
