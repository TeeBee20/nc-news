import { useContext} from "react";
import { ExpandContext } from "../misc/Expand";
import { UserContext } from "../misc/user";
import useComment from "../../hooks/useComment";
import { postCommentByArticleId } from "../utils";
import { useParams } from "react-router";

const SubmitComment = () => {
  const { user } = useContext(UserContext);
  const { commentsClicked, setComments } = useContext(ExpandContext);
  const { commentBody, setCommentBody } =
    useComment();
  const { article_id } = useParams();

  const handleSubmit = (event) => {
    event.preventDefault();
    const comment = {
      username: user,
      body: commentBody,
    };
    postCommentByArticleId(article_id, comment)
      .then((comment) => {
        setComments((currComments) => {
          return [comment[0], ...currComments];
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <div>
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
