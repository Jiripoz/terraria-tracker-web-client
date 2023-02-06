import { fetchItems } from '../services/api_service';
import type { ItemDataResponse } from 'src/types/item_data.type';
import type { Writable } from 'svelte/types/runtime/store';

export class ItemsDataRepository {
	constructor(private store: Writable<ItemDataResponse | undefined>) {}

	async refreshItems() {
		const items = await fetchItems();
		this.store.set(items);
	}
}
