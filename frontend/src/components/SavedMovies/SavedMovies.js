import React from "react";
import "./SavedMovies.css";

import { filterShotMovies, filterMovies } from "../../utils/utils";

import SearchForm from "../SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";
import Header from "../Header/Header.js";
import Footer from "../Footer/Footer.js";

function SavedMovies({ savedMovies, onDeleteMovie, loggedIn }) {
  // savedMovies: Массив сохраненных фильмов
  // onClickButton: Функция для удаления сохраненного фильма

  //список фильмов, которые соответствуют запросу и фильтра
  const [filteredMovies, setFilteredMovies] = React.useState(savedMovies)
  // вклячение/выключение фильтра короткометражных фильмов
  const [isShortMovie, setIsShortMovie] = React.useState(false)
  // список сохраненных фильмов пустой
  const [isNotFoundMovie, setisNotFoundMovie] = React.useState(false);
  // введенный запрос
  const [searchRequest, setSearchRequest] = React.useState("")

  // сохранение поискового запроса в состоянии searchQuery
  function searchMovie(query) {
    setSearchRequest(query)
  }

  //переключение фильтра isShortMovie
  function installingShortMovieFilter() {
    setIsShortMovie(!isShortMovie)
  }

  // при измении сохраненных фильмов или при новом запросе
  // происходитфильтрация фильмов на основе текущего поискового запроса
  React.useEffect(() => {
    const moviesCardList = filterMovies(savedMovies, searchRequest)
    setFilteredMovies(
      isShortMovie ? filterShotMovies(moviesCardList) : moviesCardList
    )
  }, [savedMovies, isShortMovie, searchRequest])

  // сообщение: фильм не найден
  React.useEffect(() => {
    if (filteredMovies.length === 0) {
      setisNotFoundMovie(true)
    } else {
      setisNotFoundMovie(false)
    }
  }, [filteredMovies])

  return (
    <div>
      <Header 
        loggedIn={loggedIn} 
        headerMain="savedMovies__color-black" 
        activeSavedMovies="savedMovies__link-active" 
        navigationSavedMovies="savedMovies__burger-menu_active"
        hamburgerButtonImg="savedMovies__color-black"
      />
      <div className="savedMovies">
        <SearchForm 
          searchMovie={searchMovie} 
          handleFilterMovies={installingShortMovieFilter} 
          isShortMovie={isShortMovie} 
        />
        <MoviesCardList 
          movies={filteredMovies}
          isNotFoundMovie={isNotFoundMovie}
          onDeleteMovie={onDeleteMovie}
          isSavedMovie={true}
          cards={filteredMovies}
          savedMovies={savedMovies}
         />
      </div>
      <Footer />
    </div>
  );
}

export default SavedMovies;
