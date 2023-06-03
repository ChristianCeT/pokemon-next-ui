import React, { useEffect, useState } from "react";
import { Layout } from "@/components/layouts";
import { FavoritePokemons, NoFavorites } from "@/components/ui";
import { localFavorites } from "@/utils";

const Favorites = () => {
  const [favoritePokemons, setFavoritePokemons] = useState<number[]>([]);

  useEffect(() => {
    setFavoritePokemons(localFavorites.pokemons());
  }, []);

  return (
    <Layout title="Pokemons - favoritos">
      {favoritePokemons.length === 0 ? (
        <NoFavorites />
      ) : (
        <FavoritePokemons
          favoritePokemons={favoritePokemons}
        ></FavoritePokemons>
      )}
    </Layout>
  );
};

export default Favorites;
