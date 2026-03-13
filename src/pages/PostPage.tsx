import { useParams } from "react-router-dom"
import { useFetchPost } from "../hooks/useFetchPost"

export default function PostPage() {
    // useParams returns string | undefined
    // Use "" as default so TypeScript doesn't complain
    // MUST use the name "id" in useParams() to match dynamic route defined in App.tsx. Can call it anything but must match.
    const {id = ""} = useParams()
    const { data:post, isLoading, isError } = useFetchPost(id)

    if (isLoading) return <h2>Loading...</h2>
    if (isError) return <h2>Something went wrong.</h2>

    return <>
        <main>
            <h1>{post?.title}</h1>

            <p>{post?.body}</p>
        </main>
    </>
}