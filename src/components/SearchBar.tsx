import React from "react";

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
  suggestions = [],
  onSuggestionClick,
}) => (
  <div className="relative mb-4">
    <div className="flex">
      <input
        type="text"
        className="border rounded-l px-4 py-2 w-full"
        placeholder="Busca un Pokémon..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") onSearch();
        }}
      />
      <button
        className="bg-blue-500 text-white rounded-r px-4"
        onClick={onSearch}
      >
        Buscar
      </button>
    </div>
    {suggestions.length > 0 && (
      <ul className="absolute z-10 bg-white border w-full shadow rounded mt-1 max-h-48 overflow-auto">
        {suggestions.map((name) => (
          <li
            key={name}
            className="px-4 py-2 hover:bg-blue-100 cursor-pointer capitalize"
            onClick={() => onSuggestionClick && onSuggestionClick(name)}
          >
            {name}
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default SearchBar;
