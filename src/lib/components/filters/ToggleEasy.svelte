<script lang="ts">
	import { easyHandler, filterStore } from "$lib/stores/filter_store";
	
</script>


<div><button on:click = {easyHandler}>teste!</button>
{$filterStore.easy}
</div>
<style>


</style>