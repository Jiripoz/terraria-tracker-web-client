<script>
	import PageSwitch from './../lib/components/filters/PageSwitch.svelte';
	import SearchBarFilter from '../lib/components/filters/SearchBarFilter.svelte';
	import Highlight from '../lib/components/Highlight.svelte';
	import { Tabs, TabList, TabPanel, Tab } from '../lib/components/tabs/tabs';
	import {
		setupDependencies,
		itemsDataRepository,
		overviewRepository
	} from '../lib/stores/di';
	import { onMount } from 'svelte';
	import ToggleEasy from '$lib/components/filters/ToggleEasy.svelte';
	import ItemProgressList from '$lib/items/ItemProgressList.svelte';
	import CraftingStationList from '$lib/components/stations/CraftingStationList.svelte';

	const overviewStore = overviewRepository.store;
	const itemsDataStore = itemsDataRepository.store;
	onMount(setupDependencies);
</script>

<svelte:head>
	<title>Carlos Piloto Fã Clube</title>
	<meta name="Terraria" content="terraria journey tracker" />
</svelte:head>

{#if $overviewStore}
	<div class="highlight-list">
		<div><Highlight {...$overviewStore.progress} /></div>
		<div><Highlight {...$overviewStore.partially_researched} /></div>
		<div><Highlight {...$overviewStore.absolute} /></div>
		<div><Highlight {...$overviewStore.not_researched} /></div>
		<div><Highlight {...$overviewStore.easy} /></div>
	</div>
{/if}
{#if $itemsDataStore}
	<Tabs>
		<TabList>
			<div class="item-tab">
				<div><Tab><h3>Items</h3></Tab></div>
				<div><Tab><h3>Crafting</h3></Tab></div>
			</div>
		</TabList>

		<div class="panel-container">
			<TabPanel>
				<div class="filters-container">
					<div class="search-filter"><SearchBarFilter /></div>
					<div class="easy-filter"><ToggleEasy /></div>
					<div class="page-switch"><PageSwitch /></div>
				</div>
				<ItemProgressList />
			</TabPanel>
		</div>

		<div class="panel-container">
			<TabPanel>
				calos tiloco
				<div class="crafting-station-list"><CraftingStationList /></div>
			</TabPanel>
		</div>
	</Tabs>
{/if}

<style>
	.highlight-list {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		margin-left: -1em;
		margin-right: -1em;
		margin-top: -1em;
	}
	.highlight-list > * {
		margin-left: 1em;
		margin-right: 1em;
		margin-top: 1em;
	}
	.item-tab {
		display: flex;
		flex-direction: row;
		justify-content: center;
		padding: 0px;
		margin-top: 2em;
		margin-bottom: 0px;
		padding: auto;
	}
	.item-tab > * {
		width: 365px;
		margin-right: 32px;
		margin-left: 32px;
	}
	.panel-container {
		display: flex;
		flex-direction: column;
		margin-top: 2em;
		padding: 0 4em;
		justify-content: center;
		align-items: center;
	}
	.filters-container {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding: 0 4em;
		gap: 32px;
		flex-grow: 1;
		width: 80%;
		margin-bottom: 2em;
	}
	.search-filter {
		display: flex;
		flex-grow: 1;
		flex-direction: row;
		align-items: center;
		padding: 1em;
		gap: 1em;

		background: linear-gradient(0deg, #ffffff, #ffffff), #111111;

		box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.15);
		border-radius: 100px;
	}
	.easy-filter {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 0.75em 1em;
		gap: 8px;
		background: linear-gradient(0deg, #ffffff, #ffffff), #111111;

		box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.15);
		border-radius: 100px;
	}
	.page-switch {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		padding: 1em;
		gap: 16px;

		background: linear-gradient(0deg, #ffffff, #ffffff), #111111;

		box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.15);
		border-radius: 100px;
	}
	.crafting-station-list {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 1em;
		justify-content: center;
	}
</style>
