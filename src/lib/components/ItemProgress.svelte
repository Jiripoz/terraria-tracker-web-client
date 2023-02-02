<script lang="ts">
	import type { Item } from 'src/types/item.type';
	import Tag from './tabs/Tag.svelte';

	export let item: Item;
	const ROOT_URL = 'https://terraria.wiki.gg/images/';

	let tagColor: string;
	let tagText: string;

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
		<div class="caption">descrição etc</div>
	</div>

	<div class="bottom-container">
		<div class="item-property">O O O</div>
		<div class="see-recipe">See Recipes</div>
	</div>
</div>

<style>
	.item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 2em;
		gap: 2em;
		width: 352.67px;
		height: 287px;
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
		height: 33px;
		box-sizing: border-box;
	}
	.name-description {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		padding: 0px;
		gap: 10px;
	}
	.item-name {
		margin-top: 0;
		margin-bottom: 0;
	}
	.bottom-container {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 100%;
	}
	.item-property {
	}
	.see-recipe {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding: 4px 6px;

		width: 105px;
		height: 29px;
		background: #888;
		box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.15);
		border-radius: 8px;
		color: #ffffff;
	}
</style>
