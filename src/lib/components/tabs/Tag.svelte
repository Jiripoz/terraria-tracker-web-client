<script lang="ts">
	export let text: string;
</script>

<div class="tag-style">{text}</div>

<style>
	.tag-style {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		padding: 6px 12px;
		gap: 16px;
		border-radius: 66px;
		color: var(--tag-color);
		background: #ffffffff;
		border: 3px solid var(--tag-color);
		font-weight: 550;
	}
</style>
