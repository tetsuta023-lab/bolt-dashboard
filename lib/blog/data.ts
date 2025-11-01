// lib/blog/data.ts
export type BlogPost = {
  id: number;
  title: string;
  status: 'draft' | 'published';
  date: string;        // YYYY-MM-DD
  excerpt: string;
  thumbnail?: string;
  body?: string;       // 本文（プレビュー用）
};

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "Hotel Okura Tokyo Bay 宿泊レビュー",
    status: "published",
    date: "2025-11-01",
    excerpt: "本文サンプル：チェックイン、朝食、アクセスなど。",
    thumbnail: "https://picsum.photos/seed/okura/800/450",
    body: `# Hotel Okura Tokyo Bay 宿泊レビュー

**チェックイン**はスムーズ。朝食ブッフェのパンが最高。
アクセスは舞浜駅からバスで◎。

- お部屋：清潔、広め
- 温浴：◎
- 総合：また泊まりたい！
`
  },
  {
    id: 2,
    title: "（下書き）長岡花火の取材メモ",
    status: "draft",
    date: "2025-10-31",
    excerpt: "メモサンプル：行程、撮影ポイント、費用など。",
    thumbnail: "https://picsum.photos/seed/nagaoka/800/450",
    body: `# 長岡花火 取材メモ

- 行程：東京→長岡
- 撮影ポイント：信濃川沿い
- フェニックスは**超必見**！
`
  }
];
