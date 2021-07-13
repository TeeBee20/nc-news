import { fetchArticlesById } from "../utils";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Votes from "./votes";

const ArticleBody = () => {
  const [article, setArticle] = useState({});
  const { article_id } = useParams();

  useEffect(() => {
    fetchArticlesById(article_id).then((article) => {
      setArticle(article[0]);
    });
  }, [article_id]);

  return (
    <div className="article-body">
      <p>{article.topic}</p>
      <h2>{article.title}</h2>
      <h5>{article.author}</h5>
      <p>{article.created_at}</p>
      <p>{article.body}</p>
      <Votes votes={article.votes} comments={article.comment_count} />
    </div>
  );
};

export default ArticleBody;
