import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPokemons } from "../../api/pokeapi";
import type { Pokemon } from "../../types/pokemon";

export const getPokemons = createAsyncThunk(
  "pokemon/getPokemons",
  async ({ page, search }: { page: number; search: string }) => {
    return fetchPokemons(page, search);
  }
);

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: {
    pokemons: [] as Pokemon[],
    loading: false,
    error: null as string | null,
    page: 1,
    search: "",
  },
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPokemons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPokemons.fulfilled, (state, action) => {
        state.loading = false;
        state.pokemons = action.payload;
      })
      .addCase(getPokemons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error";
      });
  },
});

export const { setPage, setSearch } = pokemonSlice.actions;
export default pokemonSlice.reducer;
