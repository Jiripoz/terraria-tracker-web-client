<script lang="ts">
	import type { Item } from 'src/types/item.type';
	import Tag from '../components/tabs/Tag.svelte';
	import { slide } from 'svelte/transition'
	import ItemRecipes from './recipes/ItemRecipes.svelte';
	import type { RecipesRepository } from '$lib/repositories/recipes_repository';
	import { recipesRepository } from '$lib/stores/di';
	

	export let item: Item;
	const ROOT_URL = 'https://terraria.wiki.gg/images/';
	
	const recipesStore = recipesRepository.itemRecipes;

	let tagColor: string;
	let tagText: string;
	let size = 310;
	
	$: {
		if (item.research == item.item_progress) {
			tagColor = '#47A025';
			tagText = 'Researched';
		} else if (item.easy == true) {
			tagColor = '#79C4F2';
			tagText = 'Researchable';
		} else {
			tagColor = '#BA1B1D';
			tagText = 'Not Researched';
		}
	}
	let content = 'See Recipes'
	let showContent = false
	const handleClick= () =>{
		showContent = !showContent
		if (showContent==true){
			content="Hide Recipes"
		} else if (showContent==false){
			content="See Recipes"
		}
	}
</script>

<div class="item">
	<div class="top-container">
		<img class="image" src={`${ROOT_URL}${item.imageUrl}`} alt={item.itemUrl} />

		<div class="right-upper-box">
			<div class="research-progress">{item.item_progress}/{item.research}</div>
			<div class="research-status"><Tag --tag-color={tagColor} text={tagText} /></div>
		</div>
	</div>
	<div class="name-description">
		<div class="item-name"><h5>{item.name}</h5></div>
		<div class="caption">{item.tooltip}</div>
	</div>
	<div class="bottom-container">
		<div class="interaction-container">
			<button class="see-recipe" on:click={() => handleClick()}>{content}</button>
		</div>
		<div class="recipe-container">
			{#if showContent == true && recipesStore != undefined}
				<div class="recipe-list" transition:slide={{duration:400}}>
					<ItemRecipes recipe={recipesStore[item.id]}></ItemRecipes>
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	.caption {
		text-align: center;
		height: 2.5em;
		overflow: hidden;
	}
	.item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 2em;
		gap: 2em;
		width: 360px;
		height: calc(var(--size)*1px);
		box-sizing: border-box;
		background: linear-gradient(0deg, #ffffff, #ffffff), #111111;
		box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.15);
		border-radius: 1em;
	}
	.top-container {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		gap: 1em;
		justify-content: space-between;
		width: 100%;
	}
	.image {
		display: flex;
		flex-direction: column;
		align-items: right;
		padding: 0px;
		gap: 1em;
		height: 80px;
		width: 80px;
		object-fit: contain;
	}
	.right-upper-box {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-end;
		padding: 0px;
		gap: 4px;
	}
	.research-progress {
		font-weight: 700;
		font-size: 34px;
		line-height: 51px;
		letter-spacing: 0.0025em;
		color: #111111;
	}
	.research-status {
		width: auto;
		box-sizing: border-box;
	}
	.name-description {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		padding: 0px;
		gap: 10px;
	}
	.item-name {
		margin-top: 0;
		margin-bottom: 0;
		text-align: center;
	}
	.bottom-container {
		display: flex;
		flex-direction: column;
		width: 100%;
	}
	.interaction-container {
		display: flex;
		flex-direction: row;
		justify-content: right;
		width: 100%;
	}
	.see-recipe {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding: 4px 6px;

		width: 105px;

		background: #58355E;

		box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.15);
		border-radius: 8px;
		border-width: 0px;

		font-family: 'Poppins';
		color: #ffffff;
		font-style: normal;
		font-weight: 500;
		font-size: 14px;
		line-height: 21px;
	}
	.recipe-list {
		margin-top: 1em;
	}
</style>
