import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchSingleArticle } from "../Utils/API";
import ArticleComments from "./ArticleComments";
import "../CSS/article.css";
import CreateComment from "./CreateComment";

export default function ViewSingleArticle() {
    const { article_id } = useParams();
    const [article, setArticle] = useState("");
    const [render, setRender] = useState(true)

    
    useEffect(() => {
        fetchSingleArticle(article_id).then((data) => {
            setArticle(data);
        })
    }, []);

    return (
        <div id="article">
            <h1>{article.title}</h1>
            <h3>{`by ${article.author}`}</h3>
            <img
                src={article.article_img_url}
                alt={`article image for ${article.title}`}
            />
            <p id="body">{article.body}</p>
            <CreateComment article_id={article_id} setRender={setRender}/>
            <ArticleComments article_id={article_id} render={render} setRender={setRender}/>
        </div>
    );
}
