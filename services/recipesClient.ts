import { notionClient } from "./notionClient";
import type {
  GetRecipePageResponse,
  PartialRecipe,
  RecipeContent,
} from "types";

export const recipesClient = {
  getPartialRecipes: async () => {
    let recipes: PartialRecipe[] = [];

    try {
      const response = await notionClient.blocks.children.list({
        block_id: process.env.PAGE_ID,
      });

      response.results.forEach((block) => {
        if ("child_page" in block) {
          recipes.push({ title: block.child_page.title, id: block.id });
        }
      });
    } catch (error: unknown) {
      console.error(
        "Something went wrong fetching the list of recipes titles",
        error
      );
    }

    return recipes;
  },
  getRecipeTitle: async (id: string) => {
    let title: string | null = null;

    try {
      const response = await notionClient.pages.retrieve({
        page_id: id,
      });
      const safeResponse = response as unknown as GetRecipePageResponse;
      title = safeResponse.properties?.title?.title?.[0].plain_text ?? null;
    } catch (error: unknown) {
      console.error(
        "Something went wrong fetching the page with id " + id,
        error
      );
    }

    return title;
  },
  getRecipeContent: async (id: string) => {
    let recipe: RecipeContent | null = null;

    try {
      const response = await notionClient.blocks.children.list({
        block_id: id,
      });

      recipe = {
        ingredients: [],
        preparationSteps: [],
      };

      response.results.forEach((block) => {
        if (!("type" in block)) {
          return;
        }

        if (block.type === "bulleted_list_item") {
          recipe?.ingredients.push(
            block.bulleted_list_item.rich_text[0].plain_text
          );
        }

        if (block.type === "numbered_list_item") {
          recipe?.preparationSteps.push(
            block.numbered_list_item.rich_text[0].plain_text
          );
        }
      });
    } catch (error: unknown) {
      console.error(
        "Something went wrong fetching the page with id " + id,
        error
      );
    }

    return recipe;
  },
};
