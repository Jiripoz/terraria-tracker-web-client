<script>
import { onMount } from "svelte";
import { configApiData, overviewHighlights, itemsProgress} from '../store';

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
  fetch("http://localhost:4777/player")
	.then(response => response.json())
	.then(data => {
			console.log(data);
			configApiData.set(data);
	}).catch(error => {
		console.log(error);
		return [];
	});
  fetch("http://localhost:4777/items-progress")
	.then(response => response.json())
	.then(data => {
			console.log(data);
			itemsProgress.set(data);
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

<section>
{#if $overviewHighlights}
	<h2>{$overviewHighlights.progress.big}</h2>
	<sub class="body1"><span>{$overviewHighlights.progress.small} {$overviewHighlights.progress.description} </span></sub>
{/if}
</section>


<style>
	section{

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 16px;

		width: 255px;
		height: 170px;

		background: linear-gradient(0deg, #FFFFFF, #FFFFFF), #111111;
		box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.15);
		border-radius: 16px;

		flex: none;
		order: 0;
		flex-grow: 0;
}

	sub{
		overflow: hidden;
		}
	span{
		font-weight: 700;
	}
	.teste{
		display:flex;
		margin-block-start: 0;
    	margin-block-end: 0;
	}
</style>
