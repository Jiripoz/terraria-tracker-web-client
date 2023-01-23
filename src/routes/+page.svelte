<script>
	import Highlight from './Highlight.svelte';
import { onMount } from "svelte";
import { configApiData, overviewHighlights, listofItems, itemProgress} from '../store';

onMount(async () => {
  fetch("http://localhost:4777/overview")
	.then(response => response.json())
	.then(data => {
			console.log(data);
			overviewHighlights.set(data);
	}).catch(error => {
		console.log(error);
		return [];
  });
  fetch("http://localhost:4777/config")
	.then(response => response.json())
	.then(data => {
			console.log(data);
			configApiData.set(data);
	}).catch(error => {
		console.log(error);
		return [];
	});
  fetch("http://localhost:4777/items")
	.then(response => response.json())
	.then(data => {
			console.log(data);
			listofItems.set(data);
	}).catch(error => {
		console.log(error);
		return [];
	});
  fetch("http://localhost:4777/items-progress")
	.then(response => response.json())
	.then(data => {
			console.log(data);
			itemProgress.set(data);
	}).catch(error => {
		console.log(error);
		return [];
	});
});


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
