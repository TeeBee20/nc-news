import { useContext } from "react";
import { ExpandContext } from "../contexts/Expand";
import { UserContext } from "../contexts/User";
import useComment from "../../hooks/useComment";
import { postCommentByArticleId, sortByTime } from "../utils";
import { useParams } from "react-router";
import useError from "../../hooks/useError";

const SubmitComment = () => {
  const { user } = useContext(UserContext);
  const { commentsClicked, setComments } = useContext(ExpandContext);
  const { commentBody, setCommentBody } = useComment();
  const { hasError, setHasError } = useError();
  const { article_id } = useParams();

  const handleSubmit = (event) => {
    event.preventDefault();
    const comment = {
      username: user,
      body: commentBody,
    };

    if (commentBody.length === 0) {
      setHasError(true);
    } else {
      postCommentByArticleId(article_id, comment)
        .then((comment) => {
          setHasError(false);
          setComments((currComments) => {
            return sortByTime([...currComments, comment]);
          });
          setCommentBody("");
        })
        .catch((err) => {
          setHasError(true);
        });
    }
  };

  return (
    <div>
      {hasError && <p>Oops! Couldn't submit comment.</p>}
      {commentsClicked && (
        <div className="submit-comment">
          <form onSubmit={handleSubmit}>
            {user === "no user" && (
              <p>
                <span className="bold">Please login in order to comment.</span>
              </p>
            )}
            <input
              onChange={(event) => setCommentBody(event.target.value)}
              id="comment"
              placeholder="Add Comment Here"
              value={commentBody}
            ></input>
            <button>Post</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SubmitComment;
