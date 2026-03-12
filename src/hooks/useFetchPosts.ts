import { useQuery } from "@tanstack/react-query"
import type { Post } from "../types/Post"

const fetchPosts = async (): Promise<Post[]> => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts")
  if (!res.ok) throw new Error(`HTTP Error: ${res.status}`)
  return res.json()
}

export const useFetchPosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts
  })
}