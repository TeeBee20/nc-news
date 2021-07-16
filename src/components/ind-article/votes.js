import { useContext, useState } from "react";
import { useParams } from "react-router";
import { ExpandContext } from "../misc/Expand";
import { patchVotes } from "../utils";

const Votes = () => {
  const { article_id } = useParams();
  const [voteMade, setVoteMade] = useState(false);
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
    patchVotes(article_id, votes).then((article) => {
      setArticle(article[0]);
    });
  };

  return (
    <div className="votes">
      <h6>
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
