import { Link } from "react-router-dom";
import logoImage from "../../images/logo.svg";
import "./Logotype.css";

export default function Logotype() {
  return (
    <Link to='/'>
      <img src={logoImage} alt="Логотип" className="Logotype" />
    </Link>
  );
};
