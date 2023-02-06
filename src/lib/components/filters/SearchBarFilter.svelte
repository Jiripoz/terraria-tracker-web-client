<script>
	import { searchHandler } from '../../stores/filter_store';
	export let userInput = '';

	$: {
		searchHandler(userInput);
	}
</script>

<input placeholder="carlos piloto fã clube" type="text" class="text-field" bind:value={userInput} />

<style>
	.text-field {
		border: 0;
		border-bottom: 1px #ccc solid;
		width: 100%;
		margin: 0 1em;
	}
	.text-field:focus {
		border: 0;
		border-bottom: 1px black solid;
		outline: none;
	}
</style>
