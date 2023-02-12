import { fetchItems } from '../services/api_service';
import type { ItemDataResponse } from 'src/types/item_data.type';
import type { Writable } from 'svelte/types/runtime/store';
import { writable } from 'svelte/store';

export class ItemsDataRepository {
	constructor() {
		this.store = writable<ItemDataResponse | undefined>(undefined);
	}
	public store: Writable<ItemDataResponse | undefined>;
	async refreshItems() {
		const items = await fetchItems();
		this.store.set(items);
		return this.store;
	}
}
