import type { Item } from 'src/types/item.type';
import type { Readable } from 'svelte/types/runtime/store';
import { derived } from 'svelte/store';
import type { ItemsDataRepository } from './items_data_repository';
import type { ItemsProgressRepository } from './items_progress_repository';

export class ItemsRepository {
	constructor(
		itemDataRepository: ItemsDataRepository,
		itemProgressRepository: ItemsProgressRepository
	) {
		this.itemsStore = derived(
			[itemDataRepository.store, itemProgressRepository.store],
			([$itemsDataStore, $itemProgressStore]) => {
				if ($itemsDataStore == undefined || $itemProgressStore == undefined) {
					return [];
				}
				const itemsDict: Record<number, Item> = {};
				$itemProgressStore.researched.forEach((itemId) => {
					const itemData = $itemsDataStore[itemId];
					const item = {
						...itemData,
						item_progress: itemData.research,
						easy: false
					};
					itemsDict[item.id] = item;
				});
				$itemProgressStore.inProgress.forEach((itemDelta) => {
					const itemData = $itemsDataStore[itemDelta.id];
					const item = {
						...itemData,
						...itemDelta
					};
					itemsDict[item.id] = item;
				});
				$itemProgressStore.notInProgress.forEach((itemGama) => {
					const itemData = $itemsDataStore[itemGama.id];
					const item = {
						...itemData,
						...itemGama,
						item_progress: 0
					};
					itemsDict[item.id] = item;
				});
				console.log('cintura solta dançar kuduro', itemsDict);
				return itemsDict;
			}
		);
	}

	public itemsStore: Readable<Record<number, Item> | undefined>;
}
