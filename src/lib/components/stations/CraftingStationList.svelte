<script>
	import { displayStationItemsRepository, stationsRepository } from '$lib/stores/di';
	import CraftingStation from './CraftingStation.svelte';
	const stationId = displayStationItemsRepository.stationsIds;
	const stationProgress = stationsRepository.stationProgress
</script>

{#if $stationProgress}
{#if $stationId}
	{#each $stationId as station}
		<CraftingStation
			id={station.id}
			name={station.name}
			imageUrl={station.imageUrl}
			progress={$stationProgress[station.id].progress}
			research={$stationProgress[station.id].research}
			easy={$stationProgress[station.id].easy}
			special={$stationProgress[station.id].special}
			repository={displayStationItemsRepository.get_by_id(station.id)}
		/>
	{/each}
{/if}
{/if}

<style>
</style>
