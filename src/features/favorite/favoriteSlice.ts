import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

export type favoriteT = {
  id: string | undefined;
  name: string | undefined;
  image: string | undefined;
  city: string;
  street: string;
  cost: number;
  people: number;
};

interface favoriteSlice {
  value: number;
  favoriteArena: favoriteT[];
}

const loadFavoriteArenaFromLocalStorage = (): favoriteT[] => {
  if (typeof window !== "undefined" && window.localStorage) {
    const storedData = window.localStorage.getItem("favoriteArena");
    return storedData ? JSON.parse(storedData) : [];
  }
  return [];
};

const initialState: favoriteSlice = {
  value: 0,
  favoriteArena: loadFavoriteArenaFromLocalStorage(),
};

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addFavoriteArena: (state, action: PayloadAction<favoriteT>) => {
      const existingIndex = state.favoriteArena.findIndex(
        (field) => field.id === action.payload.id
      );
      if (existingIndex === -1) {
        state.favoriteArena.push(action.payload);
        if (typeof window !== "undefined" && window.localStorage) {
          localStorage.setItem(
            "favoriteArena",
            JSON.stringify(state.favoriteArena)
          );
        }
      }
    },
    removeFavoriteArena: (state, action: PayloadAction<string>) => {
      state.favoriteArena = state.favoriteArena.filter(
        (field) => field.id !== action.payload
      );
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem(
          "favoriteArena",
          JSON.stringify(state.favoriteArena)
        );
      }
    },
  },
});

export const { addFavoriteArena, removeFavoriteArena } = favoriteSlice.actions;

export const selectFavorite = (state: RootState) => state.counter.value;
export const selectFavoriteArena = (state: RootState) =>
  state.counter.favoriteArena;

export default favoriteSlice.reducer;
