import { useMutation, useQueryClient } from "@tanstack/react-query"

const deletePost = async (id: number): Promise<void> => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: "DELETE"
  })
  if (!res.ok) throw new Error(`HTTP Error: ${res.status}`)
}

export const useDeletePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      console.log("Deleted successfully")
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    },
    onError: (error) => {
      console.error("Failed to delete:", error)
    }
  })
}