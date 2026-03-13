import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import Posts from "./pages/PostsPage"
import PostPage from "./pages/PostPage"

export default function App() {

  return <>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />}/>
        <Route path="posts" element={<Posts />} />
        <Route path="posts/:id" element={<PostPage />} />
        <Route path="*" element={<h2>404 - Page not found</h2>} />
      </Route>
    </Routes>
  </>
}