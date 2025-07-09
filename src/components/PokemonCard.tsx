import React from "react";
import type { Pokemon } from "../types/pokemon";

interface Props {
  pokemon: Pokemon;
}

const PokemonCard: React.FC<Props> = ({ pokemon }) => (
  <div className="border rounded p-4 flex flex-col items-center">
    <img src={pokemon.sprites.front_default} alt={pokemon.name} />
    <h3 className="capitalize">{pokemon.name}</h3>
    <p className="text-gray-500">ID: {pokemon.id}</p>
    <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
      Ver Detalles
    </button>
  </div>
);

export default PokemonCard;
