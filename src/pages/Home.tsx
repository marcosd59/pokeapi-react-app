import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPokemonNames } from "../features/pokemon/pokemonNamesSlice";
import {
  getPokemons,
  setPage,
  setSearch,
} from "../features/pokemon/pokemonSlice";
import type { RootState } from "../store";
import PokemonCard from "../components/PokemonCard";
import SearchBar from "../components/SearchBar";
import { LoaderSkeleton } from "../components/LoaderSkeleton";
import Pagination from "../components/Pagination";

const pageSize = 6;

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const { pokemons, loading, error, page, search } = useSelector(
    (state: RootState) => state.pokemon
  );
  const pokemonNames = useSelector(
    (state: RootState) => state.pokemonNames.names
  );

  const [filteredNames, setFilteredNames] = useState<string[]>([]);
  const [localPage, setLocalPage] = useState(1);
  const [localPokemons, setLocalPokemons] = useState<any[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    if (pokemonNames.length === 0) {
      dispatch(fetchPokemonNames() as any);
    }
  }, [dispatch, pokemonNames.length]);

  useEffect(() => {
    if (!search && filteredNames.length === 0) {
      dispatch(getPokemons({ page, search: "" }) as any);
    }
  }, [dispatch, page, search, filteredNames.length]);

  const handleSearchChange = (val: string) => {
    dispatch(setSearch(val));
    if (val.length > 1 && pokemonNames.length > 0) {
      const filtered = pokemonNames.filter((name) =>
        name.includes(val.toLowerCase())
      );
      setFilteredNames(filtered);
      setLocalPage(1);
      setSuggestions(filtered.slice(0, 10));
    } else {
      setFilteredNames([]);
      setSuggestions([]);
    }
  };

  useEffect(() => {
    if (filteredNames.length > 0) {
      const start = (localPage - 1) * pageSize;
      const currentNames = filteredNames.slice(start, start + pageSize);

      Promise.all(
        currentNames.map((name) =>
          fetch(`https://pokeapi.co/api/v2/pokemon/${name}`).then((res) =>
            res.json()
          )
        )
      ).then((results) => {
        setLocalPokemons(results);
      });
    }
  }, [filteredNames, localPage]);

  const handleSuggestionClick = (name: string) => {
    dispatch(setSearch(name));
    setSuggestions([]);
    setFilteredNames([name]);
    setLocalPage(1);
  };

  const handleSearch = () => {
    setSuggestions([]);
    if (filteredNames.length === 0 && search.length > 0) {
      setFilteredNames([search]);
      setLocalPage(1);
    }
  };

  const isFiltering = filteredNames.length > 0;
  const currentPage = isFiltering ? localPage : page;
  const totalPages = isFiltering
    ? Math.ceil(filteredNames.length / pageSize)
    : Math.ceil(pokemonNames.length / pageSize);

  const onPageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    if (isFiltering) {
      setLocalPage(newPage);
    } else {
      dispatch(setPage(newPage));
    }
  };

  return (
    <div className="container mx-auto p-4">
      <SearchBar
        value={search}
        onChange={handleSearchChange}
        onSearch={handleSearch}
        suggestions={suggestions}
        onSuggestionClick={handleSuggestionClick}
      />

      {error && <p className="text-red-500">{error}</p>}

      {loading ? (
        <LoaderSkeleton />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(isFiltering ? localPokemons : pokemons).map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </>
      )}
    </div>
  );
};

export default Home;
