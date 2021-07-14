import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../misc/user";

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => {
    setUser("no user");
    if (user === "no user") {
      setUser("weegembump");
    }
    setLoggedIn((currLoggedIn) => {
      return !loggedIn;
    });
  };

  console.log(user, loggedIn);

  return (
    <div className="Header">
      <Link to="/">
        <h1>NC NEWS</h1>
      </Link>
      <button onClick={logIn}>{loggedIn ? user : "Login"}</button>
    </div>
  );
};

export default Header;
