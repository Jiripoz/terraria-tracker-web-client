import type { Filters } from 'src/types/filters.type';
import type { Item } from 'src/types/item.type';
import { writable } from 'svelte/store';

let gItems: Item[];
let gFilter: Filters;
let itemDB: Item[];
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
	displayItems.set(gItems);

	console.log(gItems);
};
