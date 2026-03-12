import { useState } from "react"
import { useDeletePost } from "../hooks/useDeletePost"

export default function DeletePost() {
  const { mutate: deletePost, isPending } = useDeletePost()
  const [id, setId] = useState<number>(1)

  const handleSubmit = () => {
    if (!id) return
    deletePost(id)
  }

  return (
    <div>
      <h2>Delete Post</h2>
      <input
        type="number"
        value={id}
        onChange={(e) => setId(Number(e.target.value))}
        placeholder="Post ID"
      />
      <button onClick={handleSubmit} disabled={isPending}>
        {isPending ? "Deleting..." : "Delete Post"}
      </button>
    </div>
  )
}