import type { Recipe, RawRecipe, Ingredients, RecipeStation } from 'src/types/recipes.type';
import type { ItemsRepository } from './items_repository';
import type { RecipesDataRepository } from './recipe_data_repository';
import type { Writable, Readable, Unsubscriber } from 'svelte/types/runtime/store';
import { writable, derived, get } from 'svelte/store';
import type { Item } from 'src/types/item.type';
import type { StationsRepository } from './stations_repository';
import type { StationsData } from 'src/types/stations.type';
import type { StationDataRepository } from './stations_data_repository';

export class ItemRecipeRepository {
	constructor(
		itemId: number,
		recipes: RawRecipe[],
		itemsRepository: ItemsRepository,
		stationRepository: StationsRepository,
		stationDataRepository: StationDataRepository
	) {
		this.currentPage = writable<number>(1);
		this.recipeList = derived(
			[itemsRepository.itemsStore, stationRepository.stationProgress, stationDataRepository.store],
			([$itemsStore, $stationProgress, $stationStore]) => {
				if (
					$itemsStore == undefined ||
					$stationProgress == undefined ||
					$stationStore == undefined
				) {
					return [];
				}
				const newRecipes: Recipe[] = [];
				for (const recipe of recipes) {
					const newIngredients: Ingredients[] = [];
					const recipeStation: RecipeStation = {
						id: recipe.station,
						name: $stationStore[recipe.station].name,
						imageUrl: $stationStore[recipe.station].imageUrl,
						item_progress: $stationProgress[recipe.station].progress,
						research: $stationProgress[recipe.station].research,
						easy: $stationProgress[recipe.station].easy,
						special: $stationProgress[recipe.station].special
					};
					for (const ingredient of recipe.ingredients) {
						const item = $itemsStore[ingredient.id];
						console.log(item.id);
						console.log(item.imageUrl);
						newIngredients.push({
							amount: ingredient.amount,
							id: ingredient.id,
							name: ingredient.name,
							imageUrl: item?.imageUrl,
							item_progress: item.item_progress,
							research: item.research,
							easy: item.easy
						});
					}
					const newRecipe: Recipe = {
						id: recipe.id,
						name: recipe.name,
						station: recipeStation,
						ingredients: newIngredients
					};
					newRecipes.push(newRecipe);
				}
				return newRecipes;
			}
		);
		this.maxPage = derived(this.recipeList, ($recipeList) => {
			return $recipeList.length;
		});
		this.displayedRecipe = derived(
			[this.recipeList, this.currentPage],
			([$recipeList, $currentPage]) => {
				return $recipeList[$currentPage - 1];
			}
		);
		this.displayedIngredients = derived(this.displayedRecipe, ($displayedRecipe) => {
			return $displayedRecipe.ingredients;
		});
		this.displayedStation = derived(this.displayedRecipe, ($displayedRecipe) => {
			return $displayedRecipe.station;
		});
	}
	public currentPage: Writable<number>;
	public recipeList: Readable<Recipe[]>;
	public maxPage: Readable<number>;
	public displayedRecipe: Readable<Recipe>;
	public displayedIngredients: Readable<Ingredients[]>;
	public displayedStation: Readable<RecipeStation>;

	public previousPage = () => {
		const currentPage = get(this.currentPage);
		if (currentPage == 1) {
			return;
		}
		this.currentPage.set(currentPage - 1);
	};
	public nextPage = () => {
		const currentPage = get(this.currentPage);
		if (currentPage >= get(this.maxPage)) {
			return;
		}
		this.currentPage.set(currentPage + 1);
	};
}

export class RecipesRepository {
	constructor(
		private itemsRepository: ItemsRepository,
		private stationsRepository: StationsRepository,
		private stationDataRepository: StationDataRepository,
		private recipesRepository: RecipesDataRepository
	) {
		this.itemsRecipesStore = derived(
			[this.itemsRepository.itemsStore, this.recipesRepository.store],
			([$itemsStore, $recipesStore]) => {
				if (!this.hasCreatedRecipes && $recipesStore) {
					this.itemRecipes = this.setupRecipes($itemsStore, $recipesStore);
					this.itemsRecipesStore = undefined;
					this.itemsRecipesSubscription();
				}
			}
		);
		this.itemsRecipesSubscription = this.itemsRecipesStore.subscribe((_) => 0);
	}
	private hasCreatedRecipes = false;
	private itemsRecipesStore: Readable<undefined> | undefined;
	private itemsRecipesSubscription: Unsubscriber;

	public itemRecipes: Record<number, ItemRecipeRepository> | undefined;

	private setupItemRecipes(
		itemId: number,
		recipes: RawRecipe[],
		itemsRepository: ItemsRepository,
		itemRecipesRepositories: Record<number, ItemRecipeRepository>,
		stationsRepository: StationsRepository,
		stationDataRepository: StationDataRepository
	) {
		const r = new ItemRecipeRepository(
			itemId,
			recipes,
			itemsRepository,
			stationsRepository,
			stationDataRepository
		);
		itemRecipesRepositories[itemId] = r;
	}

	private setupRecipes(
		itemsStore: Record<number, Item> | undefined,
		recipesStore: Record<number, RawRecipe[]>
	) {
		const itemRecipesRepositories: Record<number, ItemRecipeRepository> = {};
		if (itemsStore == undefined || recipesStore == undefined) {
			return undefined;
		}
		this.hasCreatedRecipes = true;
		for (const key of Object.keys(recipesStore)) {
			const newKey = +key;
			this.setupItemRecipes(
				newKey,
				recipesStore[newKey],
				this.itemsRepository,
				itemRecipesRepositories,
				this.stationsRepository,
				this.stationDataRepository
			);
		}
		return itemRecipesRepositories;
	}
}
