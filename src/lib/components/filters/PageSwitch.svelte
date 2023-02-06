<script>
	import { iIndex, maxPages } from './../../stores/filtered_items_store';
import { arrowLeft, arrowRight } from '$lib/stores/filtered_items_store'

</script>



<button class="arrow left" on:click={arrowLeft}></button>
<div>{($iIndex[0])/20+1}/{$maxPages}</div>
<button class="arrow right" on:click={arrowRight}></button>


<style>
.arrow{
  border: solid #ccc;
  border-width: 0 3px 3px 0;
  background-color: transparent;
  display: inline-block;
  padding: 3px;
}
.left{
  transform: rotate(135deg);
  -webkit-transform: rotate(135deg);
}
.right{
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
}
.arrow:active{
  border: solid black;
  border-width: 0 3px 3px 0;
}

</style>