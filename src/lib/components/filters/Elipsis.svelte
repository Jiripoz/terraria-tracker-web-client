<script lang="ts">

    export let isEasy: boolean;
    export let research: number;
    export let progress: number;

    let elipsisColor: string;

    $: {
		if (research == progress) {
			elipsisColor = '#47A025';
		} else if (isEasy == true) {
			elipsisColor = '#79C4F2';
		} else {
			elipsisColor = '#BA1B1D';
		}
    }

</script>


<div class="elipsis-style" style="--elipsis-color:{elipsisColor}"></div>

<style>
    .elipsis-style {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: 16px;
		border-radius: 66px;
		color: var(--tag-color);
		background: #ffffffff;
		border: 3px solid var(--elipsis-color);
		font-weight: 550;
        width: 25px;
        height: 25px;
    }

</style>