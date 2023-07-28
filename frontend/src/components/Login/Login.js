import React from "react";
import "./Login.css";

import { useForm } from '../../hooks/useForm';

import Form from "../Form/Form.js";
import Input from "../Input/Input.js";

function Login({ handleSubmitLogin, errorMessege, isLoading }) {

  const { 
    values,
    handleChange,
    isFormValid,
    errors } = useForm({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSubmitLogin(values.email, values.password)
  };


  return (
    <Form
      name="login"
      formTitle="Рады видеть!"
      buttonName="Войти"
      formSubmitType="form__Submit_login"
      formQuestion="Ещё не зарегистрированы?"
      formLinkName="Регистрация"
      formLink="/signup"
      handleSubmit={handleSubmit}
      errorMessege={errorMessege}
      isDisabled={!isFormValid}
      isLoading={isLoading}
    >
      <Input 
        id="email" 
        placeholder="E-mail" 
        type="email" 
        name="email" 
        value={values.email}
        changeInput={handleChange}
        errors={errors.email} />
      <Input
        id="password"
        placeholder="Пароль"
        type="password"
        name="password"
        value={values.password}
        changeInput={handleChange}
        errors={errors.password}
      />
    </Form>
  );
}

export default Login;
