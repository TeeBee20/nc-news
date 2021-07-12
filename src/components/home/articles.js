import { fetchAllArticles } from "../utils";
import { useEffect, useState } from "react";

const Articles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchAllArticles().then((articles) => {
      setArticles(articles);
    });
  }, []);

  console.log(articles[0]);

  return (
    <div className="Articles">
      <ul>
        {articles.map((article) => {
          return (
            <li key={article.article_id}>
              <p>{article.topic}</p>
              <p>{article.author}</p>
              <h3>{article.title}</h3>
              <p>Votes: {article.votes}</p>
              <p>Comments: {article.comment_count}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Articles;
