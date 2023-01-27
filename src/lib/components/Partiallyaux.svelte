<script lang="ts">
    export let name: string;
    export let item_progress: number;
    export let research_needed: number;
    export let progress: number;
</script>


<div class="item">
name: {name},
item progress: {item_progress}, 
research needed: {research_needed}, 
progress: {progress}%;
</div>


<style>
.item {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 16px;
    gap: 16px;

    width: 269px;
    height: 287px;

    background: linear-gradient(0deg, #FFFFFF, #FFFFFF), #111111;

    box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.15);
    border-radius: 16px;

    }


</style>