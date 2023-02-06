import { derived } from 'svelte/store';

import { filteredItemsStore } from './filtered_items_store';
import { ITEMS_PER_PAGE, currentPageStore } from './pagination_store';

export const displayedItemsStore = derived(
	[filteredItemsStore, currentPageStore],
	([$filteredItemsStore, $currentPageStore]) => {
		const displayedItems = $filteredItemsStore.slice(
			($currentPageStore - 1) * ITEMS_PER_PAGE,
			$currentPageStore * ITEMS_PER_PAGE
		);
		return displayedItems;
	}
);
