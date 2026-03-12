import { useState } from "react"
import { useUpdatePost } from "../hooks/useUpdatePost"
import type { Post } from "../types/Post"

type UpdatePostInput = Required<Pick<Post, "id" | "title" | "body">>

export default function UpdatePost() {
  const { mutate: updatePost, isPending } = useUpdatePost()
  const [post, setPost] = useState<UpdatePostInput>({ id: 1, title: "", body: "" })

  const handleChange = (field: keyof UpdatePostInput, value: string | number) => {
    setPost(current => ({ ...current, [field]: value }))
  }

  const handleSubmit = () => {
    if (!post.title || !post.body) return
    updatePost(post)
  }

  return (
    <div className="crud-panel-wrapper">
      <h2>Update Post</h2>
      <input
        type="number"
        value={post.id}
        onChange={(e) => handleChange("id", Number(e.target.value))}
        placeholder="Post ID"
      />
      <input
        value={post.title}
        onChange={(e) => handleChange("title", e.target.value)}
        placeholder="Post title"
      />
      <input
        value={post.body}
        onChange={(e) => handleChange("body", e.target.value)}
        placeholder="Post body"
      />
      <button onClick={handleSubmit} disabled={isPending}>
        {isPending ? "Updating..." : "Update Post"}
      </button>
    </div>
  )
}