import { writable } from 'svelte/store';
import type { ServerConfig } from '../../types/server_config.type';
import type { OverviewHighlights } from 'src/types/overview.type';
import type { ItemProgress } from 'src/types/items_progress.type';
import type { ItemDataResponse } from 'src/types/item_data.type';
import type { Item } from 'src/types/item.type';

import { OverviewRepository } from '$lib/repositories/overview_repository';
import { ItemsProgressRepository } from '$lib/repositories/items_progress_repository';
import { ItemsDataRepository } from '$lib/repositories/items_data_repository';
import { ItemsRepository } from '$lib/repositories/items_repository';

export const configApiDataStore = writable<ServerConfig | undefined>(undefined);
export const overviewStore = writable<OverviewHighlights | undefined>(undefined);
export const itemProgressStore = writable<ItemProgress | undefined>(undefined);
export const itemsDataStore = writable<ItemDataResponse | undefined>(undefined);
export const itemsStore = writable<Item[] | undefined>(undefined);

export const setupDependencies = () => {
	const overviewRepository = new OverviewRepository(overviewStore);
	overviewRepository.refreshOverview();

	const itemProgressRepository = new ItemsProgressRepository(itemProgressStore);
	itemProgressRepository.refreshItemsProgress();

	const itemsDataRepository = new ItemsDataRepository(itemsDataStore);
	itemsDataRepository.refreshItems();

	const itemsRepository = new ItemsRepository(itemsStore, itemsDataStore, itemProgressStore);

	(<any>window).dependencies = {
		overviewRepository: overviewRepository,
		itemProgressRepository: itemProgressRepository,
		itemsDataRepository: itemsDataRepository,
		itemsRepository: itemsRepository
	};
};
