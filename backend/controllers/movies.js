const Movie = require('../models/movie');

const BadRequestError = require('../errors/BadRequestError');
// const UnauthorizedError = require('../errors/UnauthorizedError');
const NotFoundError = require('../errors/NotFoundError');
// const ConflictError = require('../errors/ConflictError');
const ForbiddenError = require('../errors/ForbiddenError');

// возвращает все сохранённые текущим  пользователем фильмы
// GET /movies
module.exports.getMovie = (req, res, next) => {
  const { id } = req.user;
  Movie.find({ owner: id })
    .then((movie) => res.send(movie))
    .catch(next);
};

// создаёт фильм с переданными в теле
// country, director, duration, year, description, image,
// trailerLink, nameRU, nameEN, thumbnail, movieId
// POST /movies
module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const { id } = req.user;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: id,
  })
    .then((movie) => {
      res.send(movie);
    })
    .catch((err) => {
      if (
        res.status(err.name === 'CastError' || err.name === 'ValidationError')
      ) {
        next(new BadRequestError(
          `Переданы некорректные данные при создании фильма ${err.name}.`,
        ));
      } else {
        next(err);
      }
    });
};

// удаляет сохранённый фильм по id
// DELETE /movies/movieId
module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  const { id } = req.user;

  Movie.findById(movieId)
    .orFail()
    .then((movie) => {
      const { owner: movieOwnerId } = movie;
      if (movieOwnerId.valueOf() !== id) {
        throw new ForbiddenError('Вы не можете удалить этот фильм.');
      } return Movie.findByIdAndDelete(movieId);
    })
    .then((deletedMovie) => {
      res.send({ deletedMovie, message: 'Фильм успешно удален' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(
          'Переданы некорректные данные фильма.',
        ));
      } else if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError(
          'Передан несуществующий _id фильма.',
        ));
      } else {
        next(err);
      }
    });
};
