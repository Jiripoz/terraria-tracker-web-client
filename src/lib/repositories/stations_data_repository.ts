import { fetchStations } from '../services/api_service';
import type { Writable } from 'svelte/types/runtime/store';
import { writable } from 'svelte/store';
import type { Station } from 'src/types/stations.type';

export class StationDataRepository {
	constructor() {
		this.store = writable<Station[] | undefined>(undefined);
	}
	public store: Writable<Station[] | undefined>;
	async refreshStations() {
		const stations = await fetchStations();
		this.store.set(stations);
		return this.store;
	}
}
