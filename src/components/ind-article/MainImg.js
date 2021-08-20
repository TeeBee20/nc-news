import { articleImages } from "../utils";
import { useParams } from "react-router";

const MainImg = () => {
  const { topic_slug } = useParams();

  return (
    <div className="main-img">
      <img src={articleImages[topic_slug].src} alt={topic_slug} />
      <p>{articleImages[topic_slug].description}</p>
    </div>
  );
};

export default MainImg;
