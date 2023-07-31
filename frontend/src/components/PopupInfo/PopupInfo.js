import React from "react";
import "./PopupInfo.css";

const PopupInfo = ({ isSuccess, isOpen, onClose }) => {
  // внутри указываем `useEffect` для обработчика `Escape`
  React.useEffect(() => {
    // ограничиваем навешивание обработчика: если не открыт, то не нужно навешивать
    if (!isOpen) return;
    // объявляем внутри `useEffect` функцию, чтобы она не теряла ссылку при перерисовке компонента
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", closeByEscape);
    // обязательно удаляем обработчик в `clean-up` функции
    return () => document.removeEventListener("keydown", closeByEscape);
    // обязательно следим за `isOpen`, чтобы срабатывало только при открытии, а не всегда
  }, [isOpen, onClose]);

  // создаем обработчик оверлея
  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
    className={`popupinfo ${isOpen ? "popupinfo__opened" : ""}`}
    onClick={handleOverlay}
  >
    <div className="popupinfo__container">
      {isSuccess ? (
        <>
          <p className="popupinfo__title">
            Успешно выполнено!
          </p>
        </>
      ) : (
        <>
          <p className="popupinfo__title">
            Что-то пошло не так. Попробуйте ещё раз!
          </p>
        </>
      )}

      <button
        type="button"
        className="popupinfo__close-button"
        onClick={onClose}
      ></button>
    </div>
  </div>
  )
};

export default PopupInfo;