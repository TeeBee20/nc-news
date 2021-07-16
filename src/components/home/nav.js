import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchTopics } from "../utils";
import useLoading from '../../hooks/useLoading';

const Nav = () => {
  const [topics, setTopics] = useState([]);
  const { loading, setLoading} = useLoading();

  useEffect(() => {
    fetchTopics().then((topics) => {
      setTopics(topics);
      setLoading(false);
    });
  }, []);

  return (
    <div className="Nav">
      {!loading ? <ul>
        {topics.map((topic) => {
          return (
            <li key={topic.slug}>
              <Link to={`/${topic.slug}`}>{topic.slug}</Link>
            </li>
          );
        })}
      </ul> : <p>Loading...</p>}
    </div>
  );
};

export default Nav;
