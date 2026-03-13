export default function Home() {

    return <>
        <main>
            <h1>React Router TanStack TypeScript</h1>

            <p>A scalable React application built with React Router v6, TanStack Query and TypeScript. Designed as a practical reference for how these tools work together in a real world codebase.</p>

            <h2>Features</h2>
            <ul>
                <li>Persistent layout with navigation using React Router Outlet</li>
                <li>List and detail pages with dynamic URL parameters</li>
                <li>Full CRUD operations via TanStack Query mutations</li>
                <li>Data fetching abstracted into reusable custom hooks</li>
                <li>Automatic cache invalidation after every mutation</li>
                <li>Shared TypeScript types derived from a single source of truth</li>
            </ul>
        </main>
    </>
}