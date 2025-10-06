<script>
	import '../app.css';
	import { resolve } from '$app/paths';
	//import profileImage from '$lib/assets/ddface.png';

	let { children } = $props();
	let activeTab = $state('docsearch');

	/**
	 *
	 * @param {string} tabName
	 */
	function openTab(tabName) {
		console.log('Open tab:', tabName);
		activeTab = tabName;
	}
</script>
<div class="portfolio-heading-container flex flex-col gap-4 py-4 px-4 sm:px-6 lg:px-8">
    <!-- Name and role responsive layout -->
    <div class="name-role-container flex flex-col sm:flex-row justify-center items-center gap-1 sm:gap-2">
        <h1 class="devname text-3xl font-bold text-center sm:text-left">
            Damon Dantin
        </h1>
        <span class="text-gray-400 hidden sm:inline">|</span>
        <p class="rolename text-gray-600 text-center sm:text-left lg:text-2xl">
            Software Developer
        </p>
    </div>
    
    <!-- PROJECTS section responsive -->
    <div class="flex flex-col items-center mt-2 sm:mt-4">
        <h1 class="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 
                   tracking-[0.15rem] sm:tracking-[0.35rem] md:tracking-[0.7rem] 
                   lg:tracking-[1.3rem] xl:tracking-[2rem] text-center font-medium">
            PROJECTS
        </h1>
        <!-- Responsive tapered line -->
        <div class="tapered-line mt-2 sm:mt-3"></div>
    </div>
</div>

<div class="flex w-full justify-center px-4 sm:px-6">
    <div class="flex flex-col sm:flex-row gap-2 sm:gap-6 items-center">
        <a
            href={resolve('/')}
            onclick={() => openTab('docsearch')}
            class="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl px-3 py-1 rounded transition-colors 
                   {activeTab === 'docsearch' ? 'active text-green font-semibold' : 'hover:text-gray-600'}"
        >
            SvelteKit-PdfDocSearch
        </a>
        <a
            href={resolve('/nextproject')}
            onclick={() => openTab('nextproject')}
            class="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl px-3 py-1 rounded transition-colors 
                   {activeTab === 'nextproject' ? 'active text-green font-semibold' : 'hover:text-gray-600'}"
        >
            Next Project
        </a>
    </div>
</div>

{@render children()}

<style>
	.tapered-line {
		/* Responsive width using CSS custom properties and Tailwind breakpoints */
		width: min(90vw, 300px); /* Mobile: 90% viewport width, max 300px */
		height: 2px;
		background: linear-gradient(
			to right,
			transparent 0%,
			currentColor 20%,
			currentColor 80%,
			transparent 100%
		);
		opacity: 0.7;
	}

	/* Responsive tapered line widths */
	@media (min-width: 640px) {
		.tapered-line {
			width: min(80vw, 500px); /* Tablet: 80% viewport width, max 500px */
		}
	}

	@media (min-width: 768px) {
		.tapered-line {
			width: min(70vw, 650px); /* Small desktop: 70% viewport width, max 650px */
		}
	}

	@media (min-width: 1024px) {
		.tapered-line {
			width: min(60vw, 850px); /* Large desktop: 60% viewport width, max 850px */
		}
	}

	.active {
		color: green;
		font-weight: bold;
	}

	.active:hover {
		color: darkgreen;
	}
</style>

<!-- Profile image -->
<!-- <div
			class="profile-image-container ml-2 h-20 w-20 overflow-hidden rounded-full border-2 border-gray-300"
		>
			<img
				src={profileImage}
				alt="Profile"
				class="profile-image h-full w-full -translate-x-[10px]
                                                  translate-y-[10px] scale-150 object-cover"
			/>
		</div> -->