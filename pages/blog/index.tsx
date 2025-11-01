// pages/blog/index.tsx
import { useState } from "react";

type Post = {
  id: number;
  title: string;
  status: "下書き" | "公開";
};

export default function BlogManager() {
  const [posts, setPosts] = useState<Post[]>([
    { id: 1, title: "はじめての投稿", status: "下書き" },
  ]);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<Post["status"]>("下書き");

  const addPost = () => {
    if (!title.trim()) return;
    setPosts((prev) => [
      ...prev,
      { id: Date.now(), title: title.trim(), status },
    ]);
    setTitle("");
    setStatus("下書き");
  };

  const deletePost = (id: number) =>
    setPosts((prev) => prev.filter((p) => p.id !== id));

  return (
    <main className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <div className="mx-auto max-w-5xl px-5 py-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">
            ブログ管理
          </h1>
          <a
            href="/dashboard-v2"
            className="text-sm text-indigo-600 hover:text-indigo-700"
          >
            ← Dashboardへ戻る
          </a>
        </div>
        <p className="mt-1 text-sm text-gray-500">
          ここではブログ下書きの作成・一覧管理を行います（デモ：ローカル状態）。
        </p>
      </div>

      {/* 入力フォーム */}
      <div className="mx-auto max-w-5xl px-5">
        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-base font-medium text-gray-900">
            新規下書き
          </h2>
          <div className="grid gap-3 sm:grid-cols-[1fr,160px,120px]">
            <input
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500"
              placeholder="タイトルを入力"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <select
              className="rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500"
              value={status}
              onChange={(e) => setStatus(e.target.value as Post["status"])}
            >
              <option>下書き</option>
              <option>公開</option>
            </select>
            <button
              onClick={addPost}
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            >
              追加
            </button>
          </div>
        </div>
      </div>

      {/* 一覧 */}
      <div className="mx-auto mt-6 max-w-5xl px-5 pb-12">
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  タイトル
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  ステータス
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {posts.map((p) => (
                <tr key={p.id}>
                  <td className="px-4 py-3 text-sm text-gray-900">{p.title}</td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={
                        p.status === "公開"
                          ? "rounded bg-green-50 px-2 py-1 text-xs font-medium text-green-700"
                          : "rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700"
                      }
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => deletePost(p.id)}
                      className="rounded-md border border-gray-300 px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50"
                    >
                      削除
                    </button>
                  </td>
                </tr>
              ))}

              {posts.length === 0 && (
                <tr>
                  <td
                    colSpan={3}
                    className="px-4 py-6 text-center text-sm text-gray-500"
                  >
                    まだ下書きはありません。上のフォームから追加してください。
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
