import React from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCardList.css";

import { SCREEN_SIZE_DESKTOP, SCREEN_SIZE_TABLET } from "../../utils/constants";


import MoviesCard from "../MoviesCard/MoviesCard.js";
import Preloader from "../Preloader/Preloader";
import SearchError from "../SearchError/SearchError";

function MoviesCardList({
  onDeleteMovie,
  onAddMovie,
  movies,
  isSavedMovie,
  savedMovies,
  isLoading,
  isNotFoundMovie,
  isRequestError,
}) {
  const { pathname } = useLocation();
  const [isShownMovies, setIsShownMovies] = React.useState(0);

  // количество карточек на экране в зависимости от размера экрана
  function shownCards() {
    const display = window.innerWidth;
    if (display > 600) {
      setIsShownMovies(SCREEN_SIZE_DESKTOP);
    } else {
      setIsShownMovies(SCREEN_SIZE_TABLET);
    }
  }

  React.useEffect(() => {
    shownCards();
  }, []);

  // количество карточек на экране при нажатии на кнопку "Ещё"
  function showStillCards() {
    const display = window.innerWidth;
    if (display > 600) {
      setIsShownMovies(isShownMovies + SCREEN_SIZE_DESKTOP);
    } else {
      setIsShownMovies(isShownMovies + SCREEN_SIZE_TABLET);
    }
  }

  React.useEffect(() => {
    setTimeout(() => {
      window.addEventListener("resize", shownCards);
      window.removeEventListener("resize", shownCards);
    }, 500);
  });

  function showSavedMovie(savedMovies, movie) {
    return savedMovies.find((savedMovie) => savedMovie.movieId === movie.id)
  }

  return (
    <>
      {isLoading && <Preloader isLoading={isLoading} />}
      {isNotFoundMovie && !isLoading && (
        <SearchError textError={"Ничего не найдено"} />
      )} 
      {isRequestError && !isLoading && (
        <SearchError
          textError={
            "Во время поискового запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
          }
        />
      )}
      {!isLoading && !isNotFoundMovie && !isRequestError && (
        <>
          {pathname === "/movies" ? (
            <>
              <div className="moviesCardList">
                {movies.slice(0, isShownMovies).map((movie) => (
                  <MoviesCard
                    key={movie.id}
                    movie={movie}
                    isSavedMovie={isSavedMovie}
                    savedMovies={savedMovies}
                    onDeleteMovie={onDeleteMovie}
                    onAddMovie={onAddMovie}
                    saved={showSavedMovie(savedMovies, movie)}
                  />
                ))}
                {movies.length > isShownMovies ? (
                  <button
                    className="moviesCardList__button-still"
                    type="button"
                    onClick={showStillCards}
                    aria-label="Ещё"
                  >
                    Ещё
                  </button>
                ) : (
                  ""
                )}
              </div>
            </>
          ) : (
            <>
              <div className="moviesCardList">
              {movies.map((movie) => (
                  <MoviesCard
                    key={isSavedMovie ? movie._id : movie.id}
                    movie={movie}
                    isSavedMovie={isSavedMovie}
                    savedMovies={savedMovies}
                    onDeleteMovie={onDeleteMovie}
                    saved={showSavedMovie(savedMovies, movie)}
                  />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}

export default MoviesCardList;
