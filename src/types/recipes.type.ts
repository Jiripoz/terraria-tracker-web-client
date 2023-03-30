export type RawRecipe = {
	id: number;
	name: string;
	station: number;
	ingredients: IngredientsData[];
};

export type RecipeStation = {
	id: number;
	name: string;
	imageUrl: string;
	item_progress: number;
	research: number;
	easy: boolean;
	special: boolean;
};

export type IngredientsData = {
	amount: number;
	id: number;
	name: string;
};

export type Ingredients = IngredientsData & {
	imageUrl: string;
	item_progress: number;
	research: number;
	easy: boolean;
};
export type Recipe = {
	id: number;
	name: string;
	station: RecipeStation;
	ingredients: Ingredients[];
};
export type RecipesData = Record<number, RawRecipe[]>;
