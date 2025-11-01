import { useEffect, useState } from "react"
import Link from "next/link"
// 相対パス
import { supabase } from "../../../lib/supabaseClient"

type BlogPost = {
  id: number
  title: string
  status: string
  date: string
  excerpt: string
}

export default function BlogEditPage() {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const id = typeof window !== "undefined" ? window.location.pathname.split("/").pop() : undefined

  useEffect(() => {
    if (!id) return
    const fetchOne = async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("id", Number(id))
        .single()
      if (error) console.error(error)
      setPost(data || null)
      setLoading(false)
    }
    fetchOne()
  }, [id])

  if (loading) return <p>読み込み中...</p>
  if (!post) return <p>記事が見つかりません。</p>

  return (
    <div style={{ padding: "2rem" }}>
      <Link href="/blog">← 管理に戻る</Link>
      <h1>編集（準備中）</h1>
      <p>ID: {post.id}</p>
      <p>タイトル: {post.title}</p>
      <p>ステータス: {post.status}</p>
      <p>日付: {post.date}</p>
      <p>抜粋: {post.excerpt}</p>
    </div>
  )
}
