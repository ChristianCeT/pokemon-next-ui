import { pokeApi } from "@/api";
import { Pokemon, PokemonListResponse } from "@/interfaces";

export const getPokemonInfo = async (nameOrId: string) => {
  try {
    const { data } = await pokeApi.get<Pokemon>(
      `/pokemon/${nameOrId.toLocaleLowerCase()}`
    );

    return {
      id: data.id,
      name: data.name,
      sprites: data.sprites,
    };
  } catch (error) {
    return null;
  }
};

interface isUpdate {
  update: boolean;
  range?: number;
}

interface isUpdate {
  update: boolean;
  range?: number;
}
