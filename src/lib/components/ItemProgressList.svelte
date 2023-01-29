<script lang="ts">
    import { itemProgressStore} from "../stores/store";
    import ItemProgress from "./ItemProgress.svelte";
    import { itemsStore } from "../stores/store";

    function fetchUrl(itemid: number) {
        const itemUrl = JSON.stringify($itemsStore?.[itemid-1]["itemUrl"]).replace(/['"]+/g, '');
        return itemUrl
    }
    
    function fetchImg(itemid: number) {
        const itemImg = JSON.stringify($itemsStore?.[itemid-1]["imageUrl"]).replace(/['"]+/g, '');
        return itemImg
    }

</script>

<div class="items-container">
    {#if $itemProgressStore}
    {#each $itemProgressStore.partially_researched as item}
    <div class="item-wrapper">
        <ItemProgress 
            name = {item.name}
            imageUrl={fetchImg(item.id)} 
            itemUrl={fetchUrl(item.id)}
            item_progress={item.item_progress}
            research_needed={item.research_needed}>
        </ItemProgress>
    </div>

    {/each}
    {/if}
</div>

<style>
.item-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 0.5em;
}
.items-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: -0.5em;
}
</style>
