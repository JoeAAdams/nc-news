import { useEffect, useState } from "react";
import { newsApi } from "../App";
import '../CSS/viewArticles.css'

export default function ViewArticles () {
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState([false])
 
    useEffect(() => {
        setIsLoading(true)
        newsApi("/articles").then((response) => {
            setIsLoading(false)
            setArticles(response.data.articles)
        })
    },[])

    return (
        <ul className="articles-list">
            {articles.map((article) => {
                return (
                    <li className="article-item" key={`${article.title}-${article.author}`}>
                        <img src={article.article_img_url} alt={`image for ${article.title}`} />
                        <h3>{article.title}</h3>
                        <p>{article.author}</p>
                        
                    </li>
                )
            })}
        </ul>
    )
}