import logo from '../../assets/images/img_logo.png';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MOTION } from '../../constants/global';

import './header.css';

const Header = ({ hideCreateButton }) => {
  return (
    <header className="header__container">
      <div className="header__content">
        <NavLink to="/" className="header__logo-link">
          <img src={logo} alt="logo" className="header__logo" />
        </NavLink>
        {!hideCreateButton && (
          <NavLink to="/create" className="header__btn-link">
            <motion.div
              className="header__btn"
              initial={{ scale: 1 }}
              whileTap={{ scale: 1 }}
              whileHover={MOTION.whileHover}>
              스터디 만들기
            </motion.div>
          </NavLink>
        )}
      </div>
    </header>
  );
};

export default Header;
