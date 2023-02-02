<script>
	import logo from '$lib/images/terraria.png';
</script>

<header>
	<div class="corner">
		<a href="http://localhost:5173">
			<div>
				<img src={logo} alt="Terraria!" />
			</div>
		</a>
	</div>

	<div class="corner" />
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
	}

	.corner {
		width: 6em;
		height: 3em;
		padding-left: 2em;
		padding-top: 0.5em;
	}

	.corner a {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	.corner img {
		width: 6em;
		height: 3em;
		object-fit: contain;
	}

	a:hover {
		color: var(--color-theme-1);
	}
</style>
