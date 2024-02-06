import { useContext, useEffect, useState } from "react";
import { getUser, users } from "../Utils/API";
import "../CSS/User.css";
import { Link } from "react-router-dom";
import { UserContext } from "./UserProvider";

export default function Users() {
    const [usersList, setUsersList] = useState([]);
    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        users()
            .then((users) => {
                return users.map((user) => {
                    return getUser(user.username);
                });
            })
            .then((promises) => {
                return Promise.all(promises);
            })
            .then((usersArray) => {
                setUsersList(usersArray);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <>
            <div className="users">
                {usersList.map((user) => {
                    return (
                        <Link
                            to={"/"}
                            onClick={() => setUser(user)}
                            key={user.username}
                        >
                            <div className="user">
                                <div>
                                    <img
                                        src={user.avatar_url}
                                        alt={`${user.username}'s avatar`}
                                    />
                                </div>
                                <div className="user-info">
                                    <h3>{user.username}</h3>
                                    <p>{user.name}</p>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </>
    );
}
