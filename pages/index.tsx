import { Box, Heading, ListItem, UnorderedList } from "@chakra-ui/react";
import { Footer } from "components/footer";
import type { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { recipesClient } from "services/recipesClient";
import type { PartialRecipe } from "types";

type HomeProps = {
  recipes: PartialRecipe[];
};

export default function Home({ recipes }: HomeProps) {
  return (
    <>
      <Head>
        <title>Recipes</title>
        <meta name="description" content="List of Recipes in spanish" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box as="header" boxShadow="lg" padding="4">
        <Heading as="h1" size="4xl">
          Recipes
        </Heading>
      </Box>
      <Box as="main" mt="16">
        <UnorderedList spacing="3">
          {recipes.map(({ id, title }) => (
            <ListItem key={id}>
              <Link href={`/recipe/${id}`}>{title}</Link>
            </ListItem>
          ))}
        </UnorderedList>
      </Box>
      <Footer />
    </>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const recipes = await recipesClient.getPartialRecipes();

  return {
    props: {
      recipes,
    },
    revalidate: 60,
  };
};
