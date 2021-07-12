import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="Header">
      <Link to="/">
        <h1>NC NEWS</h1>
      </Link>
    </div>
  );
};

export default Header;
