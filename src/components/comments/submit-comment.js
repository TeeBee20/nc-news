// import { useContext, useEffect } from "react";
// import { ExpandContext } from "../misc/Expand";
// import { UserContext } from "../misc/user";
// import useComment from "../../hooks/useComment";
// import {
//   fetchArticlesById,
//   fetchCommentsByArticleId,
//   postCommentByArticleId,
// } from "../utils";
// import { useParams } from "react-router";

// const SubmitComment = () => {
//   const { user } = useContext(UserContext);
//   const { commentsClicked, setComments } = useContext(ExpandContext);
//   const { commentBody, setCommentBody, postSubmit, setPostSubmit } =
//     useComment();
//   const { article_id } = useParams();

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     setPostSubmit(false);
//     setComments((currComments) => {
//       return [comment[0], ...currComments];
//     });
//   };

//   useEffect(() => {
//     postCommentByArticleId(article_id, user, commentBody)
//       .then((comment) => {})
//       .catch((err) => {
//         console.log(err.response);
//       });
//   }, [postSubmit]);

//   return (
//     <div>
//       {commentsClicked && (
//         <form onSubmit={handleSubmit}>
//           <input
//             onChange={(event) => setCommentBody(event.target.value)}
//             id="comment"
//             placeholder="Add Comment Here"
//             value={commentBody}
//           ></input>
//           {user !== "no user" ? (
//             <button onClick={() => setPostSubmit(true)}>Submit</button>
//           ) : (
//             <p>You need to login before you can comment.</p>
//           )}
//         </form>
//       )}
//     </div>
//   );
// };

// export default SubmitComment;
