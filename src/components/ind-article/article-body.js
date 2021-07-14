import { fetchArticlesById } from "../utils";
import { useEffect, useContext } from "react";
import { useParams } from "react-router";
import { ExpandContext } from "../misc/Expand";
import Votes from "./votes";

const ArticleBody = () => {
  const { article, setArticle } = useContext(ExpandContext);
  const { article_id } = useParams();

  useEffect(() => {
    fetchArticlesById(article_id).then((article) => {
      setArticle(article[0]);
    });
  }, [article_id, article]);

  return (
    <div className="article-body">
      <p>{article.topic}</p>
      <h2>{article.title}</h2>
      <h5>{article.author}</h5>
      <p>{article.created_at}</p>
      <p>{article.body}</p>
    </div>
  );
};

export default ArticleBody;
