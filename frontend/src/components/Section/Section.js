import React from "react";
import "./Section.css";

const Section = ({ sectionType, sectionLineType, sectionTitle, children }) => {
  return (
    <section className={`section ${sectionType}`}>
      <div className={`section__line ${sectionLineType}`}>
        <h2 className="section__title">{sectionTitle}</h2>
      </div>
      {children}
    </section>
  );
};

export default Section;
