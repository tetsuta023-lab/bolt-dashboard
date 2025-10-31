// pages/dashboard.tsx
import Link from "next/link";

export default function Dashboard() {
  const cards = [
    { href: "/blog", title: "ブログ管理" },
    { href: "/shrines", title: "神社&旅ログ" },
    { href: "/miles", title: "マイル&ポイント" },
    { href: "/airbnb", title: "Airbnb利益計算" },
    { href: "/kindle", title: "Kindle出版" },
    { href: "/gallery", title: "AI画像置き場" },
    { href: "/sports", title: "スポーツ記録" },
    { href: "/kindness", title: "優しさマップ" },
  ];

  return (
    <main style={{ maxWidth: 960, margin: "40px auto", padding: "0 16px" }}>
      <h1 style={{ textAlign: "center", marginBottom: 24 }}>
        Tetsuta Creative Lab — Dashboard
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 16,
        }}
      >
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            style={{
              display: "block",
              padding: 16,
              border: "1px solid #e5e7eb",
              borderRadius: 12,
              textDecoration: "none",
            }}
          >
            <div style={{ fontSize: 16, fontWeight: 600 }}>{c.title}</div>
            <div style={{ fontSize: 13, color: "#6b7280", marginTop: 6 }}>
              Open
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
