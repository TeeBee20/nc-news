import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { ExpandContext } from "../misc/Expand";
import { patchVotes } from "../utils";

const Votes = () => {
  const { article_id } = useParams();
  const [votes, setVotes] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);
  const { article, setArticle, commentsClicked, setCommentsClicked } =
    useContext(ExpandContext);

  const toggleClick = () => {
    setCommentsClicked((currClick) => {
      return !currClick;
    });
  };

  useEffect(() => {
    patchVotes(article_id, votes).then((article) => {
      setArticle(article[0]);
    });
  }, [hasVoted]);

  return (
    <div className="votes">
      <h6>
        Votes: {article.votes}
        <button
          onClick={() => {
            setVotes(1);
            setHasVoted(true);
          }}
        >
          Upvote
        </button>
        <button
          onClick={() => {
            setVotes(-1);
            setHasVoted(true);
          }}
        >
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
