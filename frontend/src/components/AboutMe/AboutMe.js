import React from "react";
import "./AboutMe.css";

import AboutMePhoto from "../../images/AboutMePhoto.png";

import Section from "../Section/Section.js";
import Portfolio from "../Portfolio/Portfolio.js";

function AboutMe() {
  return (
    <Section 
      sectionType="aboutMe" 
      sectionTitle="Студент">
      <img className="aboutMe__photo" src={AboutMePhoto} alt="Фото" />
      <h3 className="aboutMe__name">Алина</h3>
      <h4 className="aboutMe__job">Фронтенд-разработчик, 35 лет</h4>
      <p className="aboutMe__adout">
        Я родилась и живу в городе Пскове, закончила факультет ПГУ "финансы и
        кредит" на базе среднего-профессиональносго образования и два факультета
        ПГУ на базе высшего образования: менеджмент организации и юриспруденция.
        У меня есть муж и две дочери. Находясь в декретном отпуске решила
        обучиться вер-разработке.
      </p>
      <a
        className="aboutMe__link-Github"
        href="https://github.com/Alina777ps"
        target="_blank"
      >
        Github
      </a>
      <Portfolio />
    </Section>
  );
}

export default AboutMe;
