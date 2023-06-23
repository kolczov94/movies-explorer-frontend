import useCounterCard from "../../hooks/useCounterCard";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

export default function MoviesCardList({ movies, savedMovies, onChangeMovie }) {
  const { count, step } = useCounterCard();

  function handleAnother() {
    step()
  }

  function checkSavedMovie(id) {
    if (id) {
      const isSaved = savedMovies.find(item => item.movieId === id);
      return isSaved !== undefined;
    }
    return false;
  }

  return (
    <section className="movies-card-list">
      {movies.length
        ? <ul className="movies-card-list__list">
          {movies.slice(0, count).map(movie => {
            return (
              <li key={movie.id ? movie.id : movie['_id']} className="movies-card-list__item">
                <MoviesCard
                  movie={movie}
                  onChangeMovie={onChangeMovie}
                  isSaved={checkSavedMovie(movie.id)}
                />
              </li>
            )
          })}
        </ul>
        : <p className="movies-card-list__info">Ничего не найдено</p>
      }
      {movies.length >= count
        ? <button className="movies-card-list__another" type="button" onClick={handleAnother}>Еще</button>
        : ''
      }
    </section>
  );
};