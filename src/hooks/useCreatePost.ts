import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Post } from "../types/Post";

type CreatPostInput = Required<Pick<Post, "title" | "body">>

const createPost = async (input: CreatPostInput): Promise<Post> => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input)
    })

    if(!res.ok) throw new Error(`HTTP Error: ${res.status}`)
    
    return res.json()
}

// Hook
export const useCreatePost = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: createPost,
        onSuccess: (newPost) => {
            console.log("Created:", newPost)
            queryClient.invalidateQueries({ queryKey: ["posts"] })
        },
        onError: (error) => {
            console.error("Failed to create post:", error)
        }
    })
}