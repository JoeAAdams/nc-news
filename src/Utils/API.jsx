import axios from "axios";

const newsApi = axios.create({
    baseURL: "https://nc-news-wpw8.onrender.com/api/",
});

export function fetchArticles() {
    return newsApi("/articles").then((response) => {
        return response.data.articles;
    });
}

export function fetchSingleArticle(article_id) {
    return newsApi(`articles/${article_id}`).then((response) => {
        return response.data.article[0];
    });
}

export function fetchArticleComments(article_id) {
    return newsApi.get(`articles/${article_id}/comments`).then((response) => {
        return response.data.comments;
    });
}

export function commentsVote(comment_id, voteInc) {
    return newsApi.patch(`comments/${comment_id}`, voteInc).then((response) => {
        console.log(response.data.comment[0]);
        return response.data.comment[0];
    });
}
