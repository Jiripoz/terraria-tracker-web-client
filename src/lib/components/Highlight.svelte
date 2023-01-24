<script lang="ts">
    export let big: string;
    export let small: string | undefined;
    export let description: string;
</script>

<div>
    <h2>{big}</h2>
    <sub class="body1">{#if small}<span>{small} </span>{/if}{description}</sub>
</div>

<style>
    div {

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 16px;

        width: 255px;
        height: 170px;

        background: linear-gradient(0deg, #FFFFFF, #FFFFFF), #111111;
        box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.15);
        border-radius: 16px;
        
    }

    sub {
        overflow: hidden;
    }

    span {
        font-weight: 700;
    }
</style>
