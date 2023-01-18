import { writable, derived } from 'svelte/store';
import type { ServerConfig } from './types/config.type';
import type { OverviewConfig } from './types/config.type';

export const configApiData = writable<ServerConfig | undefined>(undefined);
export const configOverview = writable<OverviewConfig | undefined>(undefined);