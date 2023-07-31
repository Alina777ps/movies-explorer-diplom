import React from "react";
import "./AboutProject.css";

import Section from "../Section/Section.js";

function AboutProject() {
  return (
    <div id="aboutProject">
      <Section className="aboutProject" sectionTitle="О проекте">
        <div className="aboutProject__gride">
          <h3 className="aboutProject__gride-title aboutProject__gride-title-1">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="aboutProject__gride-text aboutProject__gride-text-1">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
          <h3 className="aboutProject__gride-title aboutProject__gride-title-2">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="aboutProject__gride-text aboutProject__gride-text-2">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
        <div className="aboutProject__table">
          <p className="aboutProject__table-text aboutProject__table-text_grin">
            1 неделя
          </p>
          <p className="aboutProject__table-text">4 недели</p>
          <p className="aboutProject__table-text aboutProject__table-text_black">
            Back-end
          </p>
          <p className="aboutProject__table-text aboutProject__table-text_black">
            Front-end
          </p>
        </div>
      </Section>
    </div>
  );
}

export default AboutProject;
