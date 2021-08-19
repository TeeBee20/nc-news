import { useContext, useState } from "react";
import { useParams } from "react-router";
import { ExpandContext } from "../contexts/Expand";
import { patchVotes } from "../utils";
import useError from "../../hooks/useError";

const Votes = () => {
  const { article_id } = useParams();
  const [voteMade, setVoteMade] = useState(false);
  const { hasError, setHasError } = useError();
  const { article, setArticle, commentsClicked, setCommentsClicked } =
    useContext(ExpandContext);

  const toggleClick = () => {
    setCommentsClicked((currClick) => {
      return !currClick;
    });
  };

  const addVote = (event) => {
    setVoteMade((currVoteMade) => {
      return !currVoteMade;
    });
    const votes = Number(event.target.value);
    patchVotes(article_id, votes)
      .then((article) => {
        setHasError(false);
        setArticle(article[0]);
      })
      .catch((err) => {
        if (err) {
          setHasError(true);
        }
      });
  };

  return (
    <div className="votes">
      <h6>
        {hasError && <p>Oops! Could not change votes.</p>}
        Votes: {article.votes}
        <button disabled={voteMade} value="1" onClick={addVote}>
          Upvote
        </button>
        <button disabled={!voteMade} value="-1" onClick={addVote}>
          Downvote
        </button>
      </h6>
      <button onClick={toggleClick}>
        {commentsClicked ? "Hide " : "Show "}
        {article.comment_count} comments
      </button>
    </div>
  );
};

export default Votes;
