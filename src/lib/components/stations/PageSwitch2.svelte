<script lang="ts">
	import { nPage, pPage } from '$lib/repositories/stations_repository';

	export let currentPage: number;
	export let maxPages: number;
	export let stationId: number;
</script>

<button class="arrow left" on:click={() => pPage(stationId)} />
<div>{currentPage}/{maxPages}</div>
<button class="arrow right" on:click={() => nPage(stationId)} />

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
