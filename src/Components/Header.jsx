import { Link } from "react-router-dom";
import "../CSS/Header.css";

import { useContext } from "react";
import { UserContext } from "./UserProvider";

export default function Header() {
    const { user, setUser } = useContext(UserContext);

    const logout = () => {
        setUser({});
    };

    return (
        <section className="header">
            <Link to="/">
                <h1>NC News</h1>
            </Link>
            <div id="search">
                <input type="text" />
                <button>Search</button>
            </div>
            <div className="user-options">
                {Object.keys(user).length ? (
                    <>
                        <Link to="/login">Change user</Link>
                        <p onClick={logout}>Logout</p>
                        <img src={user.avatar_url} alt={`${user.name}'s avatar`} />
                    </>
                ) : (
                    <Link to="/login">Login</Link>
                )}
            </div>
        </section>
    );
}
