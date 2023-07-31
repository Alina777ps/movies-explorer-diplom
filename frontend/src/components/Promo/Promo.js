import React from "react";
import "./Promo.css";
import { Link } from "react-scroll";

import PlanetSign from "../../images/planetSign.svg";

function Promo() {
  return (
    <section className="promo">
      <img className="promo__img" src={PlanetSign} alt="Знак планеты" />
      <h1 className="promo__title">
        Учебный проект студента факультета Веб&#8209;разработки.
      </h1>
      <p className="promo__text">
        Листайте ниже, чтобы узнать больше про этот проект и его создателя.
      </p>
      <div className="promo__frame-link">
        <Link
          to="aboutProject"
          className="promo__link"
          smooth={true}
          duration={500}
        >
          Узнать больше
        </Link>
      </div>
    </section>
  );
}

export default Promo;
