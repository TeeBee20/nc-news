import { useState } from "react";
import { createContext } from "react";

export const ExpandContext = createContext();

export const ExpandProvider = ({ children }) => {
  const [article, setArticle] = useState({});
  const [commentsClicked, setCommentsClicked] = useState(false);

  return (
    <ExpandContext.Provider
      value={{ article, setArticle, commentsClicked, setCommentsClicked }}
    >
      {children}
    </ExpandContext.Provider>
  );
};
