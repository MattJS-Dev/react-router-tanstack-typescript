import { useFetchPosts } from "./hooks/useFetchPosts"
import CreatePost from "./components/CreatePost"
import UpdatePost from "./components/UpdatePost"
import DeletePost from "./components/DeletePost"

export default function App() {
  const {data: posts, isLoading, isError} = useFetchPosts()

  if (isLoading) return <h2>Loading...</h2>
  if (isError) return <h2>Something went wrong.</h2>

  return <>
    <main>
      <h1>TanStack Query TypeScript</h1>

      <CreatePost />

      <UpdatePost />

      <DeletePost />

      <ul>
        {posts?.map((post) => {
          return <li key={post.id}>{post.id} {post.title}</li>
        })}
      </ul>
    </main>
  </>
}