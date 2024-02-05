import { useEffect, useState } from "react";
import { commentsVote } from "../Utils/API";
import '../CSS/Comment.css'

export default function Comment({ comment }) {
    const [isUpvoted, setIsUpvoted] = useState(false);
    const [isDownvoted, setIsDownvoted] = useState(false);
    const [votes, setVotes] = useState(comment.votes);
    const [voteChange, setVoteChange] = useState({ inc_votes: 0 });
    const [isUpdating, setIsUpdating] = useState(false)

    const handleVote = (event) => {
        const vote = event.target.value;
        if (vote === "upvote") {
            if (isDownvoted) {
                setVoteChange((votes) => ({
                    inc_votes: votes.inc_votes = 2,
                }));
            } else {
                setVoteChange((votes) => ({
                    inc_votes: votes.inc_votes++,
                }));
            }
            setIsDownvoted(false);
            setVotes((voted) =>
            isUpvoted
            ? voted - voteChange.inc_votes
            : voted + voteChange.inc_votes
            );
            if (isUpvoted){
                setVoteChange({inc_votes: -1})
            }
            setIsUpvoted((vote) => !vote);
        } else if (vote === "downvote") {
            console.log(isUpvoted);
            if (isUpvoted) {
                setVoteChange((votes) => ({
                    inc_votes: votes.inc_votes = -2,
                }));
            } else {
                setVoteChange((votes) => ({
                    inc_votes: votes.inc_votes--,
                }));
            }
            setIsUpvoted(false);
            setVotes((voted) =>
            !isDownvoted
            ? voted + voteChange.inc_votes
            : voted - voteChange.inc_votes
            );
            if (isDownvoted){
                setVoteChange({inc_votes: 1})
            }
            setIsDownvoted((vote) => !vote);
        }
    };
    
    useEffect(() => {
        setVoteChange({inc_votes: 0})
        if (voteChange.inc_votes){
            setIsUpdating(true)
            commentsVote(comment.comment_id, voteChange).then((response) => {
                setVotes(response.votes);
                setIsUpdating(false)
            });
        }
    }, [isUpvoted, isDownvoted]);

    return (
        <div className="article-comment">
            <p>{comment.body}</p>
            <div className="comment-info">
                <p>{comment.author}</p>
                <p>{Date(comment.created_at)}</p>
                <p className="votes">Votes: {votes}</p>
                <div>
                    <button disabled={isUpdating} onClick={handleVote} value="upvote" className={isUpvoted ? `upvoted` : null}>
                        ^
                    </button>
                    <button disabled={isUpdating} onClick={handleVote} value="downvote" className={isDownvoted ? `downvoted` : null}>
                        v
                    </button>
                </div>
            </div>
        </div>
    );
}
