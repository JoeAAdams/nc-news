import { useEffect, useState } from "react";
import { commentsVote } from "../Utils/API";
import "../CSS/Comment.css";

export default function Comment({ comment }) {
    const [isUpvoted, setIsUpvoted] = useState(false);
    const [isDownvoted, setIsDownvoted] = useState(false);
    const [votes, setVotes] = useState(comment.votes);
    const [voteChange, setVoteChange] = useState({ inc_votes: 0 });
    const [isUpdating, setIsUpdating] = useState(false);
    const [toggle, setToggle] = useState(false);

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
        if (voteChange.inc_votes) {
            setIsUpdating(true);
            commentsVote(comment.comment_id, voteChange).then((response) => {
                setIsUpdating(false);
                setVotes(response.votes);
            });
        }
    }, [toggle]);

    return (
        <div className="article-comment">
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
                <p>{comment.body}</p>
                <div className="comment-info">
                    <p>{comment.author}</p>
                    <p>{Date(comment.created_at)}</p>
                </div>
            </div>
        </div>
    );
}
