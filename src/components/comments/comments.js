import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { ExpandContext } from "../misc/Expand";
import { fetchCommentsByArticleId } from "../utils";

const Comments = () => {
  const [comments, setComments] = useState([]);
  const { article, commentsClicked } = useContext(ExpandContext);
  const { article_id } = useParams();

  useEffect(() => {
    fetchCommentsByArticleId(article_id).then((comments) => {
      setComments(comments);
    });
  }, [article_id]);

  return (
    <div className="Comments">
      {commentsClicked ? (
        <ul>
          {comments.map((comment) => {
            return (
              <li key={comment.comment_id}>
                <p>{comment.author}</p>
                <p>{comment.created_at}</p>
                <p>{comment.body}</p>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
};

export default Comments;
