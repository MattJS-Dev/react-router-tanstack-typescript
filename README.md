# React TanStack Query - TypeScript & Custom Hooks

TanStack Query (React Query) with TypeScript, showing full 
CRUD operations wrapped in custom hooks with a clean, scalable architecture.

## The Pattern

Rather than calling useQuery and useMutation directly in components, all data 
fetching and mutations are wrapped in custom hooks keeping components clean:
```tsx
// Without custom hooks - messy, hard to reuse
export default function App() {
  const { data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await fetch("/api/posts")
      if (!res.ok) throw new Error(`HTTP Error: ${res.status}`)
      return res.json()
    }
  })
}

// With custom hooks - clean, reusable, testable
export default function App() {
  const { data: posts } = useFetchPosts()
}
```

## Architecture
```
src/
  components/
    CreatePost.tsx    - Form for creating a new post
    UpdatePost.tsx    - Form for updating an existing post
    DeletePost.tsx    - Form for deleting a post
  hooks/
    useFetchPosts.ts  - useQuery - GET all posts
    useCreatePost.ts  - useMutation - POST new post
    useUpdatePost.ts  - useMutation - PUT update post
    useDeletePost.ts  - useMutation - DELETE post
  types/
    Post.ts           - Shared Post type used across all hooks and components
  App.tsx
  main.tsx
```

## Key Concepts

### Custom Hook Pattern
Each data operation has its own hook. The hook owns the data fetching, 
the component owns the UI:
```ts
// Hook owns data fetching
export const useFetchPosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts
  })
}

// Component owns UI
const { data: posts, isLoading, isError } = useFetchPosts()
```

### Derived Types with TypeScript Utility Types
Rather than defining separate types for each operation, types are derived 
from the base Post type. The database generates the id so it is excluded 
from create operations:
```ts
// Base type
type Post = {
  id: number
  title: string
  body?: string
}

// Create - id excluded as database generates it
type CreatePostInput = Required<Pick<Post, "title" | "body">>

// Update - id required so we know which post to update
type UpdatePostInput = Required<Pick<Post, "id" | "title" | "body">>

// Delete - only id needed
// just passes id: number directly
```

### Query Invalidation
After every mutation the relevant query cache is invalidated, 
triggering an automatic refetch of fresh data:
```ts
onSuccess: () => {
  queryClient.invalidateQueries({ queryKey: ["posts"] })
}
```

### Early Return Loading and Error States
Components handle loading and error states with early returns before 
the happy path render:
```tsx
if (isLoading) return <h2>Loading...</h2>
if (isError) return <h2>Something went wrong.</h2>

// Happy path
return <ul>{posts?.map(post => ...)}</ul>
```

### Functional State Updates
State updates that depend on previous state use the functional update 
form to guarantee the latest state value and avoid stale closures:
```tsx
// Safe - React provides guaranteed latest state as current
setPost(current => ({ ...current, [field]: value }))

// Unsafe - post could be stale in React 18 with automatic batching
setPost({ ...post, [field]: value })
```

## Why This Architecture?

- **Separation of concerns** - hooks own data, components own UI
- **Reusable** - hooks can be used in any component
- **Testable** - fetch functions can be tested independently
- **Type safe** - derived types stay in sync with the base type automatically
- **Scalable** - adding a new operation just means adding a new hook

## Setup
```bash
npm install
npm run dev
```

## Dependencies

- React 19
- TypeScript
- TanStack Query v5
- Vite