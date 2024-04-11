import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

export type PostT = {
  id: string | undefined;
  name: string | undefined;
  image: string | undefined;
};

interface favoriteSlice {
  value: number;
  favoriteArena: PostT[];
}

const loadFavoriteArenaFromLocalStorage = (): PostT[] => {
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
    addFavoriteArena: (state, action: PayloadAction<PostT>) => {
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
