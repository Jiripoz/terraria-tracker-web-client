<script>
	import {
		previousPage,
		nextPage,
		maxPageStore,
		currentPageStore
	} from './../../stores/pagination_store';
</script>

<button class="arrow left" on:click={previousPage} />
<div>{$currentPageStore}/{$maxPageStore}</div>
<button class="arrow right" on:click={nextPage} />

<style>
	.arrow {
		border: solid #ccc;
		border-width: 0 3px 3px 0;
		background-color: transparent;
		display: inline-block;
		padding: 3px;
	}
	.left {
		transform: rotate(135deg);
		-webkit-transform: rotate(135deg);
	}
	.right {
		transform: rotate(-45deg);
		-webkit-transform: rotate(-45deg);
	}
	.arrow:active {
		border: solid black;
		border-width: 0 3px 3px 0;
	}
</style>
