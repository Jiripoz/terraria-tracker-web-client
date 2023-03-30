<script lang="ts">
	import ItemProgress from './ItemProgress.svelte';
	import { displayedItemsStore } from '$lib/stores/displayed_items_store';
	import { fade } from 'svelte/transition';
	import {flip} from 'svelte/animate';
</script>

<div class="items-container">
	{#if $displayedItemsStore}
		{#each $displayedItemsStore as item (item)}
			<div class="item-wrapper" in:fade animate:flip={{duration: 200}}>
				<ItemProgress {item} />
			</div>
		{/each}
	{/if}
</div>

<style>
	.item-wrapper {
		display: flex;
		flex-direction: row;
		justify-content: center;
		margin: 0.5em;
		height: fit-content;
	}
	.items-container {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		margin: -0.5em;
	}
</style>
