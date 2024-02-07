import { useState } from "react";
import "../CSS/Topics.css";
import { useEffect } from "react";
import { getTopics } from "../Utils/API";
import { Link } from "react-router-dom";

export default function Topics() {
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        getTopics().then((response) => {
            setTopics(response);
        });
    }, []);
    return (
        <section className="topics">
            <ul>
                {topics.map((topic) => {
                    return (
                        <li key={topic.slug} className="topic">
                            <Link to={`/topic/${topic.slug}`}>
                                <div>
                                    {topic.slug.slice(0, 1).toUpperCase() +
                                        topic.slug.slice(1)}
                                    <p className="description">{topic.description}</p>
                                </div>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}
