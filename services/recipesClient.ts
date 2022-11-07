import { notionClient } from "./notionClient";
import type { PartialRecipe } from "types";

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
};
