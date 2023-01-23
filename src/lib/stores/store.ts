import { writable } from 'svelte/store';
import type { ServerConfig } from '../../types/server_config.type';
import type { OverviewHighlights } from 'src/types/overview.type';
import type { Items } from 'src/types/items.type';
import type { ItemsProgress } from 'src/types/items_progress.type';


export const configApiData = writable<ServerConfig | undefined>(undefined);
export const overviewHighlights = writable<OverviewHighlights | undefined>(undefined);
export const items = writable<Items | undefined>(undefined);
export const itemProgress = writable<ItemsProgress | undefined>(undefined);