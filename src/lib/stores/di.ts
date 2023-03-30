import type { ServerConfig } from '../../types/server_config.type';

import { writable } from 'svelte/store';
import { OverviewRepository } from '$lib/repositories/overview_repository';
import { ItemsProgressRepository } from '$lib/repositories/items_progress_repository';
import { ItemsDataRepository } from '$lib/repositories/items_data_repository';
import { ItemsRepository } from '$lib/repositories/items_repository';
import { StationsRepository } from '$lib/repositories/stations_repository';
import { StationDataRepository } from '$lib/repositories/stations_data_repository';
import { RecipesRepository } from '$lib/repositories/recipes_repository';
import { RecipesDataRepository } from '$lib/repositories/recipe_data_repository';

export const configApiDataStore = writable<ServerConfig | undefined>(undefined);

export const itemsDataRepository = new ItemsDataRepository();
export const stationDataRepository = new StationDataRepository();
export const recipesDataRepository = new RecipesDataRepository();

export const itemProgressRepository = new ItemsProgressRepository();
export const overviewRepository = new OverviewRepository();
export const itemsRepository = new ItemsRepository(itemsDataRepository, itemProgressRepository);
export const stationsRepository = new StationsRepository(itemsRepository, stationDataRepository);
export const recipesRepository = new RecipesRepository(
	itemsRepository,
	stationsRepository,
	stationDataRepository,
	recipesDataRepository
);

const dependencies: Record<string, unknown> = {
	overviewRepository: overviewRepository,
	itemProgressRepository: itemProgressRepository,
	itemsDataRepository: itemsDataRepository,
	itemsRepository: itemsRepository,
	stationDataRepository: stationDataRepository,
	stationsRepository: stationsRepository,
	recipesDataRepository: recipesDataRepository,
	recipesRepository: recipesRepository
};

export const setupDependencies = async () => {
	overviewRepository.start();
	itemProgressRepository.refreshItemsProgress();
	stationDataRepository.refreshStations();
	itemsDataRepository.refreshItems();
	recipesDataRepository.refreshRecipes();

	(<any>window).dependencies = dependencies;
};
