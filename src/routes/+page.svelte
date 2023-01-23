<script>
	import { fetchConfig, fetchItems, fetchItemsProgress, fetchOverview } from './../lib/services/api_service';
import Highlight from '../lib/components/Highlight.svelte';
import { onMount } from "svelte";
import { configApiData, overviewHighlights, items, itemProgress} from '../lib/stores/store';


onMount(async () => {
	fetchConfig();
	const overviewItems = await fetchOverview();
	overviewHighlights.set(overviewItems);
	fetchItems();
	fetchItemsProgress();
})


</script>

<svelte:head>
	<title>Homeless people</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

{#if $overviewHighlights}
<div class="highlight-list">
	<div><Highlight {...$overviewHighlights.progress}></Highlight></div>
	<div><Highlight {...$overviewHighlights.partially_researched}></Highlight></div>
	<div><Highlight {...$overviewHighlights.absolute}></Highlight></div>
	<div><Highlight {...$overviewHighlights.not_researched}></Highlight></div>
	<div><Highlight {...$overviewHighlights.easy}></Highlight></div>
</div>
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


</style>
