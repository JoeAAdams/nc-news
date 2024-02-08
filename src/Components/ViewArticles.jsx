import { useEffect, useState } from "react";
import "../CSS/viewArticles.css";
import { Link, Navigate, useParams, useSearchParams } from "react-router-dom";
import { fetchArticles } from "../Utils/API";
import Topics from "./Topics";
import moment from "moment";

export default function ViewArticles() {
    const { topic } = useParams();
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState([false]);
    const [sort, setSort] = useSearchParams();
    const [descToggle, setDescToggle] = useState(true);
    const [sortValue, setSortValue] = useState("no_sort");
    const [redirect, setRedirect] = useState(false)


    useEffect(() => {
        if (!topic && !sort.get("sort_by") && !sort.get("order")){
            // Reset sort and order when page is reloaded to fresh
            setSortValue("no_sort")
            setDescToggle(true)
        };;
        const searchQuery = {
            params: {
                topic,
                sort_by: sort.get("sort_by"),
                order: sort.get("order"),
            },
        };
        setIsLoading(true);
        fetchArticles(searchQuery).then((data) => {
            setArticles(data);
            setIsLoading(false);
        }).catch(() => {
            setRedirect(true)
        });
    }, [topic, sort]);

    function handleSort(event) {
        sort.set("sort_by", event.target.value);
        setSortValue(event.target.value);
        setSort(sort);
    }

    function handleSortOrder(event) {
        setDescToggle((cur) => !cur);
        sort.set("order", event.target.value);
        setSort(sort);
    }

    return (
        <div className="homepage">
            <section className="filters">
                <Topics />
                <div className="sort-by">
                    <select
                        name="sort"
                        onChange={handleSort}
                        className="sort"
                        value={sortValue}
                    >
                        <option value="no_sort">No sort</option>
                        <option value="created_at">Date</option>
                        <option value="votes">Votes</option>
                        <option value="comment_count">Comments</option>
                    </select>
                    {descToggle ? (
                        <button onClick={handleSortOrder} value="asc">
                            ↓
                        </button>
                    ) : (
                        <button onClick={handleSortOrder} value="desc">
                            ↑
                        </button>
                    )}
                </div>
            </section>
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
                                <div className="article-info">
                                    <h2>{article.title}</h2>
                                    <div className="article-stats">
                                        <p>{article.author}</p>
                                        <p>Votes: {article.votes}</p>
                                        <p className="comment-count">
                                            Comments: {article.comment_count}
                                        </p>
                                        <p>
                                            {moment
                                                .parseZone(article.created_at)
                                                .local(true)
                                                .format("MMM DD YYYY")}
                                        </p>
                                    </div>
                                </div>
                            </li>
                        </Link>
                    );
                })}
            </ul>
            {redirect ? (<Navigate to={"*"}/>) : null}
            
        </div>
    );
}
