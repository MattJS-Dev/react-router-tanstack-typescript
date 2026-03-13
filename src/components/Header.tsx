import { Link } from "react-router-dom"

export default function Header() {

    return <>
        <header>
            <nav aria-label="Main Navigation">
                <Link to="/">Home</Link>
                <Link to="/posts">Posts</Link>
            </nav>
        </header>
    </>
}