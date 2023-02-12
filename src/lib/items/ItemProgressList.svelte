<script lang="ts">
	import ItemProgress from './ItemProgress.svelte';
	import { displayedItemsStore } from '$lib/stores/displayed_items_store';
</script>

<div class="items-container">
	{#if $displayedItemsStore}
		{#each $displayedItemsStore as item}
			<div class="item-wrapper">
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
	}
	.items-container {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		margin: -0.5em;
	}
</style>
