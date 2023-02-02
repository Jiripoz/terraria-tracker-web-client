<script>
	import { getContext } from 'svelte';
	import { TABS } from './Tabs.svelte';

	const tab = {};
	const { registerTab, selectTab, selectedTab } = getContext(TABS);

	registerTab(tab);
</script>

<button class:selected={$selectedTab === tab} on:click={() => selectTab(tab)}>
	<slot />
</button>

<style>
	button {
		display: flex;
		flex-direction: row;
		justify-content: center;
		background: none;
		border: none;
		border-bottom: 2px solid white;
		border-radius: 0;
		margin: 0;
		color: #ccc;
		width: 365px;
		border-bottom: 0.5em solid #d9d9d9;
		border-radius: 0.5em;
	}

	.selected {
		border-bottom: 0.5em solid #58355e;
		color: #333;
	}
</style>
