import { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { ExpandContext } from "../contexts/Expand";
import { fetchCommentsByArticleId } from "../utils";
import useLoading from "../../hooks/useLoading";
import useError from "../../hooks/useError";

const Comments = () => {
  const { commentsClicked, comments, setComments } = useContext(ExpandContext);
  const { loading, setLoading } = useLoading();
  const { hasError, setHasError } = useError();
  const { article_id } = useParams();

  useEffect(() => {
    fetchCommentsByArticleId(article_id)
      .then((comments) => {
        setComments(comments);
        setLoading(false);
      })
      .catch((err) => {
        if (err) {
          setHasError(true);
        }
      });
  }, [article_id]);

  return (
    <div className="Comments">
      {loading && <p>Loading...</p>}
      {hasError && <p>Oops! Couldn't load article comments.</p>}
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
