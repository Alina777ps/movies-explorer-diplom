import React from "react";
import Logo from "../Logo/Logo.js";
import "./Header.css";

function Header({ headerType, children }) {
  return (
    <header className={`header ${headerType}`}>
      <Logo />
      {children}
    </header>
  );
}

export default Header;
