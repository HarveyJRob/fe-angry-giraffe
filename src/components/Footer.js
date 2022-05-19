// React Imports
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer>
      <Link to="/">
        <i className="fa-solid fa-house"></i>
      </Link>
      <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/rob-harvey-66740b39/">
        <i className="fa-brands fa-linkedin"></i>
      </a>
      <a target="_blank" rel="noreferrer" href="https://github.com/HarveyJRob">
        <i className="fa-brands fa-github"></i>
      </a>
    </footer>
  );
}

export default Footer;
