import { writable } from 'svelte/store';
import type { ServerConfig } from '../../types/server_config.type';
import type { OverviewHighlights } from 'src/types/overview.type';
import type { Items } from 'src/types/items.type';
import type { ItemsProgress } from 'src/types/items_progress.type';
import { OverviewRepository } from '$lib/repositories/overview_repository';


export const configApiDataStore = writable<ServerConfig | undefined>(undefined);

export const overviewStore = writable<OverviewHighlights | undefined>(undefined);
export const itemsStore = writable<Items | undefined>(undefined);

export const itemProgressStore = writable<ItemsProgress | undefined>(undefined);
export const setupDependencies = () => {
    const overviewRepositories = new OverviewRepository(overviewStore);
    overviewRepositories.refreshOverview();
    
    (<any>window).dependencies = {
        "overviewRepositories": overviewRepositories,
    }
}
