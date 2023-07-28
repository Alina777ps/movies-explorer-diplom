import React from "react";
import "./Movies.css";

import * as MoviesApi from "../../utils/MoviesApi";
import { filterShotMovies, filterMovies } from "../../utils/utils";

/*import like from "../../images/like.svg";*/
//import dislike from '../../images/dislike.svg';

import HeaderMovies from "../HeaderMovies/HeaderMovies.js";
import SearchForm from "../SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";
import Footer from "../Footer/Footer.js";

function Movies({ savedMovies, onDeleteMovie, onAddMovie }) {
  // savedMovies: Массив сохраненных фильмов
  // onClickButton: Функция для добавления или удаления сохраненного фильма

  // Состояния компонента
  const [isLoading, setIsLoading] = React.useState(false)
  const [isRequestError, setIsRequestError] = React.useState(false) // ответ: ошибка запроса
  const [isNotFoundMovie, setIsNotFoundMovie] = React.useState(false) // ответ: фильм не найден
  const [isSearchResultMovie, setIsSearchResultMovie] = React.useState([]) // массив фильмов
  const [filteredMovies, setFilteredMovies] = React.useState([]) // отфильтрованные фильмы
  const [isShortMovie, setIsShortMovie] = React.useState(false) // короткометражные фильмы

  // установка фильтра по продолжительности фильмов при поиске
  function installingShortMovieSearch(movies, query, short) {
    const moviesCardList = filterMovies(movies, query, short)
    setIsSearchResultMovie(moviesCardList)
    setFilteredMovies(short ? filterShotMovies(moviesCardList) : moviesCardList)
    localStorage.setItem("movies", JSON.stringify(moviesCardList))
    localStorage.setItem("allMovies", JSON.stringify(movies))
  }

  // установка фильтра короткометражных фильмов
  function installingShortMovieFilter() {
    setIsShortMovie(!isShortMovie)
    if (!isShortMovie) {
      if (filterShotMovies(isSearchResultMovie).length === 0) {
        setFilteredMovies(filterShotMovies(isSearchResultMovie))
      } else {
        setFilteredMovies(filterShotMovies(isSearchResultMovie))
      }
    } else {
      setFilteredMovies(isSearchResultMovie)
    }
    localStorage.setItem("shortMovies", !isShortMovie)
  }

  // поиск фильмов по запросу
  function searchMovie(query) {
    localStorage.setItem("searchMovie", query)
    localStorage.setItem("shortMovies", isShortMovie)

    if (localStorage.getItem("allMovies")) {
      const movies = JSON.parse(localStorage.getItem("allMovies"))
      installingShortMovieSearch(movies, query, isShortMovie)
    } else {
      setIsLoading(true)
      MoviesApi
        .getMovies()
        .then((moviesData) => {
          installingShortMovieSearch(moviesData, query, isShortMovie)
          setIsRequestError(false)
        })
        .catch((err) => {
          setIsRequestError(true)
          console.log(err)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }

  // Получение из localStorage массива короткометражных фильмов 
  React.useEffect(() => {
    if (localStorage.getItem("shortMovies") === "true") {
      setIsShortMovie(true)
    } else {
      setIsShortMovie(false)
    }
  }, [])

  // Получение из localStorage массива фильмов
  React.useEffect(() => {
    if (localStorage.getItem("movies")) {
      const movies = JSON.parse(localStorage.getItem("movies"))
      setIsSearchResultMovie(movies)
      if (localStorage.getItem("shortMovies") === "true") {
        setFilteredMovies(filterShotMovies(movies))
      } else {
        setFilteredMovies(movies)
      }
    } else {
      setIsNotFoundMovie(true);
    }
  }, [])

  // сообщение: фильм не найден
  React.useEffect(() => {
    if (localStorage.getItem("searchMovie")) {
      if (filteredMovies.length === 0) {
        setIsNotFoundMovie(true)
      } else {
        setIsNotFoundMovie(false)
      }
    } else {
      //setIsNotFoundMovie(false)
    } 
  }, [filteredMovies])

  return (
    <div>
      <HeaderMovies
        moviesActive="movies__active"
        navigationMovies="movies__burger-menu_active"
      />
      <div className="movies">
        <SearchForm 
          searchMovie={searchMovie} 
          handleFilterMovies={installingShortMovieFilter} 
          isShortMovie={isShortMovie} 
        />
        <MoviesCardList 
          movies={filteredMovies}
          isLoading={isLoading}
          isRequestError={isRequestError}
          isNotFoundMovie={isNotFoundMovie}
          isSavedMovies={false}
          savedMovies={savedMovies}
          onDeleteMovie={onDeleteMovie}
          onAddMovie={onAddMovie}
        />
      </div>
      <Footer />
    </div>
  );
}

export default Movies;
