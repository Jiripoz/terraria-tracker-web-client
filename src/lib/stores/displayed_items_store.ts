import { derived } from 'svelte/store';

import { filtereditemStore } from './filtered_items_store';
import { ITEMS_PER_PAGE, currentPageStore } from './pagination_store';

export const displayedItemsStore = derived(
	[filtereditemStore, currentPageStore],
	([$filtereditemStore, $currentPageStore]) => {
		const displayedItems = $filtereditemStore.slice(
			($currentPageStore - 1) * ITEMS_PER_PAGE,
			$currentPageStore * ITEMS_PER_PAGE
		);
		return displayedItems;
	}
);
