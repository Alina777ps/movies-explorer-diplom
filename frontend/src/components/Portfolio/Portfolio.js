import React from "react";
import "./Portfolio.css";

import PortfolioArrow from "../../images/PortfolioArrow.svg";

function Portfolio() {
  return (
    <div className="portfolio__list-line">
      <h4 className="portfolio__subtitle">Портфолио</h4>
      <div className="portfolio__line">
        <a className="portfolio__link" href="#" target="_blank">
          Статичный сайт
          <img
            className="portfolio__arrow"
            src={PortfolioArrow}
            alt="Стрелка"
          />
        </a>
      </div>
      <div className="portfolio__line">
        <a className="portfolio__link" href="#" target="_blank">
          Адаптивный сайт
          <img
            className="portfolio__arrow"
            src={PortfolioArrow}
            alt="Стрелка"
          />
        </a>
      </div>
      <div className="portfolio__line">
        <a className="portfolio__link" href="#" target="_blank">
          Одностраничное приложение
          <img
            className="portfolio__arrow"
            src={PortfolioArrow}
            alt="Стрелка"
          />
        </a>
      </div>
    </div>
  );
}

export default Portfolio;
