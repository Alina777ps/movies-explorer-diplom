import React from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCardList.css";


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
      setIsShownMovies(7);
    } else {
      setIsShownMovies(5);
    }
  }

  // количество карточек на экране при нажатии на кнопку "Ещё"
  function showStillCards() {
    const display = window.innerWidth;
    if (display > 600) {
      setIsShownMovies(isShownMovies + 1);
    } else {
      setIsShownMovies(isShownMovies + 1);
    }
  }

  React.useEffect(() => {
    shownCards();
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
      window.addEventListener("resize", shownCards);
    }, 500);
  });

  function showSavedMovie(savedMovies, movie) {
    return savedMovies.find((savedMovie) => savedMovie.movieId === movie.id)
  }

  return (
    <>
      {<Preloader isLoading={isLoading} />}
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
