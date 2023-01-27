<script lang="ts">
	import { dictionary } from './../../../.svelte-kit/generated/client-manifest.js';
    import { itemProgressStore } from "../stores/store";
    import Partiallyaux from "./Partiallyaux.svelte";
    import { overviewStore } from "../stores/store";
    import type { Partially_Researched, ItemsProgress } from "src/types/items_progress.type";
</script>

<div class="item-line">
{#if $itemProgressStore}
{#each $itemProgressStore.partially_researched as item}

<div class="pai-item"><Partiallyaux {...item}></Partiallyaux></div>

{/each}
{/if}
</div>

<style>
.pai-item {
    display: flex;
    flex-direction: row;
    justify-content: center;
}
.item-line {
    display: flex;
    flex-wrap: wrap;
    flex-basis: 33.333333%;
    justify-content: center;
}

</style>