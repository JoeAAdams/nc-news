import { Link } from "react-router-dom";
import "../CSS/errorPage.css"

export default function ErrorPage() {
    return (
        <section className="error-page">
            <h1>404 Page not found</h1>
            <Link to="/" id="return">Return to homepage</Link>
        </section>
    );
}
