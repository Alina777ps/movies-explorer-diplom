import React from "react";
import "./Input.css";

function Input({ id, placeholder, type, name, value, changeInput, errors }) {
  return (
    <label className="input__label" htmlFor={id}>
      {placeholder}
      <input
        className="input__input"
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={changeInput}
        required
        minLength="2"
        maxLength="40"
      ></input>
      <span className={`input-error ${name}-error`}>{errors}</span>
    </label>
  );
}

export default Input;
