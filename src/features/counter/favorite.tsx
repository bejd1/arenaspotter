import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addFavoriteArena,
  removeFavoriteArena,
  selectFavoriteFootballFields,
} from "./favoriteSlice";

export function FavoriteD() {
  const dispatch = useDispatch();
  const favoriteArena = useSelector(selectFavoriteFootballFields);

  const handleAddField = () => {
    const newField = {
      id: "fd",
      name: "PIESSSSS",
      image: "PIES",
    };
    dispatch(addFavoriteArena(newField));
  };
  const handleAddField2 = () => {
    const newField = {
      id: "fdsfds",
      name: "PYSIA",
      image: "PIES",
    };
    dispatch(addFavoriteArena(newField));
  };

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="flex flex-row items-center gap-2 mb-2">
        <button
          className="border border-white py-2 px-4"
          onClick={handleAddField}
        >
          Dodaj ulubione boisko
        </button>
        <button
          className="border border-white py-2 px-4"
          onClick={handleAddField2}
        >
          Dodaj ulubione boisko
        </button>
      </div>
      <div>
        <h2>Ulubione boiska piłkarskie</h2>
        <ul>
          {favoriteArena.map((favArena, index) => (
            <li key={index}>
              <h3>{favArena.name}</h3>
              <p>ID: {favArena.id}</p>
              <button
                className="border border-white py-2 px-4"
                onClick={() => {
                  dispatch(removeFavoriteArena(favArena.id));
                }}
              >
                WYJEB MNIE
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
