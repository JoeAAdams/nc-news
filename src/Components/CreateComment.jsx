import { useContext, useEffect, useState } from "react";
import { createNewComment } from "../Utils/API";
import "../CSS/CreateComment.css";
import { UserContext } from "./UserProvider";

export default function CreateComment({ article_id, setRender, setComments }) {
    const [newComment, setNewComment] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);
    const [error, setError] = useState(false);
    const [noComment, setNoComment] = useState(true);
    const { user } = useContext(UserContext);

    const handleNewComment = (event) => {
        event.preventDefault();
        const commentObject = {
            username: user.username,
            body: newComment,
        };
        if (newComment) {
            // setComments((comments) => [

            // ])
            setNoComment(false);
            setIsDisabled(true);
            createNewComment(commentObject, article_id)
                .then(() => {
                    setIsDisabled(false);
                    setError(false);
                    setRender((cur) => !cur);
                    setNoComment(true)
                    setNewComment("")
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
            <form
                onSubmit={handleNewComment}
                className="create-new-comment"
                disabled={isDisabled}
            >
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
                    <button>Submit</button>
                    <div className={error ? "error" : "hidden"}>
                        {noComment ? (
                            <p aria-label="error message">comment required</p>
                        ) : (
                            <p aria-label="error message">
                                comment failed to post
                            </p>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
}
