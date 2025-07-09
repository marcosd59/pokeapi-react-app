import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "./features/pokemon/pokemonSlice";
import pokemonNamesReducer from './features/pokemon/pokemonNamesSlice';

export const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    pokemonNames: pokemonNamesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
