import React from "react";
import { useLocation } from "react-router-dom";
import "./SearchForm.css";

import FilterCheckbox from "../FilterCheckbox/FilterCheckbox.js";

import searchFormImg from "../../images/searchFormImg.svg";
import searchFormButton from "../../images/searchFormButton.svg";

function SearchForm({ handleFilterMovies, isShortMovie, searchMovie }) {

  const location = useLocation();

  const [isRequest, setIsRequest] = React.useState("");
  const [isRequestError, setIsRequestError] = React.useState(false);

  function handleChange(e) {
    setIsRequest(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (isRequest.trim().length === 0) {
      setIsRequestError(true)
    } else {
      setIsRequestError(false)
      searchMovie(isRequest)
    }
  }

  React.useEffect(() => {
    if (
      location.pathname === "/movies" &&
      localStorage.getItem("searchMovies")
    ) {
      const savedMovies = localStorage.getItem("searchMovies")
      setIsRequest(savedMovies)
    }
  }, [location])

  return (
    <div className="searchForm">
     
      <form className="searchForm__form" onSubmit={handleSubmit} noValidate>
        <div className="searchForm__block">
          <img className="searchForm__img" src={searchFormImg} alt="Лупа" />
          <input
            className={`searchForm__input-string ${isRequestError ? "searchForm__input-error" : ""}`}
            type="text"
            name="movie"
            id="movie"
            placeholder={isRequestError ? "Нужно ввести ключевое слово" : "Фильм"}
            value={isRequest || ""} 
            onChange={handleChange}
            required
          ></input>
        </div>
        <button className="searchForm__button" type="submit" aria-label="Поиск">
          <img
            className="searchForm__button-img"
            src={searchFormButton}
            alt="Поиск"
          />
        </button>
      </form>
      <FilterCheckbox 
        handleFilterMovies={handleFilterMovies}
        isShortMovie={isShortMovie}
      />
    </div>
  );
}

export default SearchForm;
