import {
  fetchAllArticles,
  fetchArticlesByTopic,
  sortArticlesByQuery,
  articleImages,
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

  return (
    <div className="Articles">
      <section className="sort">
        <button value="created_at" onClick={sort}>
          Date
        </button>
        <button value="comment_count" onClick={sort}>
          Comments
        </button>
        <button value="votes" onClick={sort}>
          Votes
        </button>
      </section>
      {!loading ? (
        <ul>
          {articles.map((article, i) => {
            return (
              <Link
                to={`/${article.topic}/${article.article_id}`}
                key={article.article_id}
              >
                <li className={i % 5 === 0 ? "big-art" : "small-art"}>
                  <img
                    src={articleImages[article.topic].src}
                    alt={articleImages[article.topic].description}
                  />
                  <div className="art-text">
                    <div className="art-info">
                      <p id="topic">{article.topic}</p>
                      <h3>{article.title}</h3>
                      <p id="author">Author: {article.author}</p>
                    </div>
                    <div className="art-votes-comm">
                      <p id="votes">??????{article.votes}</p>
                      <p id="comments">{article.comment_count} comments</p>
                    </div>
                  </div>
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
