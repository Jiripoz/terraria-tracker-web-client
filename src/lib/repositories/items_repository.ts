import { fetchItems } from "../services/api_service";
import type { Item } from "src/types/item.type";
import type { Writable } from "svelte/types/runtime/store";


export class ItemsRepository {
    constructor(private store: Writable<Item[] | undefined>) {
     }

    async refreshItems() {
        const items = await fetchItems();
        this.store.set(items)
    }
}
