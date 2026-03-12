import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { Post } from "../types/Post"

type UpdatePostInput = Required<Pick<Post, "id" | "title" | "body">>

const updatePost = async (input: UpdatePostInput): Promise<Post> => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${input.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input)
  })
  if (!res.ok) throw new Error(`HTTP Error: ${res.status}`)
  return res.json()
}

export const useUpdatePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updatePost,
    onSuccess: (updatedPost) => {
      console.log("Updated:", updatedPost)
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    },
    onError: (error) => {
      console.error("Failed to update:", error)
    }
  })
}