import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPokemonNames = createAsyncThunk(
  "pokemonNames/fetchPokemonNames",
  async () => {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=2000");
    const data = await res.json();
    return data.results.map((poke: any) => poke.name);
  }
);

const pokemonNamesSlice = createSlice({
  name: "pokemonNames",
  initialState: {
    names: [] as string[],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemonNames.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPokemonNames.fulfilled, (state, action) => {
        state.loading = false;
        state.names = action.payload;
      })
      .addCase(fetchPokemonNames.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error al cargar nombres";
      });
  },
});

export default pokemonNamesSlice.reducer;
