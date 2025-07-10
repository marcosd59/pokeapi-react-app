import React from "react";
import { useNavigate } from "react-router-dom";
import type { Pokemon } from "../types/pokemon";

const typeColor = (type: string) => `bg-${type}-500`;

const typeIcons: Record<string, string> = {
  normal: "⚪",
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
  fairy: "✨",
};

interface Props {
  pokemon: Pokemon;
}

const PokemonCard: React.FC<Props> = ({ pokemon }) => {
  const navigate = useNavigate();

  const mainType = pokemon.types[0].type.name;

  const handleViewDetails = () => {
    navigate(`/pokemon/${pokemon.id}`);
  };

  return (
    <div className="relative rounded-2xl shadow-md bg-white p-6 flex flex-col items-center space-y-4">
      <div className="absolute top-2 left-2 bg-black bg-opacity-40 px-3 py-1 rounded-full text-sm font-semibold text-white">
        #{pokemon.id}
      </div>

      {/* Recuadro gris que ocupa todo el espacio horizontal */}
      <div className="w-full bg-gray-200 flex items-center justify-center rounded-lg p-4">
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="object-contain w-full h-auto max-w-[200px]"
        />
      </div>

      <h3 className="mt-2 text-2xl capitalize font-bold text-gray-800">
        {pokemon.name}
      </h3>

      <div className="flex space-x-2 mt-3">
        {pokemon.types.map((t) => (
          <span
            key={t.type.name}
            className="flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold capitalize bg-white bg-opacity-80 text-gray-800 border border-gray-300"
          >
            <span>{typeIcons[t.type.name] ?? "❓"}</span>
            <span>{t.type.name}</span>
          </span>
        ))}
      </div>

      <button
        onClick={handleViewDetails}
        className="mt-auto bg-blue-500 text-white font-semibold px-6 py-3 rounded-full shadow-md hover:bg-blue-600 transition duration-200"
      >
        Ver detalles
      </button>
    </div>
  );
};

export default PokemonCard;
