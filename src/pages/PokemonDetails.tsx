import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PokemonDetails: React.FC = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState<any>(null);

  useEffect(() => {
    if (id) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((res) => res.json())
        .then((data) => setPokemon(data))
        .catch((error) =>
          console.error("Error fetching Pokémon details:", error)
        );
    }
  }, [id]);

  if (!pokemon) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="text-center">
        <h2 className="text-3xl font-bold">{pokemon.name}</h2>
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="w-48 h-48 mx-auto"
        />
      </div>

      <div className="mt-4">
        <h3 className="text-xl font-semibold">Types</h3>
        <ul className="list-disc pl-6">
          {pokemon.types.map((t: any) => (
            <li key={t.type.name}>{t.type.name}</li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <h3 className="text-xl font-semibold">Statistics</h3>
        <table className="min-w-full mt-2">
          <thead>
            <tr>
              <th className="px-4 py-2">Stat</th>
              <th className="px-4 py-2">Value</th>
            </tr>
          </thead>
          <tbody>
            {pokemon.stats.map((stat: any) => (
              <tr key={stat.stat.name}>
                <td className="px-4 py-2 capitalize">{stat.stat.name}</td>
                <td className="px-4 py-2">{stat.base_stat}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        <h3 className="text-xl font-semibold">Abilities</h3>
        <ul className="list-disc pl-6">
          {pokemon.abilities.map((ability: any) => (
            <li key={ability.ability.name}>{ability.ability.name}</li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <h3 className="text-xl font-semibold">Moves</h3>
        <ul className="list-disc pl-6">
          {pokemon.moves.slice(0, 10).map(
            (
              move: any
            ) => (
              <li key={move.move.name}>{move.move.name}</li>
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default PokemonDetails;
