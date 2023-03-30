<script lang="ts">

    export let isEasy: boolean;
    export let research: number;
    export let progress: number;
	export let special:boolean;
	export let image:string;


    let elipsisColor: string;
	
    $: {
		if (special == true){
			elipsisColor = '#666';
		}
		else if (research == progress) {
			elipsisColor = '#47A025';
		} else if (isEasy == true) {
			elipsisColor = '#79C4F2';
		} else {
			elipsisColor = '#BA1B1D';
		}
    }

</script>


<div class="elipsis-style" style="--elipsis-color:{elipsisColor}">
	<img class="elipsis-inside" src={image} alt=""/>	
</div>

<style>
    .elipsis-style {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: 16px;
		border-radius: 10px;
		color: var(--tag-color);
		border: 3px solid var(--elipsis-color);
		font-weight: 550;
        width: 25px;
        height: 25px;
		
    }
	.elipsis-inside {
		display: flex;
		flex-direction: column;
		align-items: right;
        width: 25px;
        height: 25px;
		border-radius: 7px;
		object-fit: contain;
		
	}

</style>