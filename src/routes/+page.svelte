<script>
	//import docSearchImage from '$lib/assets/pdfdocsearchTs.png';
	import { asset } from '$app/paths';
	import DiagramSection from '$lib/components/DiagramSection.svelte';

	let showInfo = false;

	function handleDocSearchLink() {
		window.open('https://pdfdocsearch-sv-ts-production.up.railway.app/', '_blank');
	}

	function handleMouseEnter() {
		showInfo = true;
	}

	function handleMouseLeave() {
		showInfo = false;
	}
</script>

<div class="docsearch-container mt-1 flex h-full w-full flex-col items-center gap-4 px-4 sm:px-6 lg:px-8">
	<!-- Responsive clickable image with info overlay -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="docsearch-buttonlink w-48 sm:w-64 md:w-80 lg:w-96 xl:w-[30rem] justify-center border-4 sm:border-6
                border-green-300 hover:border-green-600 transition-colors duration-200 relative group"
		 onmouseenter={handleMouseEnter}
		 onmouseleave={handleMouseLeave}>
		<button type="button"
			class="docsearch-go cursor-pointer transition-all duration-200 hover:opacity-80 hover:scale-[1.02]
                focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-sm relative w-full"
			onclick={handleDocSearchLink}>
			<img
				src={asset("/pdfdocsearchTs.png")}
				alt="PDF DocSearch Application Screenshot"
				class="h-full w-full object-cover rounded-sm transition-all duration-200
					   {showInfo ? 'brightness-50' : 'brightness-100'}"
			/>
			
			<!-- Info overlay -->
			{#if showInfo}
				<div class="absolute inset-0 flex items-center justify-center p-4 rounded-sm
						   bg-black bg-opacity-40 transition-all duration-200 ease-in-out">
					<div class="text-white text-center max-w-full">
						<h3 class="text-sm sm:text-base md:text-lg font-bold mb-2">PDF DocSearch</h3>
						<p class="text-xs sm:text-sm md:text-base leading-relaxed">
							A full-stack SvelteKit application that searches through up to 50 pdf books to return results 
							from the entered search query. Returns page number, sentence, and page of sentence. Other 
							functionality will be added but will be added to the Tauri downloadable app below(a to do). 
						</p>
						<p class="text-xs sm:text-sm mt-2 font-medium opacity-90">
							Click to explore the live application →
						</p>
					</div>
				</div>
			{/if}
		</button>
	</div>
	
	<!-- Responsive Architecture section -->
	<div class="docsearch-arch mt-4 sm:mt-6 lg:mt-8 w-full">
		<h1 class="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-medium text-gray-800 text-center mb-6">
			Architecture
		</h1>
	</div>
</div>

<!-- Architecture diagram - full width outside main container -->
<div class="w-full -mt-2">
	<p class="text-center">Portfolio Front End - (Hosted on Github Pages) SvelteKit, Typescript, CSS, TailwindCss</p>
	<p class="text-center">PdfSearch App Front End - (Hosted on Railway) SvelteKit, Typescript, CSS, TailwindCss</p>
	<p class="text-center">PdfSearch App Back End - (Hosted on Atlas MongoDb) - Pdf books</p>
	<p class="text-center">AI Tools - ChatGpt, Warp AI</p>
	<DiagramSection />
</div>

<div class="docsearch-container mt-4 flex h-full w-full flex-col items-center gap-4 px-4 sm:px-6 lg:px-8">
	
	<!-- Responsive React vs Svelte section -->
	<div class="docsearch-comparison mt-2 sm:mt-4 lg:mt-6 text-center">
		<h1 class="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-medium text-gray-800">
			React vs Svelte ...
		</h1>
	</div>
</div>

<style>
</style>
