import { writable } from 'svelte/store';
import type { ServerConfig } from '../../types/server_config.type';
import type { OverviewHighlights } from 'src/types/overview.type';
import type { ItemsProgress } from 'src/types/items_progress.type';
import type { Item } from 'src/types/item.type';

import { OverviewRepository } from '$lib/repositories/overview_repository';
import { ItemsProgressRepository } from '$lib/repositories/items_progress_repository';
import { ItemsRepository } from '$lib/repositories/items_repository';

export const configApiDataStore = writable<ServerConfig | undefined>(undefined);
export const overviewStore = writable<OverviewHighlights | undefined>(undefined);
export const itemProgressStore = writable<ItemsProgress | undefined>(undefined);
export const itemsStore = writable<Item[] | undefined>(undefined);

export const setupDependencies = () => {
    const overviewRepositories = new OverviewRepository(overviewStore);
    overviewRepositories.refreshOverview();

    const itemProgressRepositories = new ItemsProgressRepository(itemProgressStore);
    itemProgressRepositories.refreshItemsProgress();

    const itemsRepositories = new ItemsRepository(itemsStore);
    itemsRepositories.refreshItems();

    (<any>window).dependencies = {
        "overviewRepositories": overviewRepositories,
        "itemProgressRepositories": itemProgressRepositories,
        "itemsRepositories": itemsRepositories,
    }
}
