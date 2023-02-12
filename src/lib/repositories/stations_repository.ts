import type { Craftable, Station, StationProgress } from 'src/types/stations.type';
import type { Writable, Readable } from 'svelte/types/runtime/store';
import type { ItemsRepository } from './items_repository';
import { writable, derived, get } from 'svelte/store';

import { fetchStations } from '../services/api_service';
import { displayStationItemsRepository } from '$lib/stores/di';

export const stationsMaxPage: Writable<Record<number, number>> = writable<Record<number, number>>(
	{}
);
export const stationsCurrentPage: Writable<Record<number, number>> = writable<
	Record<number, number>
>({});

export const STATIONS_ITEMS_PER_PAGE = 8;

export class StationItemsRepository {
	constructor(craftables: number[], itemsRepository: ItemsRepository) {
		this.store = derived(itemsRepository.itemsStore, ($itemsStore) => {
			if ($itemsStore == undefined) {
				console.log('saio no !$itemsstore');
				return [];
			}
			return craftables
				.filter((id) => {
					const item = $itemsStore[id];
					if (item === undefined) {
						return false;
					}
					return id;
				})
				.map((id) => {
					const item = $itemsStore[`${id}`];
					return {
						id: item.id,
						name: item.name,
						imageUrl: item.imageUrl,
						research: item.research,
						item_progress: item.item_progress,
						easy: item.easy
					};
				});
		});
	}

	public store: Readable<Craftable[]>;
}

export class StationsRepository {
	constructor() {
		this.stationItemsRepositories = {};
		this.stationsStore = writable<Station[] | undefined>(undefined);
		this.stationProgress = writable<Record<number, StationProgress> | undefined>(undefined);
	}
	public stationItemsRepositories: Record<number, StationItemsRepository> = {};
	public stationsStore: Writable<Station[] | undefined>;
	public stationProgress: Writable<Record<number, StationProgress> | undefined>;

	create_store(stationId: number, craftables: number[], itemsRepository: ItemsRepository) {
		const r = new StationItemsRepository(craftables, itemsRepository);
		this.stationItemsRepositories[stationId] = r;
	}
	get_store_by_id(stationId: number) {
		return this.stationItemsRepositories[stationId];
	}
	async refreshStations(itemsRepository: ItemsRepository) {
		const stations = await fetchStations();
		const stationProgress: StationProgress[] = [];
		const itemList = get(itemsRepository.itemsStore);
		if (itemList == undefined) {
			console.log('undefined!');
		} else {
			console.log('not undefined', itemList[1]);
		}
		for (let i = 0; i < stations.length; i++) {
			this.create_store(stations[i]['id'], stations[i]['craftables'], itemsRepository);
			if (itemList == undefined) {
				continue;
			}
			console.log(itemList[1]);
			if (itemList[stations[i]['id']] == undefined) {
				stationProgress[stations[i]['id']] = {
					progress: 1,
					research: 1,
					easy: false,
					special: true
				};
				continue;
			} else {
				stationProgress[stations[i]['id']] = {
					progress: itemList[stations[i]['id']].item_progress,
					research: itemList[stations[i]['id']].research,
					easy: itemList[stations[i]['id']].easy,
					special: false
				};
			}
		}
		this.stationsStore.set(stations);
		this.stationProgress.set(stationProgress);
	}

	async generateStationsPagination() {
		const sStore = get(this.stationsStore);
		if (sStore == undefined) {
			return [];
		}
		const stationCurrentPage: Record<number, number> = {};
		const stationMaxPage: Record<number, number> = {};
		for (const station of sStore) {
			stationMaxPage[station.id] = Math.ceil(station.craftables.length / STATIONS_ITEMS_PER_PAGE);
			stationCurrentPage[station.id] = 1;
		}
		stationsMaxPage.set(stationMaxPage);
		stationsCurrentPage.set(stationCurrentPage);
		return sStore;
	}
}
export const pPage = (stationId: number) => {
	const currentPage = get(stationsCurrentPage);
	if (currentPage[stationId] == 1) {
		return;
	}
	currentPage[stationId] = currentPage[stationId] - 1;
	stationsCurrentPage.set(currentPage);
	displayStationItemsRepository.get_by_id(stationId).update();
};

export const nPage = (stationId: number) => {
	const currentPage = get(stationsCurrentPage);
	if (currentPage[stationId] >= get(stationsMaxPage)[stationId]) {
		return;
	}
	currentPage[stationId] = currentPage[stationId] + 1;
	stationsCurrentPage.set(currentPage);
	displayStationItemsRepository.get_by_id(stationId).update();
};
