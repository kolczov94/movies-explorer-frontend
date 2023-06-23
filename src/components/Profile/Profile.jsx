import { useContext } from "react";
import CurrentUserContext from "../../context/CurrentUserContext";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import "./Profile.css";

import Header from "../Header/Header";
import { VALIDATE_MESSAGE_DUBLICATE, VALIDATE_MESSAGE_EMAIL, VALIDATE_MESSAGE_REQUIRED } from "../../utils/constants";

export default function Profile({ onSignout, onUpdate }) {
  const currentUser = useContext(CurrentUserContext);

  const schema = yup.object({
    name: yup.string().required(VALIDATE_MESSAGE_REQUIRED).min(2).max(30).test({
      message: VALIDATE_MESSAGE_DUBLICATE,
      test: (value) => value !== currentUser.name,
    }).default(currentUser.name),
    email: yup.string(currentUser.email).required(VALIDATE_MESSAGE_REQUIRED).email(VALIDATE_MESSAGE_EMAIL),
  }).required();

  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema)
  });

  function handleBtnSignout() {
    onSignout();
  }

  return (
    <>
      <Header />
      <main className="profile">
        <h1 className="profile__title">Привет, {currentUser.name}!</h1>
        <form className="profile__form" onSubmit={handleSubmit(onUpdate)}>
          <div className="profile__form-block">
            <fieldset className="profile__fieldset">
              <label htmlFor="profile-name" className="profile__label">Имя</label>
              <input
                type="text"
                className="profile__input"
                placeholder="Введите ваше имя"
                defaultValue={currentUser.name}
                {...register('name')}
              />
            </fieldset>
            {errors?.name?.message && <span className="profile__error">{errors?.name?.message}</span>}
            <fieldset className="profile__fieldset">
              <label htmlFor="profile-email" className="profile__label">E-mail</label>
              <input
                type="email"
                placeholder="Введите ваш email"
                className="profile__input"
                defaultValue={currentUser.email}
                {...register('email', {})}
              />
            </fieldset>
            {errors?.email?.message && <span className="profile__error">{errors?.email?.message}</span>}
          </div>
          <div className="profile__submit">
            <button
              type="submit"
              className={`profile__btn profile__btn_type_submit ${isValid ? '' : 'profile__btn_disable'}`}
              disabled={!isValid}
            >Редактировать</button>
          </div>
        </form>
        <button type="button" className="profile__btn profile__btn_type_exit" onClick={handleBtnSignout}>Выйти из аккаунта</button>
      </main>
    </>
  );
};
