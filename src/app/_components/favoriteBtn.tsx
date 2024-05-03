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
  city: string | undefined;
  street: string | undefined;
  cost: number | undefined;
  people: number | undefined;
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
    city: string | undefined,
    street: string | undefined,
    cost: number | undefined,
    people: number | undefined
  ) => {
    const newField = {
      id: id as string,
      name: name as string,
      image: image as string,
      city: city as string,
      street: street as string,
      cost: cost as number,
      people: people as number,
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
