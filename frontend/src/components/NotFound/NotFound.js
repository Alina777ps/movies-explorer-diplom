import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  const navigate = useNavigate();

  function goBack() {
    navigate(-1, { replace: true });
  }

  return (
    <div className="notFound">
      <h2 className="notFound-number">404</h2>
      <p className="notFound-text">Страница не найдена</p>
      <button
        className="not-found__button-back"
        tupe="button"
        aria-label="Назад"
        onClick={goBack}
      >
        Назад
      </button>
    </div>
  );
}

export default NotFound;
