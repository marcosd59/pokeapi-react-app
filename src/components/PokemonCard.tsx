import React from "react";
import { useNavigate } from "react-router-dom";
import type { Pokemon } from "../types/pokemon";

const typeColors: Record<string, { base: string; accent: string }> = {
  normal: { base: "#A8A878", accent: "#D8D8C0" },
  fire: { base: "#F08030", accent: "#F5AC78" },
  water: { base: "#6890F0", accent: "#98D8D8" },
  electric: { base: "#F8D030", accent: "#FAE078" },
  grass: { base: "#78C850", accent: "#A7DB8D" },
  ice: { base: "#98D8D8", accent: "#C4F0F0" },
  fighting: { base: "#C03028", accent: "#D67873" },
  poison: { base: "#A040A0", accent: "#C183C1" },
  ground: { base: "#E0C068", accent: "#EBD69D" },
  flying: { base: "#A890F0", accent: "#C6B7F5" },
  psychic: { base: "#F85888", accent: "#FA92B2" },
  bug: { base: "#A8B820", accent: "#C6D16E" },
  rock: { base: "#B8A038", accent: "#D1C17D" },
  ghost: { base: "#705898", accent: "#A292BC" },
  dragon: { base: "#7038F8", accent: "#A27DFA" },
  dark: { base: "#705848", accent: "#A29288" },
  steel: { base: "#B8B8D0", accent: "#D1D1E0" },
  fairy: { base: "#EE99AC", accent: "#F4BDC9" },
  unknown: { base: "#777", accent: "#CCC" },
  shadow: { base: "#333", accent: "#555" },
};

const typeIcons: Record<string, string> = {
  normal: "🔘",
  fire: "🔥",
  water: "💧",
  electric: "⚡",
  grass: "🌿",
  ice: "❄️",
  fighting: "🥊",
  poison: "☠️",
  ground: "🌎",
  flying: "🕊️",
  psychic: "🔮",
  bug: "🐛",
  rock: "🪨",
  ghost: "👻",
  dragon: "🐉",
  dark: "🌑",
  steel: "⚙️",
  fairy: "🧚",
};

interface Props {
  pokemon: Pokemon;
}

const PokemonCard: React.FC<Props> = ({ pokemon }) => {
  const navigate = useNavigate();
  const primaryType = pokemon.types[0].type.name;
  const colors = typeColors[primaryType] || {
    base: "#777",
    accent: "#CCC",
  };

  const handleViewDetails = () => {
    navigate(`/pokemon/${pokemon.id}`);
  };

  return (
    <div
      className="relative rounded-2xl shadow-lg p-6 flex flex-col items-center space-y-4 transform transition-all duration-300 hover:scale-105"
      style={{
        background: `linear-gradient(135deg, ${colors.base}, ${colors.accent})`,
      }}
    >
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        <img
          src={pokemon.sprites.front_default || "/default.png"}
          alt=""
          className="w-full h-full object-cover opacity-10 filter blur-lg"
        />
      </div>

      <div className="relative z-10 text-sm font-semibold text-white bg-black bg-opacity-40 px-3 py-1 rounded-full">
        #{pokemon.id}
      </div>

      <div className="relative z-10 w-full flex items-center justify-center rounded-lg p-4">
        <img
          src={pokemon.sprites.front_default || "/default.png"}
          alt={pokemon.name}
          className="object-contain w-full h-auto max-w-[180px]"
        />
      </div>

      <h3 className="relative z-10 text-2xl capitalize font-bold text-white">
        {pokemon.name}
      </h3>

      <div className="relative z-10 flex space-x-2 mt-2">
        {pokemon.types.map((t) => {
          const tc = typeColors[t.type.name] || {
            accent: "#777",
          };
          return (
            <span
              key={t.type.name}
              className="flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold capitalize text-white"
              style={{ backgroundColor: tc.accent }}
            >
              <span>{typeIcons[t.type.name] ?? "❓"}</span>
              <span>{t.type.name}</span>
            </span>
          );
        })}
      </div>

      <button
        onClick={handleViewDetails}
        className="relative z-10 mt-auto bg-white text-gray-800 font-semibold px-6 py-3 rounded-full shadow-md hover:bg-gray-100 transition duration-200"
      >
        Ver detalles
      </button>
    </div>
  );
};

export default PokemonCard;
