// React Imports
import { Link } from "react-router-dom";

// Images
import AngryGiraffe from "../static/images/angryGiraffe_500_yellow.jpeg";

function Header() {
  return (
    <header>
      <Link to="/">
        <img className="logo" src={AngryGiraffe} alt="Angry Giraffe Logo Yellow" />
      </Link>

      <nav className="dropdown">
        <button className="dropdown-btn">
          <i className="fa-solid fa-bars"></i>
        </button>
        <div className="dropdown-content">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/portfolio">Portfolio</Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
