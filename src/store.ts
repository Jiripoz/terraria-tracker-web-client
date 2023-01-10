import { writable, derived } from 'svelte/store';
import type { ServerConfig } from './types/config.type';


export const configApiData = writable<ServerConfig | undefined>(undefined);