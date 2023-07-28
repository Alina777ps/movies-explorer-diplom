import React from "react";
import { Link } from "react-router-dom";
import "./HeaderMovies.css";

import account from "../../images/account.svg";
import hamburgerButton from "../../images/hamburgerButton.svg";

import Header from "../Header/Header.js";
import Navigation from "../Navigation/Navigation.js";

function HeaderMovies({
  moviesActive,
  savedMoviesActive,
  navigationMovies,
  navigationSavedMovies,
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
    <Header headerType="headerMovies__tipe_movies">
      <nav className="headerMovies__link">
        <Link className={`headerMovies__movies ${moviesActive}`} to="/movies">
          Фильмы
        </Link>
        <Link
          className={`headerMovies__movies ${savedMoviesActive}`}
          to="/saved-movies"
        >
          Сохранённые фильмы
        </Link>
      </nav>
      <nav className="headerMovies__profile-link">
        <Link className="headerMovies__account" to="/profile">
          <p className="headerMovies__account-name">Аккаунт</p>
          <div className="headerMovies__account-img-frame">
            <img
              className="headerMovies__account-img"
              src={account}
              alt="Аккаунт"
            />
          </div>
        </Link>
      </nav>
      <button
        className="headerMovies__hamburgerButton"
        type="button"
        onClick={openMenu}
      >
        <img
          className="headerMovies__hamburgerButton-img"
          src={hamburgerButton}
          alt="Открыть меню"
        />
      </button>
      {isMenuOpen ? (
        <Navigation
          closeMenu={closeMenu}
          navigationMovies={navigationMovies}
          navigationSavedMovies={navigationSavedMovies}
        />
      ) : (
        ""
      )}
    </Header>
  );
}

export default HeaderMovies;
