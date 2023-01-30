import type { ItemProgress } from 'src/types/items_progress.type';
import type { Item } from 'src/types/item.type';
import type { ItemData } from 'src/types/item_data.type';
import type { Writable } from 'svelte/types/runtime/store';
import { get } from 'svelte/store';
export class ItemsRepository {
	constructor(
		private itemsStore: Writable<Item[] | undefined>,
		itemsDataStore: Writable<ItemData[] | undefined>,
		itemProgressStore: Writable<ItemProgress | undefined>
	) {
		itemsDataStore.subscribe((itemsData) => {
			if (!itemsData) {
				return;
			}
			const itemProgress = get(itemProgressStore);
			if (!itemProgress) {
				return;
			}
			this.refreshItems(itemsData, itemProgress);
		});
		itemProgressStore.subscribe((itemProgress) => {
			if (!itemProgress) {
				return;
			}
			const itemsData = get(itemsDataStore);
			if (!itemsData) {
				return;
			}
			this.refreshItems(itemsData, itemProgress);
		});
	}

	async refreshItems(itemsData: ItemData[], itemProgress: ItemProgress) {
		const researchedItems: Item[] = itemProgress.researched.map((itemId) => {
			const itemData = itemsData[itemId - 1];
			return {
				...itemData,
				item_progress: itemData.research,
				easy: false
			};
		});
		const inProgressItems: Item[] = itemProgress.inProgress.map((itemDelta) => {
			const itemData = itemsData[itemDelta.id - 1];
			return {
				...itemData,
				...itemDelta
			};
		});
		const notInProgressItems: Item[] = itemProgress.notInProgress.map((itemGama) => {
			const itemData = itemsData[itemGama.id - 1];
			return {
				...itemData,
				...itemGama,
				item_progress: 0
			};
		});
		this.itemsStore.set(researchedItems.concat(inProgressItems, notInProgressItems));
	}
}