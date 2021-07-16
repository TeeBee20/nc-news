import { useState } from "react";


const useComment = (id, username) => {
  const [commentBody, setCommentBody] = useState("");
  const [postSubmit, setPostSubmit] = useState(false);

  return { commentBody, setCommentBody, postSubmit, setPostSubmit };
};

export default useComment;
