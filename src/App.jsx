import "./CSS/App.css";
import ViewArticles from "./Components/ViewArticles";
import { Route, Routes } from "react-router-dom";
import ViewSingleArticle from "./Components/ViewSingleArticle";
import Header from "./Components/Header";
import Users from "./Components/Users";
import ErrorPage from "./Components/ErrorPage";

function App() {
    
    return (
        <>
            <Header />
            <div className="page">
                <Routes>
                    <Route path="topic/:topic" element={<ViewArticles/>}/>
                    <Route path="/" element={<ViewArticles />} />
                    <Route
                        path="/article/:article_id"
                        element={<ViewSingleArticle />}
                    />                
                    <Route path="/login" element={<Users />}/>
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            </div>
        </>
    );
}

export default App;
