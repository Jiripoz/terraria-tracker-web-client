import { writable } from 'svelte/store';

import type { Filters } from 'src/types/filters.type';

import { FilterRepository } from '../repositories/filter_repository';

const currentFilter: Filters = {
	easy: false,
	search: ''
};

export const filterStore = writable<Filters>(currentFilter);

const filterRepository = new FilterRepository(filterStore);

export const easyHandler = () => {
	filterRepository.updateEasyFilter(currentFilter);
	filterStore.set(currentFilter);
};

export const searchHandler = (uInput: string) => {
	currentFilter.search = uInput.toLowerCase();
	filterRepository.refreshSearch(currentFilter);
	filterStore.set(currentFilter);
};
