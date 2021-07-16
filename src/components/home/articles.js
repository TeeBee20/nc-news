import {
  fetchAllArticles,
  fetchArticlesByTopic,
  sortArticlesByQuery,
} from "../utils";
import useLoading from '../../hooks/useLoading';
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const { loading, setLoading} = useLoading();
  const { topic_slug } = useParams();

  useEffect(() => {
    if (topic_slug) {
      fetchArticlesByTopic(topic_slug).then((articles) => {
        setArticles(articles);
        setLoading(false);
      });
    } else {
      fetchAllArticles().then((articles) => {
        setArticles(articles);
         setLoading(false);
      });
    }
  }, [topic_slug]);
  
  const sort = (event) => {
    sortArticlesByQuery(event.target.value).then((articles) => {
      setArticles(articles);
    });
  };

  return (
    <div className="Articles">
      <h3>Sort By:</h3>
      <button value="created_at" onClick={sort}>Date</button>
      <button value="comment_count" onClick={sort}>Comments</button>
      <button value="votes" onClick={sort}>Votes</button>
      {!loading ? <ul>
        {articles.map((article) => {
          return (
            <Link to={`/${article.topic}/${article.article_id}`} key={article.article_id}>
              <li>
                <p>{article.topic}</p>
                <p>{article.author}</p>
                <h3>{article.title}</h3>
                <p>Votes: {article.votes}</p>
                <p>Comments: {article.comment_count}</p>
              </li>
            </Link>
          );
        })}
      </ul> : <p>Loading...</p>}
    </div>
  );
};

export default Articles;
