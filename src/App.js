import "./App.css";
import { Switch, Route } from "react-router";
import Header from "./components/home/header";
import Nav from "./components/home/nav";
import Main from "./components/home/main-article";
import Articles from "./components/home/articles";
import MainImg from "./components/ind-article/main-img";
import ArticleBody from "./components/ind-article/article-body";
import Votes from "./components/ind-article/votes";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/:topic_slug/:article_id">
          <MainImg />
          <ArticleBody />
          <Votes />
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
