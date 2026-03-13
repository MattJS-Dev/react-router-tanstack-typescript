import { useQuery } from "@tanstack/react-query";
import type { Post } from "../types/Post";

const fetchPost = async (id: string): Promise<Post> => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)

    if (!res.ok) throw new Error(`HTTP Error: ${res.status}`)

    return res.json()
}

export const useFetchPost = (id: string) => {
    return useQuery({
        // Each post gets its own cache entry so use the id
        queryKey: ["posts", id],
        // Can't pass fetchPost directly as it needs the id argument
        // so wrap it in an arrow function
        queryFn: () => fetchPost(id)
    })
}