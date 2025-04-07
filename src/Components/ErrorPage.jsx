import { Link } from "react-router-dom";
import "../CSS/errorPage.css";

export default function ErrorPage() {
    return (
        <section className="error-page">
            <h1>404 Page not found</h1>
            <h2>
                Sometimes the data needs time to load, please wait 1-2 mintutes before refreshing
            </h2>
            <Link to="/" id="return">
                Return to homepage
            </Link>
        </section>
    );
}
