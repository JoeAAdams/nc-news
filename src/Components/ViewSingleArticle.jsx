import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchSingleArticle } from "../Utils/API";
import ArticleComments from "./ArticleComments";
import '../CSS/article.css'

export default function ViewSingleArticle() {
    const { article_id } = useParams();
    const [article, setArticle] = useState("");
    useEffect(() => {
        fetchSingleArticle(article_id).then((data) => {
            setArticle(data);
        })
    }, []);

    return (
        <div id="article">
            <h1>{article.title}</h1>
            <h3>{`by ${article.author}`}</h3>
            <img src={article.article_img_url} alt={`article image for ${article.title}`} />
            <p id="body">{article.body}</p>
            <ArticleComments article_id={article_id}/>
        </div>
    );
}
