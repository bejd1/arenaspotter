"use client";
import {
  addFavoriteArena,
  removeFavoriteArena,
  selectFavoriteArena,
} from "@/features/favorite/favoriteSlice";
import { AiFillStar } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

interface FavoriteBtnI {
  id: string | undefined;
  name: string | undefined;
  image: string | undefined;
  city: string;
  street: string;
  cost: number;
  people: number;
}

const FavoriteBtn = ({
  id,
  name,
  image,
  city,
  street,
  cost,
  people,
}: FavoriteBtnI) => {
  const favoriteArena = useSelector(selectFavoriteArena);
  const isFavorite = favoriteArena.find((f) => f.id === id);
  const dispatch = useDispatch();
  const handleAddField = (
    id: string | undefined,
    name: string | undefined,
    image: string | undefined,
    city: string,
    street: string,
    cost: number,
    people: number
  ) => {
    const newField = {
      id: id,
      name: name,
      image: image,
      city: city,
      street: street,
      cost: cost,
      people: people,
    };
    dispatch(addFavoriteArena(newField));
  };

  return (
    <div>
      <AiFillStar
        onClick={() => {
          if (isFavorite) {
            dispatch(removeFavoriteArena(id as string));
          } else {
            handleAddField(id, name, image, city, street, cost, people);
          }
        }}
        className={`text-2xl hover:text-red-600 z-10 ${
          isFavorite ? "text-red-600 hover:text-slate-200" : ""
        }`}
      />
    </div>
  );
};

export default FavoriteBtn;
