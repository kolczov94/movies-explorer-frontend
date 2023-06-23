import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Logotype from "../Logotype/Logotype";
import "./Login.css";
import { VALIDATE_MESSAGE_EMAIL, VALIDATE_MESSAGE_REQUIRED } from "../../utils/constants";

export default function Login({ onLogin }) {
  const schema = yup.object({
    email: yup.string().required(VALIDATE_MESSAGE_REQUIRED).email(VALIDATE_MESSAGE_EMAIL),
    password: yup.string().required(VALIDATE_MESSAGE_REQUIRED),
  }).required();

  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema)
  });

  return (
    <div className="login">
      < Logotype />
      <h1 className="login__title">Рады видеть!</h1>
      <form className="login__form" onSubmit={handleSubmit(onLogin)} noValidate>
        <fieldset className="login__fieldset">
          <label htmlFor="" className="login__label">E-mail</label>
          <input
            type="email"
            placeholder="Введите ваш email"
            className={`login__input ${errors?.email?.message ? "login__input_error" : ""}`}
            {...register('email')}
          />
          <span className="login__error">{errors?.email?.message}</span>

          <label htmlFor="" className="login__label">Пароль</label>
          <input
            type="password"
            className={`login__input ${errors?.password?.message ? "login__input_error" : ""}`}
            {...register('password')}
            placeholder="Введите ваш пароль"
            autoComplete="on"
          />
          <span className="login__error">{errors?.password?.message}</span>
        </fieldset>
        <button
          className={`login__submit ${isValid ? "" : "login__submit_disable"} `}
          type="submit"
          disabled={!isValid}
        >Войти</button>
      </form>
      <div className="login__inner">
        <span className="login__text">Ещё не зарегистрированы?</span>
        <Link to='/signup' className="login__link">Регистрация</Link>
      </div>
    </div >
  );
};
