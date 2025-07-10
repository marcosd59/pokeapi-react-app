import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const typeColors: Record<string, string> = {
  fire: "bg-red-200 text-red-800",
  water: "bg-blue-200 text-blue-800",
  grass: "bg-green-200 text-green-800",
  electric: "bg-yellow-200 text-yellow-800",
  ice: "bg-cyan-200 text-cyan-800",
  fighting: "bg-purple-200 text-purple-800",
  poison: "bg-pink-200 text-pink-800",
  ground: "bg-brown-200 text-brown-800",
  flying: "bg-gray-200 text-gray-800",
  psychic: "bg-pink-200 text-pink-800",
  bug: "bg-green-200 text-green-800",
  rock: "bg-yellow-200 text-yellow-800",
  ghost: "bg-purple-200 text-purple-800",
  dragon: "bg-blue-200 text-blue-800",
  dark: "bg-gray-800 text-white",
  steel: "bg-gray-300 text-gray-800",
  fairy: "bg-pink-200 text-pink-800",
};

const PokemonDetails: React.FC = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState<any>(null);
  const [species, setSpecies] = useState<any>(null);

  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
          const data = await res.json();
          setPokemon(data);
          const specRes = await fetch(data.species.url);
          const specData = await specRes.json();
          setSpecies(specData);
        } catch {
          console.error("Error fetching Pokémon details");
        }
      })();
    }
  }, [id]);

  if (!pokemon || !species)
    return <div className="text-center p-8">Cargando...</div>;

  const flavorEntry =
    species.flavor_text_entries
      .find((e: any) => e.language.name === "en")
      ?.flavor_text.replace(/\f/g, " ") ?? "";
  const genus = species.genera.find(
    (g: any) => g.language.name === "en"
  )?.genus;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="flex flex-col items-center mb-6">
        <img
          src={
            pokemon.sprites.other["official-artwork"].front_default ||
            pokemon.sprites.front_default
          }
          alt={pokemon.name}
          className="w-32 h-32 mb-4"
        />
        <h2 className="text-2xl font-bold capitalize">
          {pokemon.name}
          {genus && <span className="text-lg text-gray-500"> ({genus})</span>}
        </h2>
        <div className="flex space-x-2 mt-2">
          {pokemon.types.map((t: any) => (
            <span
              key={t.type.name}
              className={`px-3 py-1 text-sm font-medium rounded-full ${
                typeColors[t.type.name] || "bg-gray-200 text-gray-800"
              }`}
            >
              {t.type.name}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Información general</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>Altura: {(pokemon.height / 10).toFixed(1)} m</div>
          <div>Peso: {(pokemon.weight / 10).toFixed(1)} kg</div>
          <div>Exp. base: {pokemon.base_experience}</div>
          <div>Hábitat: {species.habitat?.name || "Desconocido"}</div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Descripción</h3>
        <p className="text-gray-700">{flavorEntry}</p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Estadísticas</h3>
        <div className="grid grid-cols-2 gap-4">
          {pokemon.stats.map((stat: any) => (
            <div
              key={stat.stat.name}
              className="flex justify-between items-center"
            >
              <span className="capitalize">{stat.stat.name}</span>
              <span className="font-bold">{stat.base_stat}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Habilidades</h3>
        <div className="flex flex-wrap gap-2">
          {pokemon.abilities.map((ability: any) => (
            <span
              key={ability.ability.name}
              className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full"
            >
              {ability.ability.name}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Movimientos</h3>
        <div className="flex flex-wrap gap-2">
          {pokemon.moves.slice(0, 10).map((move: any) => (
            <span
              key={move.move.name}
              className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full capitalize"
            >
              {move.move.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;
