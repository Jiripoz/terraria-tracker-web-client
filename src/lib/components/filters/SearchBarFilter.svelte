<script>
import { searchHandler } from "../../stores/filter_store";
export let userInput = "";

$: {
		searchHandler(userInput);
	}

</script>

<input bind:value={userInput}>

<div>
    hello {userInput}
</div>  

<style>

</style>