import React from "react";

import Form from "../Form/Form.js";
import Input from "../Input/Input.js";

import { useForm } from '../../hooks/useForm';

function Register({ errorMessege, handleSubmitRegister, isLoading }) {

  const { 
    values,
    handleChange,
    isFormValid,
    errors } = useForm({ name: "", email: "", password: "" });
    
    const handleSubmit = (e) => {
    e.preventDefault();
    handleSubmitRegister(values.name, values.email, values.password)
  };
  
  return (
    <Form
      name="registr"
      formTitle="Добро пожаловать!"
      buttonName="Зарегистрироваться"
      formQuestion="Уже зарегистрированы?"
      formLinkName="Войти"
      formLink="/signin"
      handleSubmit={handleSubmit}
      errorMessege={errorMessege}
      isDisabled={!isFormValid}
      isLoading={isLoading}
    >
      <Input 
        id="name" 
        placeholder="Имя" 
        type="text" 
        name="name" 
        value={values.name || ""} 
        changeInput={handleChange}
        errors={errors.name}
      />
      <Input 
        id="email" 
        placeholder="E-mail" 
        type="email" 
        name="email" 
        value={values.email} 
        changeInput={handleChange}
        errors={errors.email}
      />
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

export default Register;


