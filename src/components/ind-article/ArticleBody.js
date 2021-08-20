import { fetchArticlesById } from "../utils";
import { useEffect, useContext } from "react";
import { useParams } from "react-router";
import { ExpandContext } from "../contexts/Expand";
import useLoading from "../../hooks/useLoading";
import useError from "../../hooks/useError";

const ArticleBody = () => {
  const { article, setArticle } = useContext(ExpandContext);
  const { loading, setLoading } = useLoading();
  const { hasError, setHasError } = useError();
  const { article_id } = useParams();
  const date = new Date(article.created_at);

  useEffect(() => {
    fetchArticlesById(article_id)
      .then((article) => {
        setHasError(false);
        setLoading(false);
        setArticle(article);
      })
      .catch((err) => {
        if (err) {
          setHasError(true);
        }
      });
  }, [article_id, article]);

  return (
    <div className="article-body">
      {loading && <p>Loading...</p>}
      {hasError && <p>Oops! Couldn't load this article.</p>}
      <h2>{article.title}</h2>
      <h5>{article.author}</h5>
      <p>{article.topic}</p>
      <p>{date.toUTCString()}</p>
      <p>{article.body}</p>
    </div>
  );
};

export default ArticleBody;
