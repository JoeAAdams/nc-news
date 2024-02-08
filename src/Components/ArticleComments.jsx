import { useEffect, useState } from "react";

import Comment from "./Comment";
import "../CSS/ArticleComments.css";

export default function ArticleComments({ comments, setRender }) {


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
