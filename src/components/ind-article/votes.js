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
        setArticle(article);
      })
      .catch((err) => {
        if (err) {
          setHasError(true);
        }
      });
  };

  return (
    <div className="votes">
      {hasError && <p>Oops! Could not change votes.</p>}
      <div className="vote-buttons">
        <button type="button" disabled={voteMade} value="1" onClick={addVote}>
          ⬆︎
        </button>
        <p>{article.votes}</p>
        <button type="button" disabled={!voteMade} value="-1" onClick={addVote}>
          ⬇︎
        </button>
      </div>
      <div className="comments-button">
        <button onClick={toggleClick}>
          {commentsClicked ? "Hide " : "Show "}
          <span>{article.comment_count}</span> comments
        </button>
      </div>
    </div>
  );
};

export default Votes;
