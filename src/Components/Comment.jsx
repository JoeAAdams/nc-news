import { useContext, useEffect, useState } from "react";
import { commentsVote, deleteComment } from "../Utils/API";
import moment from "moment";
import "../CSS/Comment.css";
import { UserContext } from "./UserProvider";

export default function Comment({ comment, setRender }) {
    const [isUpvoted, setIsUpvoted] = useState(false);
    const [isDownvoted, setIsDownvoted] = useState(false);
    const [votes, setVotes] = useState(comment.votes);
    const [voteChange, setVoteChange] = useState({ inc_votes: 0 });
    const [isUpdating, setIsUpdating] = useState(false);
    const [toggle, setToggle] = useState(false);
    const { user } = useContext(UserContext);
    const [isDeleted, setIsDeleted] = useState(false);
    const [isUser, setIsUser] = useState(false);

    const handleVote = (event) => {
        const vote = event.target.value;
        setVoteChange({ inc_votes: 0 });
        if (vote === "upvote") {
            let change = 1;
            if (isDownvoted) {
                change = 2;
                setVoteChange((votes) => ({
                    inc_votes: (votes.inc_votes = 2),
                }));
            } else {
                setVoteChange((votes) => ({
                    inc_votes: votes.inc_votes++,
                }));
            }
            setIsDownvoted(false);
            setVotes((voted) => (isUpvoted ? voted - change : voted + change));
            if (isUpvoted) {
                setVoteChange({ inc_votes: -1 });
            }
            setToggle((toggle) => !toggle);
            setIsUpvoted((vote) => !vote);
        } else if (vote === "downvote") {
            let change = -1;
            if (isUpvoted) {
                change = -2;
                setVoteChange((votes) => ({
                    inc_votes: (votes.inc_votes = -2),
                }));
            } else {
                setVoteChange((votes) => ({
                    inc_votes: votes.inc_votes--,
                }));
            }
            setIsUpvoted(false);
            setVotes((voted) =>
                !isDownvoted ? voted + change : voted - change
            );
            if (isDownvoted) {
                setVoteChange({ inc_votes: 1 });
            }
            setToggle((toggle) => !toggle);
            setIsDownvoted((vote) => !vote);
        }
    };

    useEffect(() => {
        if (comment.author === user.username) setIsUser(true);
        if (voteChange.inc_votes) {
            setIsUpdating(true);
            commentsVote(comment.comment_id, voteChange).then((response) => {
                setIsUpdating(false);
                setVotes(response.votes);
            });
        }
    }, [toggle]);

    const removeComment = (event) => {
        setIsDeleted(true)
        deleteComment(event.target.value).then(
            setRender(cur => !cur)
        ).catch(() => {
            setIsDeleted(false)
        })
    };

    return (
        <div className={`article-comment ${isDeleted ? "hidden" : null}`}>
            <div className="vote-buttons">
                <button
                    disabled={isUpdating}
                    onClick={handleVote}
                    value="upvote"
                    className={isUpvoted ? `upvoted` : null}
                >
                    ^
                </button>
                <p className="votes">{votes}</p>
                <button
                    disabled={isUpdating}
                    onClick={handleVote}
                    value="downvote"
                    className={isDownvoted ? `downvoted` : null}
                >
                    v
                </button>
            </div>
            <div className="comment">
                <p className="comment-body">{comment.body}</p>
                <div className="comment-info">
                    <p>{comment.author}</p>
                    <p>{moment().to(comment.created_at.slice(0, 19))}</p>
                    {isUser ? (
                        <button
                            onClick={removeComment}
                            value={comment.comment_id}
                        >
                            Delete
                        </button>
                    ) : null}
                </div>
            </div>
        </div>
    );
}
