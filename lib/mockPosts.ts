// lib/mockPosts.ts
import { Post } from './types';

let posts: Post[] = [
  {
    id: '1',
    title: 'Hotel Okura Tokyo Bay 宿泊レビュー',
    content: '本文サンプル：チェックイン、朝食、アクセスなど。',
    status: 'published',
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: '（下書き）長岡花火の取材メモ',
    content: 'メモサンプル：行程、撮影ポイント、費用など。',
    status: 'draft',
    updatedAt: new Date().toISOString(),
  },
];

export const listPosts = async () =>
  posts.sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));

export const getPost = async (id: string) =>
  posts.find((p) => p.id === id) ?? null;

export const createPost = async (
  data: Omit<Post, 'id' | 'updatedAt'>
) => {
  const p: Post = {
    ...data,
    id: String(Date.now()),
    updatedAt: new Date().toISOString(),
  };
  posts = [p, ...posts];
  return p;
};

export const updatePost = async (
  id: string,
  data: Partial<Omit<Post, 'id' | 'updatedAt'>>
) => {
  posts = posts.map((p) =>
    p.id === id ? { ...p, ...data, updatedAt: new Date().toISOString() } : p
  );
  return posts.find((p) => p.id === id) ?? null;
};
