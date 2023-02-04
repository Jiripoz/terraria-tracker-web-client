<script>
	import SearchBarFilter from '../lib/components/filters/SearchBarFilter.svelte';
	import ItemProgressList from './../lib/components/ItemProgressList.svelte';
	import Highlight from '../lib/components/Highlight.svelte';
	import { Tabs, TabList, TabPanel, Tab } from '../lib/components/tabs/tabs';
	import { itemsDataStore } from '../lib/stores/store';
	import { overviewStore, setupDependencies } from '../lib/stores/store';
	import { onMount } from 'svelte';
	import ToggleEasy from '$lib/components/filters/ToggleEasy.svelte';
	import ItemProgress from '$lib/components/ItemProgress.svelte';

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
				<ToggleEasy />
				<SearchBarFilter />
				<ItemProgressList></ItemProgressList>
			</TabPanel>
		</div>

		<div class="panel-container">
			<TabPanel />
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
		margin-top: 2em;
	}
</style>
