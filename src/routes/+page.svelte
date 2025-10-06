<script>
	//import docSearchImage from '$lib/assets/pdfdocsearchTs.png';
	import { asset } from '$app/paths';

	function handleDocSearchLink() {
		window.open('https://pdfdocsearch-sv-ts-production.up.railway.app/', '_blank');
	}
</script>

<div class="docsearch-container mt-1 flex h-full w-full flex-col items-center gap-4 px-4 sm:px-6 lg:px-8">
	<!-- Responsive clickable image - 4x larger -->
	<div
		class="docsearch-buttonlink w-48 sm:w-64 md:w-80 lg:w-96 xl:w-[30rem] justify-center border-4 sm:border-6
                border-green-300 hover:border-green-600 transition-colors duration-200"
	>
		<button
			type="button"
			class="docsearch-go cursor-pointer transition-all duration-200 hover:opacity-80 hover:scale-[1.02]
                focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-sm"
			onclick={handleDocSearchLink}
		>
			<img
				src={asset("/pdfdocsearchTs.png")}
				alt="PDF DocSearch Application Screenshot"
				class="h-full w-full object-cover rounded-sm"
			/>
		</button>
	</div>
	
	<!-- Responsive Architecture section -->
	<div class="docsearch-arch mt-4 sm:mt-6 lg:mt-8 text-center">
		<h1 class="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-medium text-gray-800">
			Architecture ...
		</h1>
	</div>
	
	<!-- Responsive React vs Svelte section -->
	<div class="docsearch-comparison mt-2 sm:mt-4 lg:mt-6 text-center">
		<h1 class="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-medium text-gray-800">
			React vs Svelte ...
		</h1>
	</div>
</div>

<style>
</style>
