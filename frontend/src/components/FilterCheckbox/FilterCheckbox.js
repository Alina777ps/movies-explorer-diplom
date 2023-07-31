import React from "react";
import "./FilterCheckbox.css";

function FilterCheckbox({ handleFilterMovies, isShortMovie }) {
  return (
    <form className="filterCheckbox__form-checkbox">
      <label className="filterCheckbox__checkbox-label">
        <input 
          className="filterCheckbox__checkbox-input" 
          type="checkbox" 
          onChange={handleFilterMovies}
          checked={isShortMovie}>
        </input>
        <span className="filterCheckbox__checkbox-span"></span>
        <span className="filterCheckbox__span-text">Короткометражки</span>
      </label>
    </form>
  );
}

export default FilterCheckbox;
