import { useState } from "react"
import { useCreatePost } from "../hooks/useCreatePost"
import type { Post } from "../types/Post"

type NewPost = Required<Pick<Post, "title" | "body">>

export default function CreatePost() {
  const { mutate: createPost, isPending } = useCreatePost()
  const [newPost, setNewPost] = useState<NewPost>({ title: "", body: "" })

  const handleChange = (field: keyof NewPost, value: string) => {
    setNewPost(current => ({ ...current, [field]: value }))
  }

  const handleSubmit = () => {
    if (!newPost.title || !newPost.body) return
    createPost(newPost)
    setNewPost({ title: "", body: "" })
  }

  return (
    <div>
      <h2>Create Post</h2>
      <input
        value={newPost.title}
        onChange={(e) => handleChange("title", e.target.value)}
        placeholder="Post title"
      />
      <input
        value={newPost.body}
        onChange={(e) => handleChange("body", e.target.value)}
        placeholder="Post body"
      />
      <button onClick={handleSubmit} disabled={isPending}>
        {isPending ? "Creating..." : "Create Post"}
      </button>
    </div>
  )
}