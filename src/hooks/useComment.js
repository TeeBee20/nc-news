import { useState, useEffect } from "react";
import { postCommentByArticleId } from "../components/utils";

const useComment = (id, username) => {
  const [commentBody, setCommentBody] = useState("");
  const [postSubmit, setPostSubmit] = useState(false);

  return { commentBody, setCommentBody, postSubmit, setPostSubmit };
};

export default useComment;
