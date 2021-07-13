import "./App.css";
import { Switch, Route } from "react-router";
import Header from "./components/home/header";
import Nav from "./components/home/nav";
import Main from "./components/home/main-article";
import Articles from "./components/home/articles";
import MainImg from "./components/ind-article/main-img";
import ArticleBody from "./components/ind-article/article-body";
import Votes from "./components/ind-article/votes";
import Comments from "./components/comments/comments";
import { ExpandContext, ExpandProvider } from "./components/misc/Expand";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/:topic_slug/:article_id">
          <Header />
          <Nav />
          <MainImg />
          <ExpandProvider>
            <ArticleBody />
            <Votes />
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
  );
}

export default App;
