export type DeepPartial<Object> = Partial<{
  [Key in keyof Object]: DeepPartial<Object[Key]>;
}>;

export type PartialRecipe = {
  id: string;
  title: string;
};

export type GetRecipePageResponse = {
  properties?: {
    title?: {
      title?: [
        {
          plain_text: string;
        }
      ];
    };
  };
};

export type RecipeContent = {
  ingredients: string[];
  preparationSteps: string[];
};
