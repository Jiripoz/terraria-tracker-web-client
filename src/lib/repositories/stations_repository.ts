import type {
	Craftable,
	StationHeader,
	StationProgress,
	StationsData
} from 'src/types/stations.type';
import type { StationDataRepository } from './stations_data_repository';
import type { Writable, Readable } from 'svelte/types/runtime/store';
import type { ItemsRepository } from './items_repository';
import { writable, derived, get } from 'svelte/store';
import type { Item } from 'src/types/item.type';

export const STATIONS_ITEMS_PER_PAGE = 8;

export class StationItemsRepository {
	constructor(craftables: number[], itemsRepository: ItemsRepository) {
		this.currentPage = writable<number>(1);
		this.craftableItems = derived(itemsRepository.itemsStore, ($itemsStore) => {
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
		this.maxPage = derived(this.craftableItems, ($craftableItems) => {
			return Math.ceil($craftableItems.length / STATIONS_ITEMS_PER_PAGE);
		});
		this.displayedItems = derived(
			[this.craftableItems, this.currentPage],
			([$craftableItems, $currentPage]) => {
				return $craftableItems.slice(
					($currentPage - 1) * STATIONS_ITEMS_PER_PAGE,
					$currentPage * STATIONS_ITEMS_PER_PAGE
				);
			}
		);
	}
	public displayedItems: Readable<Craftable[]>;
	public maxPage: Readable<number>;
	public currentPage: Writable<number>;
	public craftableItems: Readable<Craftable[]>;

	pPage = () => {
		const currentPage = get(this.currentPage);
		if (currentPage == 1) {
			return;
		}

		this.currentPage.set(currentPage - 1);
	};

	nPage = () => {
		const currentPage = get(this.currentPage);
		if (currentPage >= get(this.maxPage)) {
			return;
		}

		this.currentPage.set(currentPage + 1);
	};
}

export class StationsRepository {
	constructor(
		private itemsRepository: ItemsRepository,
		private stationsRepository: StationDataRepository
	) {
		this.stationIdList = derived(this.stationsRepository.store, ($stationStore) => {
			if ($stationStore == undefined) {
				return [];
			}
			const stationList = [];
			return Object.keys($stationStore).map((id) => {
				const n = +id;
				const station = $stationStore[n];
				return {
					id: station.id,
					name: station.name,
					imageUrl: station.imageUrl
				};
			});
		});

		this.stationItemsRepositories = {};
		this.stationProgress = derived(
			[this.itemsRepository.itemsStore, this.stationsRepository.store],
			([$itemStore, $stationsStore]) => {
				if (!this.hasCreatedstations && $stationsStore) {
					return this.createStations($itemStore, $stationsStore);
				}
				if (this.hasCreatedstations && $itemStore) {
					return this.updateStations($itemStore, $stationsStore);
				}
			}
		);
	}

	private hasCreatedstations = false;
	public stationItemsRepositories: Record<number, StationItemsRepository> = {};
	public stationProgress: Readable<Record<number, StationProgress> | undefined>;
	public stationIdList: Readable<StationHeader[]>;
	private createStations(itemStore: Record<number, Item> | undefined, stationStore: StationsData) {
		if (itemStore == undefined) {
			return undefined;
		}
		this.hasCreatedstations = true;
		const stationProgress: Record<number, StationProgress> = {};
		for (const key of Object.keys(stationStore)) {
			const nk = +key;
			const R = new StationItemsRepository(stationStore[nk].craftables, this.itemsRepository);
			this.stationItemsRepositories[nk] = R;
			if (itemStore[nk] == undefined) {
				stationProgress[nk] = {
					progress: 1,
					research: 1,
					easy: false,
					special: true
				};
				continue;
			} else {
				stationProgress[nk] = {
					progress: itemStore[nk].item_progress,
					research: itemStore[nk].research,
					easy: itemStore[nk].easy,
					special: false
				};
				continue;
			}
		}

		return this.updateStations(itemStore, stationStore);
	}
	private createStore(stationId: number, craftables: number[], itemsRepository: ItemsRepository) {
		const r = new StationItemsRepository(craftables, itemsRepository);
		this.stationItemsRepositories[stationId] = r;
	}
	private updateStations(
		itemStore: Record<number, Item> | undefined,
		stationStore: StationsData | undefined
	) {
		if (itemStore == undefined || stationStore == undefined) {
			return undefined;
		}
		const stationProgress: Record<number, StationProgress> = {};
		if (this.hasCreatedstations == false) {
			for (const key of Object.keys(stationStore)) {
				const nk = +key;
				this.createStore(nk, stationStore[nk].craftables, this.itemsRepository);
				if (itemStore[nk] == undefined) {
					stationProgress[nk] = {
						progress: 1,
						research: 1,
						easy: false,
						special: true
					};
					continue;
				} else {
					stationProgress[nk] = {
						progress: itemStore[nk].item_progress,
						research: itemStore[nk].research,
						easy: itemStore[nk].easy,
						special: false
					};
					continue;
				}
			}
		}
		for (const key of Object.keys(stationStore)) {
			const nk = +key;
			this.createStore(nk, stationStore[nk].craftables, this.itemsRepository);
			if (itemStore[nk] == undefined) {
				stationProgress[nk] = {
					progress: 1,
					research: 1,
					easy: false,
					special: true
				};
				continue;
			} else {
				stationProgress[nk] = {
					progress: itemStore[nk].item_progress,
					research: itemStore[nk].research,
					easy: itemStore[nk].easy,
					special: false
				};
				continue;
			}
		}
		return stationProgress;
	}
}
