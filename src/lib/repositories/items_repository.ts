import type { ItemProgress } from 'src/types/items_progress.type';
import type { Item } from 'src/types/item.type';
import type { ItemData } from 'src/types/item_data.type';
import type { Writable } from 'svelte/types/runtime/store';
import { get } from 'svelte/store';
import { itemsListener } from '$lib/stores/filtered_items_store';

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
	find_index = (itemsData: ItemData[], id: number) => {
		let index = 0;
		for (let i = 0; i < itemsData.length; i++) {
			if (itemsData[i]['id'] == id) {
				index = i;
				break;
			}
		}
		return index;
	};
	async refreshItems(itemsData: ItemData[], itemProgress: ItemProgress) {
		const researchedItems: Item[] = itemProgress.researched.map((itemId) => {
			const ind = this.find_index(itemsData, itemId);
			const itemData = itemsData[ind];
			if (itemData == undefined) {
				console.log('talvez esse seja o problema, o item id é: ', itemId, itemsData.length, ind);
			}
			return {
				...itemData,
				item_progress: itemData.research,
				easy: false
			};
		});
		const inProgressItems: Item[] = itemProgress.inProgress.map((itemDelta) => {
			const ind = this.find_index(itemsData, itemDelta.id);
			const itemData = itemsData[ind];
			return {
				...itemData,
				...itemDelta
			};
		});
		const notInProgressItems: Item[] = itemProgress.notInProgress.map((itemGama) => {
			const ind = this.find_index(itemsData, itemGama.id);
			const itemData = itemsData[ind];
			return {
				...itemData,
				...itemGama,
				item_progress: 0
			};
		});
		const itemList = researchedItems.concat(inProgressItems, notInProgressItems);
		itemsListener(itemList);
		this.itemsStore.set(itemList);
	}
}
