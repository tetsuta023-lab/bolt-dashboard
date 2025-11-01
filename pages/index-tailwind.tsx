export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-indigo-100 to-blue-200 text-gray-800">
      <h1 className="text-5xl font-bold mb-6">
        Welcome to <span className="text-indigo-600">Tetsuta Creative Lab</span> Dashboard 🚀
      </h1>
      <p className="text-lg mb-8">Tailwind CSS is working perfectly 🎨</p>
      <a
        href="/dashboard"
        className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition-all"
      >
        Go to Dashboard →
      </a>
    </main>
  );
}
