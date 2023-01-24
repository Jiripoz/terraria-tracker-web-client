import { fetchOverview } from "../services/api_service";
import type { OverviewHighlights } from "src/types/overview.type";
import type { Writable } from "svelte/types/runtime/store";


export class OverviewRepository {
    constructor(private store: Writable<OverviewHighlights | undefined>) {
        setInterval(async()=>{
            await this.refreshOverview();
        }, 10000)  
     }

    async refreshOverview() {
        const highlights = await fetchOverview();
        this.store.set(highlights)
    }
}