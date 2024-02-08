import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { fetchSingleArticle } from "../Utils/API";
import { fetchArticleComments } from "../Utils/API";
import ArticleComments from "./ArticleComments";
import "../CSS/article.css";
import CreateComment from "./CreateComment";

export default function ViewSingleArticle() {
    const { article_id } = useParams();
    const [article, setArticle] = useState("");
    const [render, setRender] = useState(true);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        fetchSingleArticle(article_id)
            .then((data) => {
                setArticle(data);
            })
            .catch(() => {
                setRedirect(true);
            });
    }, []);

    const [comments, setComments] = useState([]);
    useEffect(() => {
        fetchArticleComments(article_id).then((response) => {
            setComments(response);
        });
    }, [render]);

    return (
        <>
            {redirect ? <Navigate to="*" /> : null}
            <div id="article">
                <h1>{article.title}</h1>
                <h3>{`by ${article.author}`}</h3>
                <img
                    src={article.article_img_url}
                    alt={`article image for ${article.title}`}
                />
                <p id="body">{article.body}</p>
                <CreateComment
                    article_id={article_id}
                    setRender={setRender}
                    setComments={setComments}
                />
                <ArticleComments comments={comments} setRender={setRender} />
            </div>
        </>
    );
}
