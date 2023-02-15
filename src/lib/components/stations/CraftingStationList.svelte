<script>
	import { stationsRepository } from '$lib/stores/di';
	import CraftingStation from './CraftingStation.svelte';
	const stations = stationsRepository.stationIdList;
	const stationProgress = stationsRepository.stationProgress;
	const stationItemRepository = stationsRepository.stationItemsRepositories;
</script>

{#if $stations}
	{#if $stationProgress}
		{#each $stations as station}
			<CraftingStation
				id={station.id}
				name={station.name}
				imageUrl={station.imageUrl}
				progress={$stationProgress[station.id].progress}
				research={$stationProgress[station.id].research}
				easy={$stationProgress[station.id].easy}
				special={$stationProgress[station.id].special}
				repository={stationItemRepository[station.id]}
			/>
		{/each}
	{/if}
{/if}

<style>
</style>
