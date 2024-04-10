import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

export type PostT = {
  id: string;
  name: string;
  image: string;
};

interface CounterState {
  value: number;
  favoriteArena: PostT[];
}

const initialState: CounterState = {
  value: 0,
  favoriteArena: [],
};

export const counterSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addFavoriteArena: (state, action: PayloadAction<PostT>) => {
      const existingIndex = state.favoriteArena.findIndex(
        (field) => field.id === action.payload.id
      );
      if (existingIndex === -1) {
        state.favoriteArena.push(action.payload);
      }
    },
    removeFavoriteArena: (state, action: PayloadAction<string>) => {
      state.favoriteArena = state.favoriteArena.filter(
        (field) => field.id !== action.payload
      );
    },
  },
});

export const { addFavoriteArena, removeFavoriteArena } = counterSlice.actions;

export const selectCount = (state: RootState) => state.counter.value;
export const selectFavoriteFootballFields = (state: RootState) =>
  state.counter.favoriteArena;

export default counterSlice.reducer;
