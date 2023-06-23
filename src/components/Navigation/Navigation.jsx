import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import CurrentUserContext from "../../context/CurrentUserContext";
import "./Navigation.css";

export default function Navigation() {
  const [activeMenu, setActiveMenu] = useState(false);

  const currentUser = useContext(CurrentUserContext);

  function handleClickMenu() {
    setActiveMenu(!activeMenu);
  }

  return (
    <nav className="navigation">
      {currentUser['_id'] ?
        <>
          <div className={`navigation__main ${activeMenu ? 'navigation__main_show' : ''} `}>
            <div className="navigation__block navigation__block_type_menu">
              <NavLink exact to='/' className='navigation__link navigation__link_place_main navigation__link_place_slider' activeClassName="navigation__link_active">Главная</NavLink>
              <NavLink to='/movies' className='navigation__link navigation__link_place_main' activeClassName="navigation__link_active">Фильмы</NavLink>
              <NavLink to='/saved-movies' className='navigation__link navigation__link_place_main' activeClassName="navigation__link_active">Сохранённые фильмы</NavLink>
            </div>
            <div className="navigation__block navigation__block_type_account">
              <Link to='/profile' className='navigation__link navigation__link_place_account'>Аккаунт</Link>
              <span className="navigation__account-icon" />
            </div>
          </div>
          <button className="navigation__menu-btn" type="button" onClick={handleClickMenu}>
            <span className={`navigation__menu-icon ${activeMenu ? 'navigation__menu-icon_active' : ''}`}></span>
          </button>
        </>
        :
        <div className="navigation__auth">
          <div className="navigation__block navigation__block_type_auth">
            <Link to='/signup' className='navigation__link navigation__link_place_auth'>Регистрация</Link>
            <Link to='/signin' className='navigation__link navigation__link_place_auth navigation__link_btn_green'>Войти</Link>
          </div>
        </div>
      }
    </nav>
  );
};
