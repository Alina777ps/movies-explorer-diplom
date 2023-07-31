import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo.js";
import "./Header.css";

import account from "../../images/account.svg";
import hamburgerButton from "../../images/hamburgerButton.svg";

import Navigation from "../Navigation/Navigation.js";

function Header({
  loggedIn, 
  navigationMovies,
  navigationSavedMovies,
  navigationMain,
  headerMain,
  activeMovies,
  activeSavedMovies,
  hamburgerButtonImg
 }) {

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  function openMenu() {
    setIsMenuOpen(true);
  }

  function closeMenu() {
    setIsMenuOpen(false);
  }

  React.useEffect(() => {
    if (!isMenuOpen) return;
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        closeMenu();
      }
    };

    document.addEventListener("keydown", closeByEscape);
    return () => document.removeEventListener("keydown", closeByEscape);
  }, [isMenuOpen, closeMenu]);

  return (
    <>
      {loggedIn ? (
        <header className={`header header__loggedIn ${headerMain}`}>
          <Logo />
            <nav className="header__link">
              <Link className={`header__movies ${activeMovies}`} to="/movies">
                Фильмы
              </Link>
              <Link
                className={`header__movies ${activeSavedMovies}`}
                to="/saved-movies"
              >
                Сохранённые фильмы
              </Link>
            </nav>
            <nav className="header__profile-link">
              <Link className="header__account" to="/profile">
                <p className="header__account-name">Аккаунт</p>
                <div className="header__account-img-frame">
                  <img
                    className="header__account-img"
                    src={account}
                    alt="Аккаунт"
                  />
                </div>
              </Link>
            </nav>
            <button
              className={`header__hamburgerButton ${hamburgerButtonImg}`}
              type="button"
              onClick={openMenu}
            >
              <img
                className="header__hamburgerButton-img"
                src={hamburgerButton}
                alt="Открыть меню"
              />
            </button>
            {isMenuOpen ? (
              <Navigation
                closeMenu={closeMenu}
                navigationMovies={navigationMovies}
                navigationSavedMovies={navigationSavedMovies}
                navigationMain={navigationMain}
              />
            ) : (
            ""
            )}
        </header>
      ) : (
        <header className={`header ${headerMain}`}>
          <Logo />
        <nav className="header__nav">
          <Link className="header__signup" to="/signup">
            Регистрация
          </Link>
          <Link className="header__signin" to="/signin">
            Войти
          </Link>
        </nav>
        </header>
      )

      }
      </>
    
  );
}

export default Header;
