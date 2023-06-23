import { useEffect } from "react";
import useMoviesFilter from "../../hooks/useMoviesFilter";

import Container from "../Container/Container";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import "./SavedMovies.css"

export default function SavedMovies({ savedMovies, isMoviesLoaded, onChangeMovie }) {
  const {
    filter,
    setIsShort,
    filteredMovies,
    isShort,
    searchString
  } = useMoviesFilter();

  useEffect(() => {
    const shortMoviesFilter = JSON.parse(localStorage.getItem('myShortMovies'));
    const searchStringFilter = JSON.parse(localStorage.getItem('mySearchString'));
    if (searchStringFilter) {
      filter(searchStringFilter, savedMovies);
      setIsShort(shortMoviesFilter);
    } else {
      filter('', savedMovies);
      setIsShort(shortMoviesFilter);
    }
  }, [filter, setIsShort, savedMovies]);

  function handleSearch({searchString}) {
    filter(searchString, savedMovies);
    localStorage.setItem('mySearchString', JSON.stringify(searchString));
  }

  function handleChangeCheckbox() {
    localStorage.setItem('myShortMovies', JSON.stringify(!isShort));
    setIsShort(!isShort);
  }

  return (
    <>
      <Header />
      <main className="saved-movies">
        <Container>
          <div className="saved-movies__search">
            <SearchForm
              searchString={searchString}
              checkbox={isShort}
              onSubmit={handleSearch}
              onChangeCheckbox={handleChangeCheckbox} />
          </div>
          {savedMovies.length
            ? <div className="saved-movies__list">
              <MoviesCardList
                movies={filteredMovies}
                isMoviesLoaded={isMoviesLoaded}
                onChangeMovie={onChangeMovie}
              />
            </div>
            : <></>
          }
        </Container>
      </main>
      <Footer />
    </>
  );
};
