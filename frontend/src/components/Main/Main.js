import React from "react";
import "./Main.css";

import Header from "../Header/Header.js";
import Promo from "../Promo/Promo.js";
import AboutProject from "../AboutProject/AboutProject.js";
import Techs from "../Techs/Techs.js";
import AboutMe from "../AboutMe/AboutMe.js";
import Footer from "../Footer/Footer.js";

function Main({ loggedIn }) {
  return (
    <>
      <Header 
        loggedIn={loggedIn} 
        headerMain="main__color-blue" 
        navigationMain="main__burger-menu_active"
        hamburgerButtonImg="main__color-blue"
       />
      <main>
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
      </main>
      <Footer />
    </>
  );
}

export default Main;
