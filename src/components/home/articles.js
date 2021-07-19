import {
  fetchAllArticles,
  fetchArticlesByTopic,
  sortArticlesByQuery,
  articleImage,
} from "../utils";
import useLoading from "../../hooks/useLoading";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useError from "../../hooks/useError";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const { loading, setLoading } = useLoading();
  const { hasError, setHasError } = useError();
  const { topic_slug } = useParams();

  useEffect(() => {
    if (topic_slug) {
      fetchArticlesByTopic(topic_slug)
        .then((articles) => {
          setHasError(false);
          setLoading(false);
          setArticles(articles);
        })
        .catch((err) => {
          if (err) {
            setHasError(true);
          }
        });
    } else {
      fetchAllArticles()
        .then((articles) => {
          setHasError(false);
          setLoading(false);
          setArticles(articles);
        })
        .catch((err) => {
          if (err) {
            setHasError(true);
          }
        });
    }
  }, [topic_slug]);

  const sort = (event) => {
    sortArticlesByQuery(event.target.value).then((articles) => {
      setArticles(articles);
    });
  };

  console.log(articleImage("coding"));

  return (
    <div className="Articles">
      <h3>Sort By:</h3>
      <button value="created_at" onClick={sort}>
        Date
      </button>
      <button value="comment_count" onClick={sort}>
        Comments
      </button>
      <button value="votes" onClick={sort}>
        Votes
      </button>
      {!loading ? (
        <ul>
          {articles.map((article) => {
            return (
              <Link
                to={`/${article.topic}/${article.article_id}`}
                key={article.article_id}
              >
                <li>
                  <p>{article.topic}</p>
                  <p>{article.author}</p>
                  {/* <img src={articleImage(topic_slug)} alt="image" /> */}
                  <h3>{article.title}</h3>
                  <p>Votes: {article.votes}</p>
                  <p>Comments: {article.comment_count}</p>
                </li>
              </Link>
            );
          })}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
      {hasError && <p>Oops! Couldn't load articles.</p>}
    </div>
  );
};

export default Articles;
