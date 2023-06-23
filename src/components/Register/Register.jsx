import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Logotype from "../Logotype/Logotype";
import "./Register.css";
import { VALIDATE_MESSAGE_EMAIL, VALIDATE_MESSAGE_REQUIRED } from "../../utils/constants";

export default function Register({ onRegister }) {
  const schema = yup.object({
    name: yup.string().required(VALIDATE_MESSAGE_REQUIRED),
    email: yup.string().required(VALIDATE_MESSAGE_REQUIRED).email(VALIDATE_MESSAGE_EMAIL),
    password: yup.string().required(VALIDATE_MESSAGE_REQUIRED),
  }).required();

  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema)
  });

  return (
    <div className="register">
      <Logotype />
      <h1 className="register__title">Добро пожаловать!</h1>
      <form className="register__form" onSubmit={handleSubmit(onRegister)} noValidate>
        <fieldset className="register__fieldset">
          <label htmlFor="" className="register__label">Имя</label>
          <input
            type="text"
            className={`register__input ${errors?.name?.message ? "register__input_error" : ""}`}
            placeholder="Введите ваше имя"
            {...register('name')}
          />
          <span className="register__error">{errors?.name?.message}</span>

          <label htmlFor="" className="register__label">E-mail</label>
          <input
            type="email"
            placeholder="Введите ваш email"
            className={`register__input ${errors?.email?.message ? "register__input_error" : ""}`}
            {...register('email')}
          />
          <span className="register__error">{errors?.email?.message}</span>

          <label htmlFor="" className="register__label">Пароль</label>
          <input
            type="password"
            className={`register__input ${errors?.password?.message ? "register__input_error" : ""}`}
            {...register('password')}
            placeholder="Введите ваш пароль"
            autoComplete="on"
          />
          <span className="register__error">{errors?.password?.message}</span>
        </fieldset>
        <button
          className={`register__submit ${isValid ? "" : "register__submit_disable"} `}
          type="submit"
          disabled={!isValid}
        >Зарегистрироваться</button>
      </form>
      <div className="register__inner">
        <span className="register__text">Уже зарегистрированы?</span>
        <Link to='/signin' className="register__link">Войти</Link>
      </div>
    </div>
  );
};