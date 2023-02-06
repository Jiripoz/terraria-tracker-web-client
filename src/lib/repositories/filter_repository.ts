import type { Writable } from 'svelte/types/runtime/store';
import type { Filters } from 'src/types/filters.type';

export class FilterRepository {
	constructor(private store: Writable<Filters | undefined>) {}

	async updateEasyFilter(arg: Filters) {
		arg.easy = !arg.easy;
		this.store.set(arg);
	}

	async refreshSearch(arg: Filters) {
		this.store.set(arg);
	}
}
