//перевод запроса в строке поиска в необходимый вид
export function filterMovies(movies, query) {
    const moviesQuery = movies.filter((movie) => {
      const movieRu = String(movie.nameRU).toLowerCase().trim()
      const movieEn = String(movie.nameEN).toLowerCase().trim()
      const userQuery = query.toLowerCase().trim()
      return (
        movieRu.indexOf(userQuery) !== -1 || movieEn.indexOf(userQuery) !== -1
      )
    })
    return moviesQuery
  }
  
  //фильтрация короткометражных фильмов
  export function filterShotMovies(movies) {
    return movies.filter((movie) => movie.duration < 40)
  }