import "./App.css";
import Header from "./components/home/header";
import Nav from "./components/home/nav";
import Main from "./components/home/main-article";
import Articles from "./components/home/articles";

function App() {
  return (
    <div className="App">
      <Header />
      <Nav />
      <Main />
      <Articles />
    </div>
  );
}

export default App;
