import axios from "axios";

const newsApi = axios.create({
    baseURL: "https://nc-news-wpw8.onrender.com/api/",
});

export function fetchArticles(queries) {
    return newsApi("/articles", queries).then((response) => {
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
        return response.data.comment[0];
    });
}

export function createNewComment(commentObject, article_id) {
    // Uncomment to force error vv
    // commentObject = {}
    return newsApi
        .post(`articles/${article_id}/comments`, commentObject)
        .then((response) => {
            return response.data.comment[0];
        });
}

export function users() {
    return newsApi.get(`users`).then((response) => {
        return response.data.users;
    });
}

export function getUser(username) {
    return newsApi.get(`users/${username}`).then((response) => {
        return response.data.user[0];
    });
}

export function deleteComment(comment_id) {
    return newsApi.delete(`comments/${comment_id}`);
}

export function getTopics() {
    return newsApi.get("topics").then((response) => {
        return response.data.topics;
    });
}
