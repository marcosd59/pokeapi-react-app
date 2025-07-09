import React from "react";
import Home from "./pages/Home";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow py-4 mb-8">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          PokéAPI React App
        </h1>
        <p className="text-center text-gray-600">
          Busca y explora tus Pokémon favoritos
        </p>
      </header>
      <main>
        <Home />
      </main>
      <footer className="text-centers py-4 text-gray-400 text-sm mt-8">
        © {new Date().getFullYear()} PokéAPI Demo — Clever Cloud
      </footer>
    </div>
  );
};

export default App;
