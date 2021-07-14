import "./App.css";
import { useState } from "react";
import { Switch, Route } from "react-router";
import Header from "./components/home/header";
import Nav from "./components/home/nav";
import Main from "./components/home/main-article";
import Articles from "./components/home/articles";
import MainImg from "./components/ind-article/main-img";
import ArticleBody from "./components/ind-article/article-body";
import Votes from "./components/ind-article/votes";
import Comments from "./components/comments/comments";
import SubmitComment from "./components/comments/submit-comment";
import { UserContext, users } from "./components/misc/user";
import { ExpandContext, ExpandProvider } from "./components/misc/Expand";

function App() {
  const [user, setUser] = useState("no user");

  return (
    <UserContext.Provider value={{ user, setUser, users }}>
      <div className="App">
        <Switch>
          <Route exact path="/:topic_slug/:article_id">
            <Header />
            <Nav />
            <MainImg />
            <ExpandProvider>
              <ArticleBody />
              <Votes />
              <SubmitComment />
              <Comments />
            </ExpandProvider>
          </Route>
          <Route exact path="/:topic_slug">
            <Header />
            <Nav />
            <Articles />
          </Route>
          <Route exact path="/">
            <Header />
            <Nav />
            <Main />
            <Articles />
          </Route>
        </Switch>
      </div>
    </UserContext.Provider>
  );
}

export default App;
