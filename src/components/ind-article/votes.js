import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { ExpandContext } from "../misc/Expand";
import { patchVotes } from "../utils";

const Votes = () => {
  const { article_id } = useParams();
  const [votes, setVotes] = useState(0);
  const [voteDirection, setVoteDirection] = useState();
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
  }, [voteDirection]);

  return (
    <div className="votes">
      <h6>
        Votes: {article.votes}
        <button
          onClick={() => {
            setVotes(1);
            setVoteDirection("up");
          }}
        >
          Upvote
        </button>
        <button
          onClick={() => {
            setVotes(-1);
            setVoteDirection("down");
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
