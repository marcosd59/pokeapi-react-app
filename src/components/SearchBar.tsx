import React from "react";
import { FiSearch } from "react-icons/fi";

interface Props {
  value: string;
  onChange: (val: string) => void;
  onSearch: () => void;
  suggestions?: string[];
  onSuggestionClick?: (name: string) => void;
}

const SearchBar: React.FC<Props> = ({
  value,
  onChange,
  onSearch,
  suggestions,
  onSuggestionClick,
}) => (
  <div className="relative mb-8">
    <div className="flex justify-center mb-6">
      <img
        src="./pokemon.png"
        alt="Pokemon Logo"
        className="w-48 h-auto sm:w-64 md:w-72 lg:w-80 xl:w-96 object-contain"
      />
    </div>
    <div
      className="flex bg-white items-center border-2 rounded-full overflow-hidden shadow-lg focus-within:shadow-xl"
      style={{ borderColor: "#3463af" }}
    >
      <span className="px-3" style={{ color: "#3463af" }}>
        <FiSearch size={20} />
      </span>
      <input
        type="text"
        className="flex-grow px-4 py-2 text-lg text-gray-800 placeholder-gray-500 focus:outline-none rounded-full"
        placeholder="¿Qué Pokémon buscas?"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSearch()}
      />
      <button
        onClick={onSearch}
        className="hidden sm:block text-white font-semibold px-6 py-2 rounded-full mr-0.5 transition hover:opacity-90"
        style={{ backgroundColor: "#3463af" }}
      >
        Buscar
      </button>
    </div>
    {suggestions && suggestions.length > 0 && (
      <ul
        className="
      absolute 
      left-0 right-0 top-full 
      w-full 
      bg-white 
      border border-t-0 
      rounded-b-lg 
      mt-1 
      shadow-lg 
      max-h-48 
      overflow-auto 
      z-50
    "
      >
        {suggestions.map((name) => (
          <li
            key={name}
            className="px-4 py-2 hover:text-white cursor-pointer capitalize transition"
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#3463af")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
            onClick={() => onSuggestionClick?.(name)}
          >
            {name}
          </li>
        ))}
      </ul>
    )}

    {value && suggestions && suggestions.length === 0 && (
      <p className="mt-2 text-sm text-white text-center">
        No encontramos a “{value}”.
      </p>
    )}
  </div>
);

export default SearchBar;
