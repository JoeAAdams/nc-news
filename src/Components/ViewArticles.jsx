import { useEffect, useState } from "react";
import "../CSS/viewArticles.css";
import { Link } from "react-router-dom";
import { fetchArticles } from "../Utils/API";

export default function ViewArticles() {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState([false]);

    useEffect(() => {
        setIsLoading(true);
        fetchArticles().then((data) => {
            setArticles(data)
            setIsLoading(false);
        })
    }, []);

    return (
        <ul className="articles-list">
            {articles.map((article) => {
                return (
                    <Link to={`/article/${article.article_id}`} key={`${article.title}-${article.author}`}>
                        <li className="article-item">
                            <img
                                src={article.article_img_url}
                                alt={`image for ${article.title}`}
                            />
                            <h1>{article.title}</h1>
                            <p>{article.author}</p>
                        </li>
                    </Link>
                );
            })}
        </ul>
    );
}
