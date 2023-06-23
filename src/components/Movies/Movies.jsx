import { useEffect, useState } from "react";
import "./Movies.css";

import Container from "../Container/Container";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";
import moviesApi from "../../utils/MoviesApi";
import useMoviesFilter from "../../hooks/useMoviesFilter";

export default function Movies({ savedMovies, onChangeMovie }) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorLoading, setIsErrorLoading] = useState(false);
  const {
    filter,
    setIsShort,
    filteredMovies,
    isShort,
    searchString
  } = useMoviesFilter();

  useEffect(() => {
    const moviesFilter = JSON.parse(localStorage.getItem('movies'));
    const shortMoviesFilter = JSON.parse(localStorage.getItem('shortMovies'));
    const searchStringFilter = JSON.parse(localStorage.getItem('searchString'));
    if (moviesFilter) {
      setMovies(moviesFilter);
      filter(searchStringFilter, moviesFilter)
      setIsShort(shortMoviesFilter);
    }
  }, [filter, setIsShort]);

  function handleSearch({searchString}) {
    console.log(searchString);
    if (!movies.length) {
      setIsErrorLoading(false);
      setIsLoading(true);
      moviesApi.getMovies()
        .then(data => {
          setMovies(data);
          filter(searchString, data);
          localStorage.setItem('movies', JSON.stringify(data));
        })
        .catch(err => {
          console.log(err);
          setIsErrorLoading(true);
        })
        .finally(() => setIsLoading(false));
    } else {
      filter(searchString, movies);
    }
    localStorage.setItem('searchString', JSON.stringify(searchString));
  }

  function handleChangeCheckbox() {
    localStorage.setItem('shortMovies', JSON.stringify(!isShort));
    setIsShort(!isShort);
  }

  return (
    <>
      <Header />
      <main className="movies">
        <Container>
          <div className="movies__search">
            <SearchForm
              searchString={searchString}
              checkbox={isShort}
              onSubmit={handleSearch}
              onChangeCheckbox={handleChangeCheckbox}
            />
          </div>
          <div className="movies__list">
            {movies.length
              ? <MoviesCardList
                movies={filteredMovies}
                savedMovies={savedMovies}
                onChangeMovie={onChangeMovie}
              />
              : <></>
            }
            {isLoading ? <Preloader /> : <></>}
            {isErrorLoading
              ? <div className="movies__error">Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</div>
              : <></>
            }
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
};
