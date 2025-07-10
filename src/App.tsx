import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PokemonDetails from "./pages/PokemonDetails";

const App: React.FC = () => {
  return (
    <Router>
      <div
        className="min-h-screen"
        style={{ background: "radial-gradient(#ffbf0b, #e20000)" }}
      >
        <header className="bg-gradient-to-t from-white to-white shadow-lg py-4 mb-8 border-b-4 border-black">
          <div className="container mx-auto flex items-center justify-between px-4">
            <div>
              <div className="text-black text-lg font-semibold">
                Marcos Pool Canul
              </div>
            </div>
            <div className="text-black text-sm text-right">
              <h1 className="text-2xl font-bold">PokéAPI React App</h1>
              <p className="text-black">
                Busca y explora tus Pokémon favoritos
              </p>
            </div>
          </div>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pokemon/:id" element={<PokemonDetails />} />
          </Routes>
        </main>

        <footer className="text-center py-4 text-white text-sm mt-8">
          © {new Date().getFullYear()} PokéAPI Demo
        </footer>
      </div>
    </Router>
  );
};

export default App;
