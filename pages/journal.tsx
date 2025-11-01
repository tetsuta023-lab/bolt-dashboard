import Head from "next/head";

export default function Journal() {
  return (
    <>
      <Head>
        <title>Journal | Tetsuta Creative Lab</title>
        <meta name="description" content="Trip & creative journal" />
      </Head>

      <main className="min-h-screen bg-gradient-to-b from-indigo-100 to-blue-200 text-gray-800">
        <section className="max-w-3xl mx-auto px-6 py-16">
          <h1 className="text-4xl font-bold mb-4">Journal</h1>
          <p className="text-gray-600 mb-8">
            旅・制作・ビジネスのログをここにまとめていくページのたたき台です。
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <article className="rounded-xl bg-white/80 backdrop-blur p-5 shadow">
              <h2 className="font-semibold">サンプル記事 1</h2>
              <p className="text-sm text-gray-600">
                ここに要約テキスト。Tailwind でカードを並べる例。
              </p>
            </article>

            <article className="rounded-xl bg-white/80 backdrop-blur p-5 shadow">
              <h2 className="font-semibold">サンプル記事 2</h2>
              <p className="text-sm text-gray-600">
                コンポーネント化して差し替えていけます。
              </p>
            </article>
          </div>

          <a
            href="/"
            className="inline-block mt-10 px-5 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:opacity-90 transition"
          >
            ← Back to Home
          </a>
        </section>
      </main>
    </>
  );
}
