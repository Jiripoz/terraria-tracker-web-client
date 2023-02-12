import { fetchItemsProgress } from '../services/api_service';
import type { ItemProgress } from 'src/types/items_progress.type';
import type { Writable } from 'svelte/types/runtime/store';
import { writable } from 'svelte/store';

export class ItemsProgressRepository {
	constructor() {
		this.store = writable<ItemProgress | undefined>(undefined);
	}
	public store: Writable<ItemProgress | undefined>;
	async refreshItemsProgress() {
		const itemsProgress = await fetchItemsProgress();
		this.store.set(itemsProgress);
	}
}
