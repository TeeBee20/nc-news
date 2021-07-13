import { useContext } from "react";
import { ExpandContext } from "../misc/Expand";

const Votes = () => {
  const { article, commentsClicked, setCommentsClicked } =
    useContext(ExpandContext);

  const toggleClick = () => {
    setCommentsClicked((currClick) => {
      return !currClick;
    });
  };

  return (
    <div className="votes">
      <h6>{article.votes} votes</h6>
      <button onClick={toggleClick}>
        {commentsClicked ? "Hide " : "Show "}
        {article.comment_count} comments
      </button>
    </div>
  );
};

export default Votes;
