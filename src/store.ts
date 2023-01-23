import { writable, derived } from 'svelte/store';
import type { ServerConfig } from './types/config.type';
import type { OverviewHighlights } from './types/config.type';
import type { ListofItems } from './types/config.type';
import type { ItemsProgress } from './types/config.type';

export const configApiData = writable<ServerConfig | undefined>(undefined);
export const overviewHighlights = writable<OverviewHighlights | undefined>(undefined);
export const listofItems = writable<ListofItems | undefined>(undefined);
export const itemProgress = writable<ItemsProgress | undefined>(undefined);