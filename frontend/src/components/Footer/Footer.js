import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <h2 className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h2>
      <div className="footer__line">
        <p className="header__data">© 2023</p>
        <ul className="header__list">
          <a
            className="header__list_item"
            href="https://practicum.yandex.ru/"
            target="_blank"
          >
            Яндекс.Практикум
          </a>
          <a
            className="header__list_item"
            href="https://github.com/"
            target="_blank"
          >
            Github
          </a>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
