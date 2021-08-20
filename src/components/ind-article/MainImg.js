import { articleImages } from "../utils";
import { useParams } from "react-router";

const MainImg = () => {
  const { topic_slug } = useParams();

  return (
    <div className="main-img">
      <img src={articleImages[topic_slug]} alt={topic_slug} />
      <h5>Article Description</h5>
    </div>
  );
};

export default MainImg;
