<script lang="ts">
	import Elipsis from './../../components/filters/Elipsis.svelte';
	import PageSwitch2 from "$lib/components/stations/PageSwitch2.svelte";
    import type { ItemRecipeRepository } from "$lib/repositories/recipes_repository";
	import type { Ingredients, Recipe, RecipeStation } from "src/types/recipes.type";
	import type { Readable, Writable } from "svelte/store";
	import ElipsisWithImage from '$lib/components/filters/ElipsisWithImage.svelte';


    const ROOT_URL = 'https://terraria.wiki.gg/images/';
    export let recipe: ItemRecipeRepository; 

    let display: Readable<Recipe>;
    let maxPage: Readable<number>;
    let currentPage: Writable<number>
    let ingredients: Readable<Ingredients[]>
    let station: Readable<RecipeStation>

    $: {
        display = recipe.displayedRecipe;
        maxPage = recipe.maxPage;
        currentPage = recipe.currentPage
        ingredients = recipe.displayedIngredients
        station = recipe.displayedStation
    }

</script>

<div class="recipe-container">
    <div class="top-container">
        <div class="recipe">Recipe</div>
            <div class="recipe-station-container">
            <div class="recipe-station"><ElipsisWithImage isEasy={$station.easy} research={$station.research} progress={$station.item_progress} special={$station.special} image={$station.imageUrl}/></div>
        </div>
    </div>
    <div class="bottom-container">
        <div class="ingredient-list">
            {#each $ingredients as ingredient}
                <div class="ingredient">
                <div class="ingredient-left">
                    
                    <img src={`${ROOT_URL}${ingredient.imageUrl}`} alt=""/>
                    <div class="body2 ingredient-name">{ingredient.name}</div>
                    
                </div>
                <div class="ingredient-right">    
                    <div class="body2 amount">{ingredient.amount}</div>
                    <div class="ingredient-right"><Elipsis isEasy={ingredient.easy} research={ingredient.research} progress={ingredient.item_progress}/></div>
                </div>
                </div>  
            {/each}
            </div>
    </div>
    <div class="page-switch">
        <PageSwitch2
        currentPage={currentPage}
        maxPages={maxPage}
        on:nextPage = {recipe.nextPage}
        on:previousPage = {recipe.previousPage}
        />
    </div>
</div>

<style>
    .recipe-container {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        padding: 0px;
        gap: 16px;

        width: 296px;
        height: fit-content;
    }
    .top-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 0px;
        gap: 119px;

        width: 296px;
        height: 30px;
    }
    .recipe-station {

    }
    .bottom-container {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        padding: 0px;
        gap: 8px;

        width: 296px;
        height: fit-content;
    }
    .ingredient-list {
        display:flex;
        flex-direction: column;
        

    }
    .ingredient {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 0px;
        gap: 10px;

        width: 296px;
        height: 25px;
    }
    .ingredient-left {

        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 0px;
        gap: 8px;

        height: 25px;
    }
    .page-switch{
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 0px;
        gap: 4px;

        width: 61px;
        height: 15px;
    }
    .ingredient-name {
        display:flex;
        height: 21px;
        text-align: center;
        letter-spacing: 0.0025em;
        justify-content: center;
        align-items: center;
        overflow: hidden;
    }
    .ingredient-right {
        display:flex;
        flex-direction: row;
    }
    .amount {
        font-weight: 700;
        padding-right: 1em;
    }
</style>