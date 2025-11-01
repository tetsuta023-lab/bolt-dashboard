import { useEffect, useState } from "react"
import Link from "next/link"
// ここを相対パスに
import { supabase } from "../../lib/supabaseClient"

type BlogPost = {
  id: number
  title: string
  status: string
  date: string
  excerpt: string
}

export default function BlogList() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order("date", { ascending: false })

      if (error) {
        console.error("Error fetching posts:", error)
      } else {
        setPosts(data || [])
      }
      setLoading(false)
    }
    fetchPosts()
  }, [])

  if (loading) return <p>読み込み中...</p>

  return (
    <div style={{ padding: "2rem" }}>
      <h1>📝 ブログ管理</h1>
      {posts.length === 0 ? (
        <p>記事がまだありません。</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} style={{ border: "1px solid #ddd", padding: "1rem", marginBottom: "1rem" }}>
            <p style={{ color: post.status === "published" ? "green" : "orange" }}>
              {post.status === "published" ? "公開中" : "下書き"}
            </p>
            <h3>{post.title}</h3>
            <p>{post.excerpt}</p>
            <p>{post.date}</p>
            <Link href={`/blog/preview/${post.id}`}>プレビュー</Link>
          </div>
        ))
      )}
    </div>
  )
}
