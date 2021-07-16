import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchTopics } from "../utils";
import useLoading from '../../hooks/useLoading';
import useError from '../../hooks/useError';

const Nav = () => {
  const [topics, setTopics] = useState([]);
  const { loading, setLoading} = useLoading();
  const {hasError, setHasError} = useError();

  useEffect(() => {
    setHasError(false);
    fetchTopics().then((topics) => {
      setTopics(topics);
      setLoading(false);
    }).catch(err => {
      if (err) {
        setHasError(true);
      }
    });
  }, []);


  return (
    <div className="Nav">
      {loading && <p>Loading...</p>}
      {hasError && <p>Oops! Couldn't load topics.</p>}
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
