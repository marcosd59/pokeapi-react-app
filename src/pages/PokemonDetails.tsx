import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const typeGradients: Record<string, { primary: string; secondary: string }> = {
  fire: { primary: "#F08030", secondary: "#F5AC78" },
  water: { primary: "#6890F0", secondary: "#98D8D8" },
  grass: { primary: "#78C850", secondary: "#A7DB8D" },
  electric: { primary: "#F8D030", secondary: "#FAE078" },
  ice: { primary: "#98D8D8", secondary: "#C4F0F0" },
  fighting: { primary: "#C03028", secondary: "#D67873" },
  poison: { primary: "#A040A0", secondary: "#C183C1" },
  ground: { primary: "#E0C068", secondary: "#EBD69D" },
  flying: { primary: "#A890F0", secondary: "#C6B7F5" },
  psychic: { primary: "#F85888", secondary: "#FA92B2" },
  bug: { primary: "#A8B820", secondary: "#C6D16E" },
  rock: { primary: "#B8A038", secondary: "#D1C17D" },
  ghost: { primary: "#705898", secondary: "#A292BC" },
  dragon: { primary: "#7038F8", secondary: "#A27DFA" },
  dark: { primary: "#705848", secondary: "#A29288" },
  steel: { primary: "#B8B8D0", secondary: "#D1D1E0" },
  fairy: { primary: "#EE99AC", secondary: "#F4BDC9" },
  default: { primary: "#777777", secondary: "#CCCCCC" },
};

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  const bigint = parseInt(
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean,
    16
  );
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return [r, g, b];
}

function getBrightness([r, g, b]: [number, number, number]): number {
  return (r * 299 + g * 587 + b * 114) / 1000;
}

const PokemonDetails: React.FC = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState<any>(null);
  const [species, setSpecies] = useState<any>(null);

  useEffect(() => {
    if (!id) return;
    (async () => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await res.json();
      setPokemon(data);
      const spec = await fetch(data.species.url).then((r) => r.json());
      setSpecies(spec);
    })();
  }, [id]);

  if (!pokemon || !species) {
    return <div className="text-center p-8">Cargando...</div>;
  }

  const mainType = pokemon.types[0].type.name;
  const { primary, secondary } =
    typeGradients[mainType] || typeGradients.default;
  const [r1, g1, b1] = hexToRgb(primary);
  const [r2, g2, b2] = hexToRgb(secondary);
  const brightness =
    (getBrightness([r1, g1, b1]) + getBrightness([r2, g2, b2])) / 2;
  const isDark = brightness < 128;
  const textColorClass = isDark ? "text-white" : "text-black";
  const borderColorClass = isDark
    ? "border-white border-opacity-50"
    : "border-black border-opacity-20";
  const artwork =
    pokemon.sprites.other["official-artwork"].front_default ||
    pokemon.sprites.front_default;
  const flavor =
    species.flavor_text_entries
      .find((e: any) => e.language.name === "en")
      ?.flavor_text.replace(/\f/g, " ") || "";
  const genus = species.genera.find(
    (g: any) => g.language.name === "en"
  )?.genus;

  return (
    <div
      className={`relative max-w-4xl mx-auto p-6 mt-10 rounded-2xl shadow-xl overflow-hidden transform transition hover:scale-105 ${textColorClass}`}
      style={{
        background: `linear-gradient(135deg, ${primary}, ${secondary})`,
      }}
    >
      <img
        src={artwork}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-10 filter blur-lg"
      />
      <div className="relative z-10 space-y-6">
        <div className="flex flex-col items-center">
          <div className="bg-white bg-opacity-30 p-2 rounded-full mb-4">
            <img
              src={artwork}
              alt={pokemon.name}
              className="w-36 h-36 object-contain"
            />
          </div>
          <h2 className="text-4xl font-bold uppercase tracking-wide">
            {pokemon.name}
            {genus && (
              <span className="text-lg font-normal block mt-1">({genus})</span>
            )}
          </h2>
          <div className="flex space-x-2 mt-3">
            {pokemon.types.map((t: any) => (
              <span
                key={t.type.name}
                className="px-4 py-1 text-sm font-medium rounded-full bg-white bg-opacity-30 capitalize"
              >
                {t.type.name}
              </span>
            ))}
          </div>
        </div>
        <section>
          <h3
            className={`text-2xl font-semibold pb-1 mb-4 border-b ${borderColorClass}`}
          >
            Información general
          </h3>
          <div className="grid grid-cols-2 gap-4 text-base">
            <div>📏 Altura: {(pokemon.height / 10).toFixed(1)} m</div>
            <div>⚖️ Peso: {(pokemon.weight / 10).toFixed(1)} kg</div>
            <div>⭐ Exp. base: {pokemon.base_experience}</div>
            <div>🏡 Hábitat: {species.habitat?.name || "Desconocido"}</div>
          </div>
        </section>
        <section>
          <h3
            className={`text-2xl font-semibold pb-1 mb-4 border-b ${borderColorClass}`}
          >
            Descripción
          </h3>
          <p className="italic">{flavor}</p>
        </section>
        <section>
          <h3
            className={`text-2xl font-semibold pb-1 mb-4 border-b ${borderColorClass}`}
          >
            Estadísticas
          </h3>
          <div className="space-y-3">
            {pokemon.stats.map((stat: any) => {
              const pct = Math.round((stat.base_stat / 255) * 100);
              return (
                <div key={stat.stat.name}>
                  <div className="flex justify-between mb-1">
                    <span className="capitalize">{stat.stat.name}</span>
                    <span className="font-bold">{stat.base_stat}</span>
                  </div>
                  <div className="w-full bg-white bg-opacity-30 h-2 rounded-full">
                    <div
                      className="h-2 rounded-full bg-white"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        <section>
          <h3
            className={`text-2xl font-semibold pb-1 mb-4 border-b ${borderColorClass}`}
          >
            Habilidades
          </h3>
          <div className="flex flex-wrap gap-2">
            {pokemon.abilities.map((ab: any) => (
              <span
                key={ab.ability.name}
                className="px-3 py-1 text-sm rounded-full bg-white bg-opacity-30 capitalize"
              >
                {ab.ability.name}
              </span>
            ))}
          </div>
        </section>
        <section>
          <h3
            className={`text-2xl font-semibold pb-1 mb-4 border-b ${borderColorClass}`}
          >
            Movimientos
          </h3>
          <div className="flex flex-wrap gap-2">
            {pokemon.moves.slice(0, 10).map((mv: any) => (
              <span
                key={mv.move.name}
                className="px-3 py-1 text-sm rounded-full bg-white bg-opacity-30 capitalize"
              >
                {mv.move.name}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default PokemonDetails;
