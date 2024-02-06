import { Link } from "react-router-dom";
import "../CSS/Header.css"

export default function Header () {
    return (
        <section className="header">
            <Link to="/">
                <h1>NC News</h1>
            </Link >
        </section>
    )
}