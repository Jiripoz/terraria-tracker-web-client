import type { Filters } from 'src/types/filters.type';
import type { Item } from 'src/types/item.type';
import { writable } from 'svelte/store';

let gItems: Item[];
let gFilter: Filters;
let itemDB: Item[];
const moveIndexBy = 20;
let itemIndex = [0, 20];

export let iIndex = writable([0, 20]);
export let maxPages = writable(1);
export let displayItems = writable<Item[]>(undefined);

export const filterListener = (filter: Filters) => {
	gFilter = filter;
	filterItems();
};

export const itemsListener = (items: Item[]) => {
	itemDB = items;
	filterItems();
};

const filterItems = () => {
	gItems = itemDB;
	if (gFilter.easy == true) {
		gItems = gItems.filter((item) => item['easy']);
	}
	if (gFilter.search != '') {
		gItems = gItems.filter((item) => item['name'].toLocaleLowerCase().includes(gFilter.search));
	}
	displayItems.set(gItems.slice(0, 20));
	maxPages.set(Math.ceil(gItems.length / moveIndexBy));
	itemIndex = [0, 20];
	iIndex.set(itemIndex);
};

export const arrowRight = () => {
	if (itemIndex[0] / 20 + 1 < Math.ceil(gItems.length / moveIndexBy)) {
		itemIndex = [itemIndex[0] + moveIndexBy, itemIndex[1] + moveIndexBy];
		displayItems.set(gItems.slice(itemIndex[0], itemIndex[1]));
		iIndex.set(itemIndex);
	}
};

export const arrowLeft = () => {
	if (itemIndex[0] != 0) {
		itemIndex = [itemIndex[0] - moveIndexBy, itemIndex[1] - moveIndexBy];
		displayItems.set(gItems.slice(itemIndex[0], itemIndex[1]));
		iIndex.set(itemIndex);
	}
};
