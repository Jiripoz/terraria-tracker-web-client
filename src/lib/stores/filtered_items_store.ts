import { derived } from 'svelte/store';
import { filterStore } from './filter_store';
import { itemsRepository } from './di';

export const filtereditemStore = derived(
	[filterStore, itemsRepository.itemsStore],
	([$filterStore, $itemStore]) => {
		if (!$itemStore) {
			return [];
		}
		let filteredItems = Object.values($itemStore);
		if ($filterStore.easy == true) {
			filteredItems = filteredItems.filter((item) => item['easy']);
		}
		if ($filterStore.search != '') {
			filteredItems = filteredItems.filter((item) =>
				item['name'].toLocaleLowerCase().includes($filterStore.search)
			);
		}
		return filteredItems;
	}
);
