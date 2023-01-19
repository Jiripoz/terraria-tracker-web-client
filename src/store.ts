import { writable, derived } from 'svelte/store';
import type { ServerConfig } from './types/config.type';
import type { OverviewHighlights } from './types/config.type';
import type { ItemProgressConfig } from './types/config.type';

export const configApiData = writable<ServerConfig | undefined>(undefined);
export const overviewHighlights = writable<OverviewHighlights | undefined>(undefined);
export const itemsProgress = writable<ItemProgressConfig | undefined>(undefined);