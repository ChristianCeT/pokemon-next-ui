import { useState } from "react";

import { Layout } from "@/components/layouts";
import { Pokemon } from "@/interfaces";
import { getPokemonInfo, localFavorites } from "@/utils";
import { Button, Card, Container, Grid, Image, Text } from "@nextui-org/react";
import { GetStaticProps, NextPage, GetStaticPaths } from "next";

import confetti from "canvas-confetti";

interface Props {
  pokemon: Pokemon;
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
  const [isInFavorites, setIsInFavorites] = useState(
    localFavorites.existPokemonInFavorites(pokemon.id)
  );

  const onToggleFavorite = () => {
    localFavorites.toggleFavorite(pokemon.id);
    setIsInFavorites(!isInFavorites);
    if (isInFavorites) return;

    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 70,
      angle: -100,
      origin: {
        x: 1,
        y: 0,
      },
    });
  };

  return (
    <Layout title={pokemon.name}>
      <Grid.Container
        css={{
          marginTop: "5px",
        }}
        gap={2}
      >
        <Grid xs={12} sm={4}>
          <Card isHoverable css={{ padding: "30px" }}>
            <Card.Body>
              <Card.Image
                src={
                  pokemon.sprites.other?.dream_world.front_default ||
                  "/no-image.png"
                }
                alt={pokemon.name}
                width="100%"
                height={200}
              ></Card.Image>
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header
              css={{ display: "flex", justifyContent: "space-between" }}
            >
              <Text h1 transform="capitalize">
                {pokemon.name}
              </Text>
              <Button
                color="gradient"
                bordered={!isInFavorites}
                onPress={onToggleFavorite}
              >
                {isInFavorites ? "En favoritos" : "Agregar a favoritos"}
              </Button>
            </Card.Header>
            <Card.Body>
              <Text size={30}>Sprites:</Text>
              <Container direction="row" display="flex">
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  //crear un arreglo del 1 al 151
  const pokemons151 = [...Array(151)].map((value, index) => `${index + 1}`);

  return {
    /* paths: [
      {
        params: {
          id: "1",
        },
      },
    ], */
    paths: pokemons151.map((id) => ({
      params: { id },
    })),
    /* fallback: false, */
    fallback: "blocking",
  };
};

//Se ejecuta luego del staticPaths
export const getStaticProps: GetStaticProps = async ({ params }) => {
  //inferir el tipo de params
  const { id } = params as { id: string };
  const pokemon = await getPokemonInfo(id);

  if (!pokemon) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      pokemon,
    },
    //revalidar cada 24 horas 60 * 60 * 24
    revalidate: 86400,
  };
};

export default PokemonPage;
