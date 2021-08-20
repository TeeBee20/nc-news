import "./App.css";
import { useState } from "react";
import { Switch, Route } from "react-router";
import Header from "./components/home/Header";
import Nav from "./components/home/Nav";
import Main from "./components/home/MainArticle";
import Articles from "./components/home/Articles";
import MainImg from "./components/ind-article/MainImg";
import ArticleBody from "./components/ind-article/ArticleBody";
import Votes from "./components/ind-article/Votes";
import Comments from "./components/comments/Comments";
import SubmitComment from "./components/comments/SubmitComment";
import { UserContext, users } from "./components/contexts/User";
import { ExpandProvider } from "./components/contexts/Expand";

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

            {/* <Main />
            check if main is still a component */}
            <Articles />
          </Route>
        </Switch>
      </div>
    </UserContext.Provider>
  );
}

export default App;
