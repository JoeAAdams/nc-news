import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./CSS/index.css";
import { UserProvider } from "./Components/UserProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <UserProvider>
        <BrowserRouter>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </BrowserRouter>
    </UserProvider>
);
