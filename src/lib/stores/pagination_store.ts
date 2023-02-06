import { derived, get, writable } from 'svelte/store';

import { filteredItemsStore } from './filtered_items_store';

export const ITEMS_PER_PAGE = 20;

export const maxPageStore = derived(filteredItemsStore, ($filteredItemsStore) =>
	Math.ceil($filteredItemsStore.length / ITEMS_PER_PAGE)
);

export const currentPageStore = writable<number>(1);

maxPageStore.subscribe(() => {
	currentPageStore.set(1);
});

export const previousPage = () => {
	const currentPage = get(currentPageStore);
	if (currentPage == 1) {
		return;
	}
	currentPageStore.set(currentPage - 1);
};

export const nextPage = () => {
	const currentPage = get(currentPageStore);
	if (currentPage >= get(maxPageStore)) {
		return;
	}
	currentPageStore.set(currentPage + 1);
};
