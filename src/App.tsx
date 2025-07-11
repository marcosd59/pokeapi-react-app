import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import PokemonDetails from "./pages/PokemonDetails";

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 text-gray-900">
        <header className="bg-gradient-to-t bg-red-600 shadow-lg py-4 mb-8 border-b-4 border-black">
          <div className="container mx-auto flex items-center justify-between px-4">
            <div>
              <Link
                to="/"
                className="text-white text-lg font-semibold hover:text-gray-200 transition-colors cursor-pointer"
              >
                Marcos Damián Pool Canul
              </Link>
            </div>
            <div className="text-white text-sm text-right">
              <h1 className="text-2xl font-bold">PokéAPI React App</h1>
              <p className="text-white">
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
