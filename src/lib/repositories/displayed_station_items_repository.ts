import {
	STATIONS_ITEMS_PER_PAGE,
	StationsRepository,
	stationsCurrentPage
} from './stations_repository';

import { get, derived } from 'svelte/store';
import { itemsRepository } from '$lib/stores/di';
import type { ItemsRepository } from './items_repository';
import type { Writable, Readable } from 'svelte/types/runtime/store';
import type { Station, StationDisplay } from 'src/types/stations.type';
import { writable } from 'svelte/store';

export class DisplayedStationItemsRepository {
	constructor(
		itemsRepository: ItemsRepository,
		stationsCurrentPage: Writable<Record<number, number>>,
		craftableList: number[],
		stationId: number
	) {
		this.craftables = craftableList;
		this.id = stationId;
		this.store = derived(
			[itemsRepository.itemsStore, stationsCurrentPage],
			([$itemsStore, $currentPage]) => {
				console.log('estou criando displayedstationItemsrepository');
				const displayList = this.craftables.slice(0, STATIONS_ITEMS_PER_PAGE);
				if ($itemsStore == undefined) {
					return [];
				}
				return displayList.map((id) => {
					const item = $itemsStore[id];
					return {
						id: item.id,
						name: item.name,
						imageUrl: item.imageUrl,
						easy: item.easy
					};
				});
			}
		);
	}
	public store: Readable<StationDisplay[]>;
	private craftables: number[];
	private id: number;

	update() {
		this.store = derived(
			[itemsRepository.itemsStore, stationsCurrentPage],
			([$itemsStore, $currentPage]) => {
				const displayList = this.craftables.slice(
					($currentPage[this.id] - 1) * STATIONS_ITEMS_PER_PAGE,
					$currentPage[this.id] * STATIONS_ITEMS_PER_PAGE
				);
				if ($itemsStore == undefined) {
					return [];
				}
				return displayList.map((id) => {
					const item = $itemsStore[id];
					return {
						id: item.id,
						name: item.name,
						imageUrl: item.imageUrl,
						easy: item.easy
					};
				});
			}
		);
	}
}
export class DisplayedItemsRepository {
	constructor() {
		this.displayedStation = {};
		this.stationsIds = writable<Station[] | undefined>(undefined);
	}
	public stationsIds: Writable<Station[] | undefined>;
	public displayedStation: Record<number, DisplayedStationItemsRepository>;
	create_display(
		stationId: number,
		craftables: number[],
		itemsRepository: ItemsRepository,
		stationCurrentPage: Writable<Record<number, number>>
	) {
		const D = new DisplayedStationItemsRepository(
			itemsRepository,
			stationCurrentPage,
			craftables,
			stationId
		);
		D.update();
		console.log('depois do update', get(D.store));
		if (get(D.store) == undefined) {
			console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
		}
		this.displayedStation[stationId] = D;
	}
	async firstdisplay(StationRepository: StationsRepository) {
		const sStore = get(StationRepository.stationsStore);
		if (sStore == undefined) {
			return [];
		}
		for (const station of sStore) {
			this.create_display(station.id, station.craftables, itemsRepository, stationsCurrentPage);
		}
		this.stationsIds.set(sStore);
		console.log('pronto');
		return;
	}
	get_by_id(stationId: number) {
		return this.displayedStation[stationId];
	}
}
