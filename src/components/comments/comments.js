import { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { ExpandContext } from "../misc/Expand";
import { fetchCommentsByArticleId } from "../utils";
import useLoading from '../../hooks/useLoading';

const Comments = () => {
  const { commentsClicked, comments, setComments } =
    useContext(ExpandContext);
  const {loading, setLoading } = useLoading();
  const { article_id } = useParams();

  useEffect(() => {
    fetchCommentsByArticleId(article_id).then((comments) => {
      setComments(comments);
      setLoading(false);
    });
  }, [article_id]);

  return (
    <div className="Comments">
    {loading && <p>Loading...</p>}
      {commentsClicked ? (
        <ul>
          {comments.map((comment) => {
            return (
              <li key={comment.comment_id}>
              <p>{comment.author}</p>
              <p>{comment.created_at}</p>
              <p>{comment.body}</p>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
};

export default Comments;
