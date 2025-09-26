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
<div class="portfolio-heading-container flex flex-col gap-4 py-4">
    <!-- Name and role on same line -->
    <div class="name-role-container ml-6 flex justify-center gap-2">
        <h1 class="devname text-xl font-bold">Damon Dantin</h1>
        <span class="text-gray-400">|</span>
        <p class="rolename text-gray-600">Software Developer</p>
    </div>
    
    <!-- PROJECTS section below -->
    <div class="flex flex-col items-center">
        <h1 class="text-xl md:text-2xl tracking-[0.25rem] sm:tracking-[0.5rem] 
			md:tracking-[1rem] lg:tracking-[2rem]">PROJECTS</h1>
        <!-- Tapered line below PROJECTS -->
        <div class="tapered-line mt-3"></div>
    </div>
</div>

<div class="flex w-full justify-center">
	<a
		href={resolve('/')}
		onclick={() => openTab('docsearch')}
		class="ml-6 {activeTab === 'docsearch' ? 'active text-green' : ''}"
	>
		SvelteKit-PdfDocSearch
	</a>
	<a
		href={resolve('/nextproject')}
		onclick={() => openTab('nextproject')}
		class="ml-6 {activeTab === 'nextproject' ? 'active text-green' : ''}"
	>
		Next Project
	</a>
</div>

{@render children()}

<style>
	.tapered-line {
		width: 850px; /* Fixed width instead of percentage for better control in grid */
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