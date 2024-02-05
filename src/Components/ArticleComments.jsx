import { useEffect, useState } from "react";
import { fetchArticleComments } from "../Utils/API";
import '../CSS/ArticleComments.css'

export default function ArticleComments({ article_id }) {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetchArticleComments(article_id).then((response) => {
            setComments(response);
        });
    }, []);

    return (
        <section>
            {comments.map((comment) => {
                return (
                    <div
                        className="article-comment"
                        key={`${comment.created_at}${comment.author}`}
                    >
                        <p>{comment.body}</p>
                        <div className="comment-info">
                            <p>{comment.author}</p>
                            <p>{Date(comment.created_at)}</p>
                            <p className="votes">Votes: {comment.votes}</p>
                        </div>
                    </div>
                );
            })}
        </section>
    );
}
