import type { ServerConfig } from '../../types/server_config.type';

import { writable } from 'svelte/store';
import { OverviewRepository } from '$lib/repositories/overview_repository';
import { ItemsProgressRepository } from '$lib/repositories/items_progress_repository';
import { ItemsDataRepository } from '$lib/repositories/items_data_repository';
import { ItemsRepository } from '$lib/repositories/items_repository';
import { StationsRepository } from '$lib/repositories/stations_repository';
import { DisplayedItemsRepository } from '$lib/repositories/displayed_station_items_repository';

export const configApiDataStore = writable<ServerConfig | undefined>(undefined);

export const itemsDataRepository = new ItemsDataRepository();

export const stationsRepository = new StationsRepository();
export const itemProgressRepository = new ItemsProgressRepository();
export const overviewRepository = new OverviewRepository();
export const itemsRepository = new ItemsRepository(itemsDataRepository, itemProgressRepository);
export const displayStationItemsRepository = new DisplayedItemsRepository();

const dependencies: Record<string, unknown> = {
	overviewRepository: overviewRepository,
	itemProgressRepository: itemProgressRepository,
	itemsDataRepository: itemsDataRepository,
	itemsRepository: itemsRepository
};

export const setupDependencies = () => {
	overviewRepository.start();
	itemProgressRepository.refreshItemsProgress();
	itemsDataRepository.refreshItems().then(() =>
		stationsRepository
			.refreshStations(itemsRepository)
			.then(() => stationsRepository.generateStationsPagination())
			.then(() => displayStationItemsRepository.firstdisplay(stationsRepository))
	);
	console.log('getbyid!', displayStationItemsRepository.get_by_id(0));
	(<any>window).dependencies = dependencies;
};
