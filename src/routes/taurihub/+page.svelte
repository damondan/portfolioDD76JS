<script>
	/** @type {{ videoUrl: string }} */
	export let data;
</script>

<div class="taurihubVidContainer flex flex-col items-center">
    <video 
        src={data.videoUrl} controls 
        class="w-full max-w-4xl rounded-lg shadow-lg"
    >
		<track kind="captions" />
	</video>
    <div class="docsearch-arch mt-4 sm:mt-6 lg:mt-8 w-full">
		<h1 class="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-medium text-gray-800 text-center mb-6">
			Architecture
		</h1>
	</div>
    <div class="w-full -mt-2">
        <p class="text-center">Front End - SvelteKit, Typescript, CSS, TailwindCss</p>
        <p class="text-center">Back End  - Rust/Tauri Core</p>
        <p class="text-center">AI Tools - ChatGpt, Warp AI</p>
    </div>

</div>
