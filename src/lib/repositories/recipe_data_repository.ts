import type { RecipesData } from 'src/types/recipes.type';
import type { Writable } from 'svelte/types/runtime/store';

import { fetchRecipes } from '../services/api_service';
import { writable } from 'svelte/store';

export class RecipesDataRepository {
	constructor() {
		this.store = writable<RecipesData | undefined>(undefined);
	}
	public store: Writable<RecipesData | undefined>;
	async refreshRecipes() {
		const recipes = await fetchRecipes();
		this.store.set(recipes);
		return this.store;
	}
}
