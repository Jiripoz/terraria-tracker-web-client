<script lang="ts">
	import { itemsStore } from './../stores/store';
	import ItemProgress from './ItemProgress.svelte';
</script>

<div class="items-container">
	{#if $itemsStore}
		{#each $itemsStore as item}
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
