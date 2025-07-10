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

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= Math.ceil(filteredNames.length / pageSize)) {
      setLocalPage(newPage);
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
      ) : filteredNames.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {localPokemons.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>
          <div className="flex items-center justify-center mt-6 space-x-1 sm:space-x-2">
            <button
              disabled={localPage === 1}
              onClick={() => handlePageChange(localPage - 1)}
              className="px-3 py-2 sm:px-6 sm:py-3 bg-blue-500 text-white font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:bg-blue-600 hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed text-sm sm:text-base"
            >
              <span className="hidden sm:inline">Anterior</span>
              <span className="sm:hidden">Ant</span>
            </button>

            <div className="flex space-x-1 sm:space-x-2">
              {localPage > 1 && (
                <button
                  onClick={() => handlePageChange(1)}
                  className="px-2 py-1 sm:px-4 sm:py-2 rounded-full bg-white text-gray-700 font-medium shadow-sm hover:bg-blue-500 hover:text-white transition text-sm sm:text-base"
                >
                  1
                </button>
              )}

              {localPage > 2 && (
                <span className="text-gray-800 text-sm sm:text-base">...</span>
              )}

              {localPage > 1 && (
                <button
                  onClick={() => handlePageChange(localPage - 1)}
                  className="px-2 py-1 sm:px-4 sm:py-2 rounded-full bg-white text-gray-700 font-medium shadow-sm hover:bg-blue-500 hover:text-white transition text-sm sm:text-base"
                >
                  {localPage - 1}
                </button>
              )}

              <button
                className={`px-2 py-1 sm:px-4 sm:py-2 rounded-full text-sm sm:text-base ${
                  localPage === localPage
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700"
                }`}
              >
                {localPage}
              </button>

              {localPage < Math.ceil(filteredNames.length / pageSize) && (
                <button
                  onClick={() => handlePageChange(localPage + 1)}
                  className="px-2 py-1 sm:px-4 sm:py-2 rounded-full bg-white text-gray-700 font-medium shadow-sm hover:bg-blue-500 hover:text-white transition text-sm sm:text-base"
                >
                  {localPage + 1}
                </button>
              )}

              {localPage < Math.ceil(filteredNames.length / pageSize) - 1 && (
                <span className="text-gray-800 text-sm sm:text-base">...</span>
              )}
            </div>

            <button
              disabled={localPage * pageSize >= filteredNames.length}
              onClick={() => handlePageChange(localPage + 1)}
              className="px-3 py-2 sm:px-6 sm:py-3 bg-blue-500 text-white font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:bg-blue-600 hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed text-sm sm:text-base"
            >
              <span className="hidden sm:inline">Siguiente</span>
              <span className="sm:hidden">Sig</span>
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {pokemons.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>

          <div className="flex items-center justify-center mt-6 space-x-1 sm:space-x-2">
            <button
              disabled={page === 1}
              onClick={() => dispatch(setPage(page - 1))}
              className="px-3 py-2 sm:px-6 sm:py-2 bg-blue-500 text-white font-semibold rounded-md shadow-sm transition-all duration-200 hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-sm sm:text-base"
            >
              <span className="hidden sm:inline">Anterior</span>
              <span className="sm:hidden">Ant</span>
            </button>

            <div className="flex space-x-1 sm:space-x-2">
              {page > 2 && (
                <button
                  onClick={() => dispatch(setPage(1))}
                  className="px-2 py-1 sm:px-4 sm:py-2 rounded-md bg-white text-gray-700 font-medium border border-gray-300 hover:bg-blue-500 hover:text-white transition duration-200 text-sm sm:text-base"
                >
                  1
                </button>
              )}

              {page > 2 && (
                <span className="text-gray-800 text-sm sm:text-base">...</span>
              )}

              {page > 1 && (
                <button
                  onClick={() => dispatch(setPage(page - 1))}
                  className="px-2 py-1 sm:px-4 sm:py-2 rounded-md bg-white text-gray-700 font-medium border border-gray-300 hover:bg-blue-500 hover:text-white transition duration-200 text-sm sm:text-base"
                >
                  {page - 1}
                </button>
              )}

              <button
                className={`px-2 py-1 sm:px-4 sm:py-2 rounded-md text-sm sm:text-base ${
                  page === page
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700 border border-gray-300"
                } transition-all duration-200`}
              >
                {page}
              </button>

              {page < Math.ceil(filteredNames.length / pageSize) && (
                <button
                  onClick={() => dispatch(setPage(page + 1))}
                  className="px-2 py-1 sm:px-4 sm:py-2 rounded-md bg-white text-gray-700 font-medium border border-gray-300 hover:bg-blue-500 hover:text-white transition duration-200 text-sm sm:text-base"
                >
                  {page + 1}
                </button>
              )}

              {page < Math.ceil(filteredNames.length / pageSize) - 1 && (
                <span className="text-gray-800 text-sm sm:text-base">...</span>
              )}
            </div>

            <button
              onClick={() => dispatch(setPage(page + 1))}
              className="px-3 py-2 sm:px-6 sm:py-2 bg-blue-500 text-white font-semibold rounded-md shadow-sm transition-all duration-200 hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-sm sm:text-base"
            >
              <span className="hidden sm:inline">Siguiente</span>
              <span className="sm:hidden">Sig</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
