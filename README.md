# React Router TanStack TypeScript

A scalable React application built with React Router v6, TanStack Query and TypeScript. Designed as a practical reference for how these tools work together in a real world codebase.

## Features
- Persistent layout with navigation using React Router Outlet
- List and detail pages with dynamic URL parameters
- Full CRUD operations via TanStack Query mutations
- Data fetching abstracted into reusable custom hooks
- Automatic cache invalidation after every mutation
- Shared TypeScript types derived from a single source of truth

## Key Concepts

### Layout with Outlet
Layout wraps all pages. Outlet is the placeholder where the current page renders:
```tsx
export default function Layout() {
  return (
    <>
      <Header />
      <Outlet />  {/* current page renders here */}
    </>
  )
}
```

### Dynamic Routes with useParams
Route parameter defined with colon in the route path.
```tsx
// Route definition
<Route path="posts/:id" element={<PostPage />} />

// In component - id must match :id in route
const { id = "" } = useParams()
```

### Custom Hook with Dynamic Query Key
Each post gets its own cache entry via the id in the query key:
```ts
export const useFetchPost = (id: string) => {
  return useQuery({
    queryKey: ["posts", id],  // ["posts", "1"], ["posts", "2"] etc
    queryFn: () => fetchPost(id)
  })
}
```

### Query Invalidation after Mutations
After every mutation the relevant query cache is invalidated, triggering an automatic refetch of fresh data:
```ts
onSuccess: () => {
  queryClient.invalidateQueries({ queryKey: ["posts"] })
}
```

## Architecture
```
src/
  components/
    Layout.tsx        - Persistent layout with Header and Outlet
    Header.tsx        - Navigation with React Router Link
    CreatePost.tsx    - Create post form
    UpdatePost.tsx    - Update post form
    DeletePost.tsx    - Delete post form
  hooks/
    useFetchPosts.ts  - useQuery - GET all posts
    useFetchPost.ts   - useQuery - GET single post by id
    useCreatePost.ts  - useMutation - POST new post
    useUpdatePost.ts  - useMutation - PUT update post
    useDeletePost.ts  - useMutation - DELETE post
  pages/
    HomePage.tsx      - Home page
    PostsPage.tsx     - Posts list page
    PostPage.tsx      - Single post detail page
  types/
    Post.ts           - Shared Post type
  App.tsx             - Route definitions
  main.tsx            - App entry point with providers
```

## Setup
```bash
npm install
npm run dev
```

## Dependencies
- React 19
- TypeScript
- TanStack Query v5
- React Router v6
- Vite