import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import "./SearchForm.css";

export default function SearchForm({ searchString, checkbox, onSubmit, onChangeCheckbox }) {
  const schema = yup.object({
    searchString: yup.string().required(),
  }).required();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  return (
    <div className="search-form">
      <form className="search-form__form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <span className="search-form__icon"></span>
        <fieldset className="search-form__fildset">
          <input
            type="text"
            className="search-form__input"
            placeholder="Фильм"
            defaultValue={searchString}
            {...register('searchString')}
          />
          {errors?.searchString?.message && <span className="serach-form__error">Нужно ввести ключевое слово</span>}
        </fieldset>
        <button className="search-form__btn" type="submit"></button>
      </form>
      <div className="search-form__filter">
        <FilterCheckbox
          label="Короткометражки"
          checked={checkbox}
          onChange={onChangeCheckbox}
        />
      </div>
    </div>
  );
};
