import { writable } from 'svelte/store';

import type { Filters } from 'src/types/filters.type';

import { FilterRepository } from '../repositories/filter_repository';
import { filterListener } from './filtered_items_store';

const currentFilter: Filters = {
	easy: false,
	search: ''
};

export const filterStore = writable<Filters>(currentFilter);

const filterRepository = new FilterRepository(filterStore);

export const easyHandler = () => {
	filterRepository.updateEasyFilter(currentFilter);
	console.log(currentFilter);
	filterListener(currentFilter);
};

export const searchHandler = (uInput: string) => {
	currentFilter.search = uInput.toLowerCase();
	console.log(currentFilter);
	filterRepository.refreshSearch(currentFilter);
	filterListener(currentFilter);
};
