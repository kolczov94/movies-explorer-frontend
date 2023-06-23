import { useCallback, useEffect, useState } from "react"

export default function useMoviesFilter() {
  const [isShort, setIsShort] = useState(false);
  const [searchString, setSearchString] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filteredShort, setFilteredShort] = useState([]);

  useEffect(() => {
    setFilteredShort(filtered.filter((item) => Number(item.duration) < 40))
  }, [filtered]);

  const filter = useCallback((value, list) => {
    if (typeof value === 'string') {
      setSearchString(value);
      const filtered = list.filter((item) => {
        return item.nameRU.toLowerCase().indexOf(value.toLowerCase()) !== -1;
      });
      setFiltered(filtered);
    }
  }, []);

  return {
    filteredMovies: isShort ? filteredShort : filtered,
    filter,
    searchString,
    isShort,
    setIsShort,
  }
};
