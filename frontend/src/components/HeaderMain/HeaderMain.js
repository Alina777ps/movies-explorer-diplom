import React from "react";
import { Link } from "react-router-dom";
import "./HeaderMain.css";

import Header from "../Header/Header.js";

function HeaderMain() {
  return (
    <Header>
      <nav className="header__nav">
        <Link className="header__signup" to="/signup">
          Регистрация
        </Link>
        <Link className="header__signin" to="/signin">
          Войти
        </Link>
      </nav>
    </Header>
  );
}

export default HeaderMain;
