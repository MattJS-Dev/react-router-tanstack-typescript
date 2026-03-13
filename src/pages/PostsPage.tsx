import { useFetchPosts } from "../hooks/useFetchPosts"
import CreatePost from "../components/CreatePost"
import UpdatePost from "../components/UpdatePost"
import DeletePost from "../components/DeletePost"
import { Link } from "react-router-dom"

export default function PostsPage() {
  const { data: posts, isLoading, isError } = useFetchPosts()

  if (isLoading) return <h2>Loading...</h2>
  if (isError) return <h2>Something went wrong.</h2>

  return (
    <main>
      <h1>Posts</h1>
      <CreatePost />
      <UpdatePost />
      <DeletePost />
      <ul>
        {posts?.map(post => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>
              {post.id} {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}