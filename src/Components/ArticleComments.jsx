import { useEffect, useState } from "react";
import { fetchArticleComments } from "../Utils/API";
import Comment from "./Comment";
import "../CSS/ArticleComments.css";

export default function ArticleComments({ article_id, render, setRender }) {
    const [comments, setComments] = useState([]);
    useEffect(() => {
        fetchArticleComments(article_id).then((response) => {
            setComments(response);
        });
    }, [render]);

    return (
        <section>
            {comments.map((comment) => {
                return (
                    <Comment
                        key={`${comment.created_at}${comment.author}`}
                        comment={comment}
                        setRender={setRender}
                    />
                );
            })}
        </section>
    );
}
