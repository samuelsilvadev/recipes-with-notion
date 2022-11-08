import {
  Box,
  Heading,
  ListItem,
  OrderedList,
  UnorderedList,
} from "@chakra-ui/react";
import type { GetStaticPaths, GetStaticProps } from "next";
import { recipesClient } from "services/recipesClient";
import type { DeepPartial, PartialRecipe, RecipeContent } from "types";
import { Footer } from "components/footer";

type RecipeProps = {
  recipe: RecipeContent & PartialRecipe;
};

export default function Recipe({ recipe }: RecipeProps) {
  return (
    <>
      <Box as="header" boxShadow="lg" padding="4">
        <Heading as="h1" size="4xl" title={recipe.title}>
          {recipe.title}
        </Heading>
      </Box>
      <Box as="main" mt="16" mb="28">
        <Box as="section" mb="5">
          <Heading as="h2" mb="4">
            Ingredients
          </Heading>
          <UnorderedList spacing="2">
            {recipe.ingredients.map((ingredient) => (
              <ListItem key={ingredient}>{ingredient}</ListItem>
            ))}
          </UnorderedList>
        </Box>
        <Box as="section">
          <Heading as="h2" mb="4">
            Preparation
          </Heading>
          <OrderedList spacing="2">
            {recipe.preparationSteps.map((step) => (
              <ListItem key={step}>{step}</ListItem>
            ))}
          </OrderedList>
        </Box>
      </Box>
      <Footer />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const recipes = await recipesClient.getPartialRecipes();
  const paths: { params: { id: string } }[] = recipes.map(({ id }) => ({
    params: { id },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  DeepPartial<RecipeProps>,
  { id: string }
> = async ({ params: { id } = {} }) => {
  const recipeTitle = id ? await recipesClient.getRecipeTitle(id) : null;
  const recipeContent = id ? await recipesClient.getRecipeContent(id) : null;

  if (!recipeTitle || !recipeContent) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      recipe: {
        id,
        title: recipeTitle,
        ...recipeContent,
      },
    },
    revalidate: 60,
  };
};
