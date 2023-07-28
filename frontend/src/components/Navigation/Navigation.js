import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

import buttonClose from "../../images/buttonClose.svg";
import account from "../../images/account.svg";

function Navigation({ closeMenu, navigationMovies, navigationSavedMovies }) {

  // обработчик оверлея
  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      closeMenu();
    }
  };

  return (
    <div className="navigation">
      <div className="navigation__container-overlay" onClick={handleOverlay}></div>
      <div className="navigation__contaner">
        <button className="navigation__button-close" onClick={closeMenu}>
          <img
            className="navigation__button-close-img"
            src={buttonClose}
            alt="Закрыть"
          />
        </button>
        <nav className="navigation__nav">
          <Link className="navigation__link" to="/">
            Главная
          </Link>
          <Link className={`navigation__link ${navigationMovies}`} to="/movies">
            Фильмы
          </Link>
          <Link
            className={`navigation__link ${navigationSavedMovies}`}
            to="/saved-movies"
          >
            Сохранённые фильмы
          </Link>
        </nav>
        <Link className="navigation__account" to="/profile">
          <a className="navigation__account-name">Аккаунт</a>
          <div className="navigation__account-img-frame">
            <img
              className="navigation__account-img"
              src={account}
              alt="Аккаунт"
            />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Navigation;
