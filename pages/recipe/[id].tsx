import type { GetStaticPaths, GetStaticProps } from "next";
import { recipesClient } from "services/recipesClient";
import type { DeepPartial, PartialRecipe, RecipeContent } from "types";

type RecipeProps = {
  recipe: RecipeContent & PartialRecipe;
};

export default function Recipe({ recipe }: RecipeProps) {
  return (
    <>
      <h1>Recipe Details - {recipe.title}</h1>
      <section>
        <h2>Ingredients</h2>
        <ul>
          {recipe.ingredients.map((ingredient) => (
            <li key={ingredient}>{ingredient}</li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Preparation</h2>
        <ul>
          {recipe.preparationSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ul>
      </section>
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
  };
};
