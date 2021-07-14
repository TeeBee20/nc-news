import {
  fetchAllArticles,
  fetchArticlesByTopic,
  sortArticlesByQuery,
} from "../utils";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  // const [query, setQuery] = useState("");
  const { topic_slug } = useParams();

  useEffect(() => {
    if (topic_slug) {
      fetchArticlesByTopic(topic_slug).then((articles) => {
        setArticles(articles);
      });
    } else {
      fetchAllArticles().then((articles) => {
        setArticles(articles);
      });
    }
  }, [topic_slug]);

  return (
    <div className="Articles">
      <h3>Sort By:</h3>
      <ul>
        <Link to={`${topic_slug}/sort_by=created_at`}>
          <li>Date</li>
        </Link>
        <li>
          <button>Comments</button>
        </li>
        <li>
          <button>Votes</button>
        </li>
      </ul>
      <ul>
        {articles.map((article) => {
          return (
            <Link to={`/${article.topic}/${article.article_id}`}>
              <li key={article.article_id}>
                <p>{article.topic}</p>
                <p>{article.author}</p>
                <h3>{article.title}</h3>
                <p>Votes: {article.votes}</p>
                <p>Comments: {article.comment_count}</p>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default Articles;
