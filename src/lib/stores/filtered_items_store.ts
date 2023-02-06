import { derived, writable, get } from 'svelte/store';
import { itemsStore } from './store';

import { filterStore } from './filter_store';

export const filteredItemsStore = derived(
	[filterStore, itemsStore],
	([$filterStore, $itemsStore]) => {
		if (!$itemsStore) {
			return [];
		}
		let filteredItems = $itemsStore;
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
