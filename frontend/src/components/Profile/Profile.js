import React from "react";
import "./Profile.css";
import Header from "../Header/Header.js";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useForm } from '../../hooks/useForm';

function Profile({ onUpdateUser, goOut, isLoading, loggedIn }) {

  const [isLastValues, setIsLastValues] = React.useState(false);
  const [errorMessages, setErrorMessages] = React.useState(" ");
  

  const currentUser = React.useContext(CurrentUserContext);

  const { 
    values,
    handleChange,
    updateForm,
    isFormValid,
    errors,
    setValues } = useForm({ name: "", email: ""});

  React.useEffect(() => {
    if (currentUser) {
      setValues({ name: currentUser.name, email: currentUser.email })
    }
  }, [currentUser, setValues])

  function handleSubmit(e) {
    e.preventDefault();
    if ((values.name !== currentUser.name) || (values.email !== currentUser.email)) {
    onUpdateUser({
      name: values.name, email: values.email
      });
    } else {
      setErrorMessages("Вы не изменили свои данные. Сохранение отменено")
  }
  }

  // очистка формы при обновлении пользователя
  React.useEffect(() => {
    if (currentUser) {
      updateForm(currentUser)
    }
  }, [currentUser, updateForm])

  React.useEffect(() => {
    if (
      currentUser.name === values.name &&
      currentUser.email === values.email
    ) {
      setIsLastValues(true)
    } else {
      setIsLastValues(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values])

  return (
    <div>
      <Header loggedIn={loggedIn} headerMain="profile__color-black" hamburgerButtonImg="profile__color-black" />
      <div className="profile">
        <h2 className="profile__title">Привет, {currentUser.name}!</h2>
        <form className="profile__form" onSubmit={handleSubmit} id="form" noValidate>
          <fieldset className="profile__fieldset">
            <label
              className="profile__label"
              htmlFor="name"
            >
              Имя
              <input
                className="profile__input"
                type="text"
                name="name"
                id="name"
                placeholder="Имя"
                value={values.name}
                onChange={handleChange}
                required
                minLength="2"
                maxLength="40"
                disabled={isLoading}
              ></input>
              <span className="profile__input-error name-error">{errors.name}</span>
            </label>
            <label
              className="profile__label"
              htmlFor="email"
            >
              E-mail
              <input
                className="profile__input"
                type="email"
                name="email"
                id="email"
                placeholder="E-mail"
                value={values.email}
                onChange={handleChange}
                required
                minLength="2"
                maxLength="40"
                disabled={isLoading}
              ></input>
              <span className="input-error name-error"></span>
            </label>
          </fieldset>
          <p className="profile__error-message">{errorMessages}</p>
          <button
          className={
            !isFormValid || isLoading
              ? "profile__button-edit profile__button-edit_inactive"
              : "profile__button-edit"
          }
            type="submit"
            aria-label="Редактировать"
            disabled={isLoading}
          >
            Редактировать
          </button>
        </form>
        <button className="profile__signaut" type="button" onClick={goOut}>
          Выйти из аккаунта
        </button>
      </div>
    </div>
  );
}

export default Profile;
