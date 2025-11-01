// lib/blog/data.ts
export type BlogPost = {
  id: number;
  title: string;
  status: "draft" | "published";
  date: string; // YYYY-MM-DD
  excerpt: string;
  thumbnail?: string;
};

export const posts: BlogPost[] = [
  {
    id: 1,
    title: "Hotel Okura Tokyo Bay 宿泊レビュー",
    status: "published",
    date: "2025-11-01",
    excerpt: "本文サンプル：チェックイン、朝食、アクセスなど。",
    thumbnail:
      "https://images.unsplash.com/photo-1551776235-dde6d4829808?w=1200&auto=format&fit=crop&q=60",
  },
  {
    id: 2,
    title: "（下書き）長岡花火の取材メモ",
    status: "draft",
    date: "2025-10-31",
    excerpt: "メモサンプル：行程、撮影ポイント、費用など。",
    thumbnail:
      "https://images.unsplash.com/photo-1503187685355-0d38e86a53f5?w=1200&auto=format&fit=crop&q=60",
  },
];
