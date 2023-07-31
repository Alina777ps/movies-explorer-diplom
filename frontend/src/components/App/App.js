import React from "react";

import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";

import "./App.css";

import Main from "../Main/Main.js";
import Movies from "../Movies/Movies.js";
import SavedMovies from "../SavedMovies/SavedMovies.js";
import Register from "../Register/Register.js";
import Login from "../Login/Login.js";
import Profile from "../Profile/Profile.js";
import NotFound from "../NotFound/NotFound.js";
import PopupInfo from "../PopupInfo/PopupInfo";

import ProtectedRouteElement from "../ProtectedRoute/ProtectedRoute";

import * as mainApi from "../../utils/MainApi.js";
import * as auth from "../../utils/auth";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function App() {
  const [errorMessege, setErrorMessege] = React.useState("");
//состояние авторизации
  const [loggedIn, setLoggedIn] = React.useState(false);
  //const [isTokenChecked, setIsTokenChecked] = React.useState(false);
  //загрузка
  const [isLoading, setIsLoading] = React.useState(false);
  //успешное выполнение операции
  const [isSuccess, setIsSuccess] = React.useState(false);
  //открытие попапа с информацией о редактировании профиля
  const [isPopupInfoOpen, setIsPopupInfoOpen] = React.useState(false);
  

  const [currentUser, setCurrentUser] = React.useState({
    name: "",
    email: "",
  });

  const [savedMovies, setSavedMovies] = React.useState([])

  const navigate = useNavigate();
  const location = useLocation();

  function handleSubmitRegister(name, email, password) {
    setIsLoading(true);
    auth
      .register(name, email, password)
      .then((user) => {
        setCurrentUser(user);
        setIsPopupInfoOpen(true);
        setIsSuccess(true);
        handleSubmitLogin(email, password)
      })
      .catch((err) => {
        setErrorMessege(err);
        setIsPopupInfoOpen(true);
        setIsSuccess(false);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleSubmitLogin(email, password) {
    if (!password || !email) {
      setErrorMessege(`Не заполнены поля email или пароль`);
      return;
    };
    setIsLoading(true);
    auth
      .authorize(email, password)
      .then((user) => {
        if (user.token) {
          localStorage.setItem("jwt", user.token);
          setIsPopupInfoOpen(true);
          setIsSuccess(true);
          setLoggedIn(true)
          setCurrentUser(user);
          navigate("/movies", { replace: true });
        }
      })
      .catch((err) => {
        console.log(err.message);
        setIsPopupInfoOpen(true);
        setIsSuccess(false);
        setErrorMessege(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  const tokenCheck = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      setIsLoading(true);
      auth
        .checkToken(jwt)
        .then(() => {
          setLoggedIn(true)
          navigate(location.pathname, { replace: true });
      }) 
        .catch((error) => console.log(`Произошла ошибка: ${error}`))
        .finally(() => {
          setIsLoading(false);
        })
    }
  };

  //проверяем токен
  React.useEffect(() => {
    tokenCheck();
  }, []);

  //выход из аккаунта
  function goOut() {
    localStorage.removeItem("jwt");
    localStorage.clear();
    setLoggedIn(false);
    setCurrentUser({
      name: "",
      email: "",
    });
    navigate("/", { replace: true });
  }

  function handleUnauthorized(err) {
    if (err === "Error: 401") {
      goOut()
    }
  }

  //получение информации о пользователе
  React.useEffect(() => {
    loggedIn &&
      mainApi
        .getUserInfo()
        .then((user) => setCurrentUser(user))
        .catch((error) => console.log(`Произошла ошибка: ${error}`))
  }, [loggedIn, navigate]);

  //получение массива фильмов
  React.useEffect(() => {
    //setIsLoading(true);
    loggedIn &&
    mainApi
        .getMovies()
        .then((moviesData) => {
          setSavedMovies(moviesData.reverse())
        })
        .catch((error) => console.log(`Произошла ошибка: ${error}`))
  }, [loggedIn, navigate]);

  //редактирование профиля
  function handleUpdateUser(data) {
    setIsLoading(true);
    mainApi
      .setUserInfo(data)
      .then((user) => {
        setIsPopupInfoOpen(true);
        setIsSuccess(true);
        setCurrentUser(user);
      })
      .catch((err) => {
        setIsPopupInfoOpen(true);
        setIsSuccess(false);
        console.log(err)
      })
      .finally(() => setIsLoading(false));
  }

  // добавляем новый фильм newMovie в список сохраненных фильмов в начало списка
  function onAddMovie(movie) {
    
    mainApi
      .addNewMovies(movie)
      .then((newMovie) => {
        setSavedMovies([newMovie, ...savedMovies])
      })
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`)
        handleUnauthorized(err) // ошибка авторизации и выход из аккаунта
      })
  }

  // удалить фильм newMovie из списока сохраненных фильмов
  function onDeleteMovie(movie) {
    mainApi
      .deleteMovie(movie._id)
      .then(() => {
        setSavedMovies((state) => state.filter((item) => item._id !== movie._id))
      })
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`)
        handleUnauthorized(err) // ошибка авторизации и выход из аккаунта
      })
  }

  function closePopup() {
    setIsPopupInfoOpen(false)
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Routes>
          <Route path="/" element={<Main loggedIn={loggedIn} />} />
            <Route
              path="/movies"
              element={
                <ProtectedRouteElement
                  element={Movies} 
                  loggedIn={loggedIn}   
                  savedMovies={savedMovies} 
                  onDeleteMovie={onDeleteMovie} 
                  onAddMovie={onAddMovie} 
                />
              }
            />
            <Route
              path="/saved-movies"
              element={
                <ProtectedRouteElement
                  element={SavedMovies}
                  loggedIn={loggedIn}
                  savedMovies={savedMovies}
                  onDeleteMovie={onDeleteMovie}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRouteElement
                  element={Profile}
                  loggedIn={loggedIn}
                  isLoading={isLoading}
                  onUpdateUser={handleUpdateUser}
                  goOut={goOut}
                />
              }
            />
            <Route
              path="/signup"
              element={
                loggedIn ? (
                  <Navigate to="/movies" replace />
                ) : (
                  <Register
                    errorMessege={errorMessege}
                    handleSubmitRegister={handleSubmitRegister}
                    isLoading={isLoading}
                  />
                )
              }
            />
            <Route
              path="/signin"
              element={
                loggedIn ? (
                  <Navigate to="/movies" replace />
                ) : (
                  <Login
                    errorMessege={errorMessege}
                    handleSubmitLogin={handleSubmitLogin}
                    isLoading={isLoading}
                  />
                )
              }
            />
            <Route path="/*" element={<NotFound />} />
          </Routes>
          <PopupInfo
            isOpen={isPopupInfoOpen}
            onClose={closePopup}
            isSuccess={isSuccess}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
