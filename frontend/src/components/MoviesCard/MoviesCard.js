import React from "react";
import "./MoviesCard.css";

function MoviesCard({
  movie,
  isSavedMovie,
  savedMovies,
  saved,
  onDeleteMovie,
  onAddMovie,
}) {
  function conversionTime(duration) {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours}ч ${minutes}м`;
  }

  function onClickDelete() {
    onDeleteMovie(movie);
  }

  function onClickButton() {
    if (saved) {
      onDeleteMovie(savedMovies.filter((item) => item.movieId === movie.id)[0]);
    } else {
      onAddMovie(movie);
    }
  }

  return (
    <div className="moviesCard" key={movie._id}>
      <div className="moviesCard__info">
        <h2 className="moviesCard__name">{movie.nameRU}</h2>
        <p className="moviesCard__time">{conversionTime(movie.duration)}</p>
        {isSavedMovie ? (
          <button
            type="button"
            className="moviesCard__button moviesCard__button-delete"
            onClick={onClickDelete}
            aria-label="Удалить"
          >
          </button>
        ) : (
          <button
            type="button"
            aria-label={saved
              ? "Удалить"
              : "Добавить"}
            onClick={onClickButton}
            className={`moviesCard__button ${saved ? "moviesCard__like-active" : "moviesCard__like"}`}
          >
          
          </button>
        )}
      </div>
      <a href={movie.trailerLink} target="_blank" rel="noreferrer">
        <img
          className="moviesCard__img"
          src={
            isSavedMovie
              ? movie.image
              : `https://api.nomoreparties.co/${movie.image.url}`
          }
          alt={movie.nameRU}
        />
      </a>
    </div>
  );
}

export default MoviesCard;
