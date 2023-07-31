import React from "react";
import "./Techs.css";

import Section from "../Section/Section.js";

function Techs() {
  return (
    <Section
      sectionType="techs"
      sectionLineType="techs__line"
      sectionTitle="Технологии"
    >
      <h3 className="techs__subtitle">7 технологий</h3>
      <p className="techs__text">
        На курсе веб-разработки мы освоили технологии, которые применили в
        дипломном проекте.
      </p>
      <div className="techs__list">
        <div className="techs__list_element">HTML</div>
        <div className="techs__list_element">CSS</div>
        <div className="techs__list_element">JS</div>
        <div className="techs__list_element">React</div>
        <div className="techs__list_element">Git</div>
        <div className="techs__list_element">Express.js</div>
        <div className="techs__list_element">mongoDB</div>
      </div>
    </Section>
  );
}

export default Techs;
