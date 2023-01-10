<script>
import { onMount } from "svelte";
import { configApiData } from '../store';


onMount(async () => {
  fetch("http://localhost:4777/config")
  .then(response => response.json())
  .then(data => {
        console.log(data);
		configApiData.set(data);
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

	<p>{$configApiData?.player_file_path}</p>

</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

</style>
