<script lang="ts">
	import type { Readable, Writable } from 'svelte/types/runtime/store';
	import PageSwitch2 from './PageSwitch2.svelte';
	import type { StationItemsRepository } from '$lib/repositories/stations_repository';
	import type { StationDisplay } from 'src/types/stations.type';
	import Tag from '../tabs/Tag.svelte';

	export let id: number;
	export let name: string;
	export let imageUrl: string;
	export let research: number;
	export let progress: number;
	export let easy: boolean;
	export let special: boolean;
	// export let easy: boolean;
	export let repository: StationItemsRepository;
	let store: Readable<StationDisplay[]> | undefined;
	let currentPage: Writable<number>;
	let maxPage: Readable<number>;

	const ROOT_URL = 'https://terraria.wiki.gg/images/';
	$: {
		store = repository.displayedItems;
		currentPage = repository.currentPage;
		maxPage = repository.maxPage;
	}
	let tagColor: string;
	let tagText: string;

	$: {
		if (special == true) {
			tagColor = '#666';
			tagText = 'Special';
		} else if (research == progress) {
			tagColor = '#47A025';
			tagText = 'Researched';
		} else if (easy == true) {
			tagColor = '#79C4F2';
			tagText = 'Researchable';
		} else {
			tagColor = '#BA1B1D';
			tagText = 'Not Researched';
		}
	}
</script>

<div class="craft-container">
	<div class="upper-box">
		<div class="upper-left">
			<img class="station-image" src={imageUrl} alt={'id'} />
			<div class="craft-title">{name}</div>
		</div>
		<div class="upper-right">
			<div class="research-progress"><h4>{progress}/{research}</h4></div>
			<div class="research-status"><Tag --tag-color={tagColor} text={tagText} /></div>
		</div>
	</div>

	<div class="lower-box">
		<div class="craftable-header">
			<h6>Craftables</h6>
			<div class="page-switch">
				<PageSwitch2
					currentPage={currentPage}
					maxPages={maxPage}
					on:nextPage={repository.nPage}
					on:previousPage={repository.pPage}
				/>
			</div>
		</div>
		<div class="craftable-list">
			{#if $store}
				{#each $store as object}
					<div class="craftable-row">
						<img class="item-image" src={`${ROOT_URL}${object.imageUrl}`} alt="" />
						<div class="item-name">{object.name}</div>
					</div>
				{/each}
			{/if}
		</div>
	</div>
</div>

<style>
	.craft-container {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		padding: 16px;
		gap: 32px;

		width: 537px;
		height: 339px;

		background: #ffffff;

		box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.15);
		border-radius: 16px;
	}
	.upper-box {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		justify-content: space-between;
		width: 520px;
		height: 105px;
	}
	.upper-left {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		gap: 1em;

		width: 346px;
		height: 105px;
	}
	.station-image {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		padding: 0px;
		gap: 32px;
		object-fit: contain;
		width: 100px;
		height: 100px;
	}
	.craft-title {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		padding: 0px;

		width: 230px;
		height: 105px;

		font-family: 'Poppins';
		font-style: normal;
		font-weight: 700;
		font-size: 30px;
		line-height: 51px;

		text-align: center;
		letter-spacing: 0.0025em;
		color: #111111;
	}
	.upper-right {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-end;
		padding: 0px;
		gap: 4px;

		width: 136px;
		height: 105px;
	}
	.research-progress {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
		padding: 0px;
		gap: 10px;

		width: 92px;
		height: 51px;
	}
	.research-status {
		display: flex;
		flex-direction: row;
		justify-content: right;
		width: 180px;
		text-align: center;
		height: 50px;
	}
	.lower-box {
		display: flex;
		flex-direction: column;
		width: -webkit-fill-available;
	}
	.craftable-header {
		display: flex;
		flex-direction: row;
		flex-grow: 1;
		justify-content: space-between;
		align-items: center;
		padding: 0px;
	}
	.page-switch {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 0px;
		gap: 4px;

		width: 61px;
		height: 15px;
	}
	.craftable-list {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		justify-content: center;
		align-items: flex-start;
		flex-wrap: wrap;
		flex-grow: 1;
		padding: 1em;
		gap: 0.5em;
	}
	.item-image {
		display: flex;
		width: 25px;
		height: 25px;
		padding-right: 5px;
		object-fit: contain;
	}
	.item-name {
		overflow: hidden;
		height: 25px;
	}
	.craftable-row {
		display: flex;
		justify-content: flex-start;

		flex-grow: 1;
	}
</style>
