import React from "react";
import { Link } from "react-router-dom";
import "./Form.css";
import Logo from "../Logo/Logo.js";

function Form({
  formTitle,
  buttonName,
  formQuestion,
  formLinkName,
  formLink,
  children,
  handleSubmit,
  errorMessege,
  isDisabled,
  isLoading
}) {
  return (
    <div className="form__container">
      <Logo />
      <h1 className="form__title">{formTitle}</h1>
      <form className="form__form" onSubmit={handleSubmit} id="form" noValidate>
        <fieldset className="form__fieldset">{children}</fieldset>
        <p className="form__erorr">{errorMessege}</p>
        <button
          className={`form__submit
            ${isDisabled || isLoading
              ? "form__submit_inactive"
              : ""}`}
          type="submit" 
          aria-label={buttonName} 
          disabled={isDisabled || isLoading}
        >
          {buttonName}
        </button>
      </form>
      <div className="form__question">
        <p className="form__text">{formQuestion}</p>
        <Link className="form__link" to={formLink}>
          {formLinkName}
        </Link>
      </div>
    </div>
  );
}

export default Form;
