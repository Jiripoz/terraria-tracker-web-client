import { fetchOverview } from '../services/api_service';
import type { OverviewHighlights } from 'src/types/overview.type';
import type { Writable } from 'svelte/types/runtime/store';
import { writable } from 'svelte/store';

export class OverviewRepository {
	constructor() {
		this.store = writable<OverviewHighlights | undefined>(undefined);
	}
	public store: Writable<OverviewHighlights | undefined>;

	async start() {
		setInterval(async () => {
			await this.refreshOverview();
		}, 10000);
		this.refreshOverview();
	}

	async refreshOverview() {
		const highlights = await fetchOverview();
		this.store.set(highlights);
	}
}
