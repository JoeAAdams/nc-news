import axios from "axios";
import "./CSS/App.css";
import ViewArticles from "./Components/ViewArticles";
import { Route, Routes } from "react-router-dom";
import ViewSingleArticle from "./Components/ViewSingleArticle";
import Header from "./Components/Header";

function App() {
    return (
        <>
            <Header/>
            <div className="page"> 
                <Routes>
                    <Route path="/" element={<ViewArticles />} />
                    <Route
                        path="/article/:article_id"
                        element={<ViewSingleArticle />}
                    />
                </Routes>
            </div>
        </>
    );
}

export default App;
