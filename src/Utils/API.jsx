import axios from "axios";

const newsApi = axios.create({
    baseURL: "https://nc-news-wpw8.onrender.com/api/",
});

export function fetchSingleArticle(article_id){
    return newsApi(`articles/${article_id}`).then((response) => {
        console.log(response.data);
        return response.data.article[0]

    });
}

export function fetchArticles () {
    return newsApi("/articles").then((response) => {
        return response.data.articles;
    });
}
