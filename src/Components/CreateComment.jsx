import { useEffect, useState } from "react";
import { createNewComment } from "../Utils/API";
import "../CSS/CreateComment.css";

export default function CreateComment({ article_id, setRender }) {
    const [newComment, setNewComment] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);
    const [error, setError] = useState(false);

    const handleNewComment = (event) => {
        event.preventDefault();
        const commentObject = {
            username: "cooljmessy",
            body: newComment,
        };
        if (newComment) {
            setIsDisabled(true);
            createNewComment(commentObject, article_id)
                .then((response) => {
                    setIsDisabled(false);
                    setError(false);
                    setRender((cur) => !cur);
                })
                .catch((err) => {
                    setIsDisabled(false);
                    setError(true);
                });
        } else {
            setError(true);
        }
    };

    return (
        <div>
            <form onSubmit={handleNewComment} className="create-new-comment">
                <textarea
                    id="comment-area"
                    type="text"
                    name="new-comment"
                    aria-label="add-new-comment"
                    value={newComment}
                    onChange={(event) => setNewComment(event.target.value)}
                    placeholder="new comment..."
                    disabled={isDisabled}
                    className={error ? "red-outline" : null}
                />
                <div id="submit-and-error">
                    <button disabled={isDisabled}>Submit</button>
                    <p
                        aria-label="error message"
                        className={error ? "error" : "hidden"}
                    >
                        error sending message
                    </p>
                </div>
            </form>
        </div>
    );
}
