<script lang="ts">
export let text:string ;
</script>

<div class="tag-style">{text}
</div>


<style>

    .tag-style {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        padding: 6px 12px;
        gap: 16px;
        border-radius: 66px;
        color: #FFFFFF;
        background: var(--tag-color);
        border: 3px solid var(--tag-color);
    }
    
</style>