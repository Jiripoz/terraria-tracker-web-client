import { fetchItemsProgress } from '../services/api_service';
import type { ItemProgress } from 'src/types/items_progress.type';
import type { Writable } from 'svelte/types/runtime/store';

export class ItemsProgressRepository {
	constructor(private store: Writable<ItemProgress | undefined>) {}

	async refreshItemsProgress() {
		const itemsProgress = await fetchItemsProgress();
		this.store.set(itemsProgress);
	}
}
