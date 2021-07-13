import { useState } from "react";
import { createContext } from "react";

export const ExpandContext = createContext();

export const ExpandProvider = ({ children }) => {
  const [article, setArticle] = useState({});

  return (
    <ExpandContext.Provider value={{ article, setArticle }}>
      {children}
    </ExpandContext.Provider>
  );
};
