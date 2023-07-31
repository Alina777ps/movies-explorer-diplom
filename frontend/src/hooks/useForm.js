import React from "react";
import { useCallback } from 'react';

//Hook useForm для управления состоянием формы
export function useForm(inputValues={}) {
  //хранение введенных данных в поле формы
  const [values, setValues] = React.useState(inputValues);
  //хранение ошибок при валидации
  const [errors, setErrors] = React.useState({});
  //валидна/невалидна форма
  const [isFormValid, setIsFormValid] = React.useState(false);

  //изменение значений полей форма
  const handleChange = (event) => {
    const {value, name} = event.target;
    setValues({...values, [name]: value});
    setErrors({
      ...errors,
      [name]: event.target.validationMessage,
    })

    setIsFormValid(event.target.closest("#form").checkValidity())
  };

  //обновление формы
  const updateForm = useCallback(
    (newValues = {}, newErrors = {}, newIsFormValid = false) => {
      setValues(newValues)
      setErrors(newErrors)
      setIsFormValid(newIsFormValid)
    },
    [setValues, setErrors, setIsFormValid]
  )
  return {
    values,
    handleChange,
    isFormValid,
    errors,
    updateForm,
    setValues
  }
}
