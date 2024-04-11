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
}

const FavoriteBtn = ({ id, name, image }: FavoriteBtnI) => {
  const favoriteArena = useSelector(selectFavoriteArena);
  const isFavorite = favoriteArena.find((f) => f.id === id);
  const dispatch = useDispatch();
  const handleAddField = (
    id: string | undefined,
    name: string | undefined,
    image: string | undefined
  ) => {
    const newField = {
      id: id,
      name: name,
      image: image,
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
            handleAddField(id, name, image);
          }
        }}
        className={`text-2xl hover:text-red-600 z-10 ${
          isFavorite ? "text-red-600" : ""
        }`}
      />
    </div>
  );
};

export default FavoriteBtn;
