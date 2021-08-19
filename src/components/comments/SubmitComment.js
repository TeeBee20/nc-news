import { useContext } from "react";
import { ExpandContext } from "../contexts/Expand";
import { UserContext } from "../contexts/User";
import useComment from "../../hooks/useComment";
import { postCommentByArticleId } from "../utils";
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
            return [comment[0], ...currComments];
          });
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
        <form onSubmit={handleSubmit}>
          <input
            onChange={(event) => setCommentBody(event.target.value)}
            id="comment"
            placeholder="Add Comment Here"
            value={commentBody}
          ></input>
          {user !== "no user" ? (
            <button>Submit</button>
          ) : (
            <p>You need to login before you can comment.</p>
          )}
        </form>
      )}
    </div>
  );
};

export default SubmitComment;
