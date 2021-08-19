import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/User";

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => {
    setUser("no user");
    if (user === "no user") {
      setUser("cooljmessy");
    }
    setLoggedIn((currLoggedIn) => {
      return !loggedIn;
    });
  };

  return (
    <div className="Header">
      <button onClick={logIn}>{loggedIn ? user : "Login"}</button>
      <Link to="/">
        <h1>NC NEWS</h1>
      </Link>
    </div>
  );
};

export default Header;
