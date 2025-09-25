<script>
	// import docSearchImage from '$lib/assets/pdfdocsearchTs.png';
	import docSearchImage from 'static/pdfdocsearchTs.png';
	
	function handleDocSearchLink() {
		window.open('https://pdfdocsearch-sv-ts-production.up.railway.app/', '_blank');
	}
</script>

<div class="docsearch-container mt-1 flex h-full w-full flex-col items-center gap-4">
	<div
		class="docsearch-buttonlink w-60 justify-center border-6
                border-green-300 hover:border-green-600"
	>
		<button
			type="button"
			class="docsearch-go cursor-pointer transition-opacity hover:opacity-80
                focus:ring-2 focus:ring-blue-500 focus:outline-none"
			onclick={handleDocSearchLink}
		>
			<img
				src={docSearchImage}
				alt="Description"
				class="h-full w-full
            object-cover"
			/>
		</button>
	</div>
	<div class="docsearch-arch">
		<h1>Architecture ...</h1>
	</div>
	<div class="docsearch-comparison">
		<h1>React vs Svelte ...</h1>
	</div>
</div>

<style>
</style>
