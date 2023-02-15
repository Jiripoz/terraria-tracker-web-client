<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Writable, Readable } from 'svelte/store';

	export let currentPage: Writable<number>;
	export let maxPages: Readable<number>;

	const dispatch = createEventDispatcher();
</script>

<button class="arrow left" on:click={() => dispatch('previousPage')} />
<div>{$currentPage}/{$maxPages}</div>
<button class="arrow right" on:click={() => dispatch('nextPage')} />

<style>
	.arrow {
		border: solid #ccc;
		border-width: 0 3px 3px 0;
		background-color: transparent;
		display: inline-block;
		padding: 3px;
	}
	.left {
		transform: rotate(135deg);
		-webkit-transform: rotate(135deg);
	}
	.right {
		transform: rotate(-45deg);
		-webkit-transform: rotate(-45deg);
	}
	.arrow:active {
		border: solid black;
		border-width: 0 3px 3px 0;
	}
</style>
