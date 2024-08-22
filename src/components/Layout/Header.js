import logo from "../../assets/images/img_logo.png";
import { NavLink } from "react-router-dom";
import "./header.css";

const Header = ({ hideCreateButton = true }) => {
  return (
    <header className="header__container">
      <div className="header__content">
        <NavLink to="/" className="header__logo-link">
          <img src={logo} alt="logo" className="header__logo" />
        </NavLink>
        {!hideCreateButton && (
          <NavLink to="/create" className="header__btn-link">
            <div className="header__btn">스터디 만들기</div>
          </NavLink>
        )}
      </div>
    </header>
  );
};

export default Header;
