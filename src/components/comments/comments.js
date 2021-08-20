import { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { ExpandContext } from "../contexts/Expand";
import { fetchCommentsByArticleId } from "../utils";
import { DateTime } from "luxon";
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
      {commentsClicked && (
        <ul>
          {comments.map((comment) => {
            const timeObj = DateTime.fromISO(comment.created_at)
              .diffNow(["months", "years"])
              .toObject();
            const years = Math.floor(Math.abs(timeObj.years));
            const months = Math.floor(Math.abs(timeObj.months));

            return (
              <li key={comment.comment_id}>
                <div className="comment-info">
                  <p>
                    <span className="bold">{comment.author}</span> ~
                  </p>
                  {years > 0 ? (
                    <p>
                      {years} {years > 1 ? "years ago" : "year ago"}
                    </p>
                  ) : (
                    <p>
                      {months} {months > 1 ? "months ago" : "month ago"}
                    </p>
                  )}
                </div>
                <p>{comment.body}</p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Comments;
