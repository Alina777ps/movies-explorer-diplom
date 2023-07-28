import { checkResponse } from "./checkResponse";

export const BASE_URL = "https://api.movies-explorer.alina.nomoreparties.sbs";
  
  // метод делает запрос серверу и получает данные профиля
  export const getUserInfo = () => {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => checkResponse(res));
  };
  
  // метод изменяет данные профиля на сервере
  export const setUserInfo = (data) => {
    // console.log(data);
    return fetch(`${BASE_URL}/users/me`, {
      method: 'PATCH', //метод запроса
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      }, //заголовки запроса
      body: JSON.stringify({
        //тело запроса
        name: data.name, //в name передаем значение name объекта, переданного в setUserInfo
        email: data.email, //в about передаем значение about объекта, переданного в setUserInfo
      }),
    }).then((res) => checkResponse(res));
  };
  
  export const getMovies = () => {
    return fetch(`${BASE_URL}/movies`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => checkResponse(res));
  };
  
  // метод добавления новой карточки на сервер
  export const addNewMovies = (data) => {
    // console.log(data);
    return fetch(`${BASE_URL}/movies`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: 'https://api.nomoreparties.co' + data.image.url,
        trailerLink: data.trailerLink,
        thumbnail: 'https://api.nomoreparties.co' + data.image.formats.thumbnail.url,
        movieId: data.id,
        nameRU: data.nameRU,
        nameEN: data.nameEN,
      }),
    }).then((res) => checkResponse(res));
  };
  
  // метод удаления карточки с сервера
  export const deleteMovie = (cardId) => {
    return fetch(`${BASE_URL}/movies/${cardId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => checkResponse(res));
  };