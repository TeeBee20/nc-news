import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchTopics } from "../utils";

const Nav = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    fetchTopics().then((topics) => {
      setTopics(topics);
    });
  }, []);

  return (
    <div className="Nav">
      <ul>
        {topics.map((topic) => {
          return (
            <li key={topic.slug}>
              <Link to={`/${topic.slug}`}>{topic.slug}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Nav;
