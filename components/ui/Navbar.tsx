import { Navbar as NavbarNUi, Text, useTheme, Link } from "@nextui-org/react";
import Image from "next/image";
import NextLink from "next/link";

export const Navbar = () => {
  const { theme } = useTheme();

  return (
    <NavbarNUi
      maxWidth="fluid"
      containerCss={{
        paddingLeft: "0px",
      }}
      css={{ backgroundColor: theme?.colors.gray200.value }}
    >
      <NextLink href="/">
        <NavbarNUi.Brand
          css={{
            cursor: "pointer",
          }}
        >
          <Image
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
            alt="icono de la app"
            width={70}
            height={70}
            priority
          />
          <Text color="white" h2>
            P
          </Text>
          <Text color="white" h3>
            okemón
          </Text>
        </NavbarNUi.Brand>
      </NextLink>

      <NextLink href="/favorites">
        <NavbarNUi.Content>
          <Text color="white">Favoritos</Text>
        </NavbarNUi.Content>
      </NextLink>
    </NavbarNUi>
  );
};
