<script>
	import { getContext } from 'svelte';
	import { TABS } from './Tabs.svelte';

	const tab = {};
	const { registerTab, selectTab, selectedTab } = getContext(TABS);

	registerTab(tab);
</script>

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
		border-bottom: 8px solid #d9d9d9;
		border-radius: 8px;
	}
	
	.selected {
		border-bottom: 8px solid #58355E;
		color: #333;
;
	}
</style>

<button class:selected="{$selectedTab === tab}" on:click="{() => selectTab(tab)}">
	<slot></slot>
</button>