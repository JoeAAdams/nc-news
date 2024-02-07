import { useEffect, useState } from "react";
import "../CSS/viewArticles.css";
import { Link, useParams } from "react-router-dom";
import { fetchArticles } from "../Utils/API";
import Topics from "./Topics";

export default function ViewArticles() {
    const { topic } = useParams();
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState([false]);

    // console.log(newParams);
    useEffect(() => {
        setIsLoading(true);
        fetchArticles({params: {topic:topic}}).then((data) => {
            setArticles(data);
            setIsLoading(false);
        });
    }, [topic]);

    return (
        <div className="homepage">
            <Topics />

            <ul className="articles-list">
                {articles.map((article) => {
                    return (
                        <Link
                            to={`/article/${article.article_id}`}
                            key={`${article.title}-${article.author}`}
                        >
                            <li className="article-item">
                                <img
                                    src={article.article_img_url}
                                    alt={`image for ${article.title}`}
                                />
                                <h2>{article.title}</h2>
                                <p>{article.author}</p>
                            </li>
                        </Link>
                    );
                })}
            </ul>
        </div>
    );
}
