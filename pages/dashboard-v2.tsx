import Link from "next/link";

type Card = { title: string; href: string };

const cards: Card[] = [
  { title: "ブログ管理", href: "/blog" },
  { title: "神社＆旅ログ", href: "/travel" },
  { title: "マイル＆ポイント", href: "/miles" },
  { title: "Airbnb利益計算", href: "/airbnb" },
  { title: "Kindle出版", href: "/kindle" },
  { title: "AI画像倉庫", href: "/images" },
  { title: "スポーツ記録", href: "/sports" },
  { title: "優しさマップ", href: "/kindness" },
];

export default function DashboardV2() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <h1 className="text-center text-2xl font-semibold text-gray-900">
          Tetsuta Creative Lab — Dashboard v2
        </h1>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => (
            <Link
              key={c.title}
              href={c.href}
              className="block rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="text-sm text-gray-500">Open</div>
              <div className="mt-1 text-base font-medium text-gray-900">
                {c.title}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
import Link from "next/link";
import { useRouter } from "next/router";

// デモ用の仮データ（あとでSupabase連携に差し替え）
const MOCK_POSTS = [
  { id: "draft-1", title: "（下書き）長岡花火の取材メモ", status: "draft", updatedAt: "2025-10-31" },
  { id: "review-1", title: "Hotel Okura Tokyo Bay 宿泊レビュー", status: "published", updatedAt: "2025-10-25" },
];

export default function BlogIndex() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-6 py-8">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900">ブログ管理</h1>
          <Link
            href="/blog/new"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm text-white hover:bg-indigo-700"
          >
            ＋ 新規記事
          </Link>
        </div>

        <p className="mt-2 text-sm text-gray-500">
          下書きの管理・公開管理を行います（今はダミーデータ表示）。
        </p>

        <div className="mt-6 space-y-3">
          {MOCK_POSTS.map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4"
            >
              <div>
                <div className="font-medium text-gray-900">{p.title}</div>
                <div className="mt-1 text-xs text-gray-500">
                  ステータス：{p.status === "draft" ? "下書き" : "公開中"} ・ 更新日：{p.updatedAt}
                </div>
              </div>
              <div className="flex gap-2">
                <Link
                  href={`/blog/edit/${p.id}`}
                  className="rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
                >
                  編集
                </Link>
                <Link
                  href={`/blog/preview/${p.id}`}
                  className="rounded-md bg-gray-800 px-3 py-1.5 text-sm text-white hover:bg-black"
                >
                  プレビュー
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <Link href="/dashboard-v2" className="text-sm text-indigo-600 hover:text-indigo-700">
            ← Dashboard v2 に戻る
          </Link>
        </div>
      </div>
    </main>
  );
}
import Link from "next/link";

export default function BlogNew() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-3xl px-6 py-8">
        <h1 className="text-2xl font-semibold text-gray-900">新規記事</h1>

        <form className="mt-6 space-y-4">
          <div>
            <label className="block text-sm text-gray-700">タイトル</label>
            <input className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm text-gray-700">本文</label>
            <textarea rows={10} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 outline-none" />
          </div>

          <div className="flex gap-2">
            <button type="button" className="rounded-md bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700">
              保存（ダミー）
            </button>
            <Link href="/blog" className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
              キャンセル
            </Link>
          </div>
        </form>

        <div className="mt-6">
          <Link href="/blog" className="text-sm text-indigo-600 hover:text-indigo-700">
            ← 一覧へ戻る
          </Link>
        </div>
      </div>
    </main>
  );
}
import { useRouter } from "next/router";
import Link from "next/link";

export default function BlogEdit() {
  const { query } = useRouter();
  const { id } = query;

  const mock = {
    title: id === "draft-1" ? "（下書き）長岡花火の取材メモ" : "Hotel Okura Tokyo Bay 宿泊レビュー",
    content:
      id === "draft-1"
        ? "ここに長岡花火の取材メモ（ダミー）が入ります。"
        : "ここにホテル宿泊レビュー（ダミー）が入ります。",
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-3xl px-6 py-8">
        <h1 className="text-2xl font-semibold text-gray-900">記事を編集</h1>
        <p className="mt-1 text-sm text-gray-500">ID: {id}</p>

        <form className="mt-6 space-y-4">
          <div>
            <label className="block text-sm text-gray-700">タイトル</label>
            <input defaultValue={mock.title} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm text-gray-700">本文</label>
            <textarea defaultValue={mock.content} rows={12} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 outline-none" />
          </div>

          <div className="flex gap-2">
            <button type="button" className="rounded-md bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700">
              更新（ダミー）
            </button>
            <Link href={`/blog/preview/${id}`} className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
              プレビューを見る
            </Link>
          </div>
        </form>

        <div className="mt-6">
          <Link href="/blog" className="text-sm text-indigo-600 hover:text-indigo-700">
            ← 一覧へ戻る
          </Link>
        </div>
      </div>
    </main>
  );
}
import { useRouter } from "next/router";
import Link from "next/link";

export default function BlogPreview() {
  const { query } = useRouter();
  const { id } = query;

  const mockTitle = id === "draft-1" ? "（下書き）長岡花火の取材メモ" : "Hotel Okura Tokyo Bay 宿泊レビュー";
  const mockBody =
    id === "draft-1"
      ? "これはプレビューのダミー本文です。長岡花火のポイント、移動、グルメなど。"
      : "これはプレビューのダミー本文です。部屋、朝食、アクセス、総評など。";

  return (
    <main className="min-h-screen bg-white">
      <article className="prose mx-auto max-w-3xl px-6 py-10">
        <h1>{mockTitle}</h1>
        <p>{mockBody}</p>
      </article>

      <div className="mx-auto max-w-3xl px-6">
        <Link href="/blog" className="text-sm text-indigo-600 hover:text-indigo-700">
          ← 一覧へ戻る
        </Link>
      </div>
    </main>
  );
}
