<script>
  import '../../app.css';
  import profileImage from '$lib/assets/ddface.png';

  let { children } = $props();
  let activeTab = $state("docsearch");

/**
 * 
 * @param {string} tabName
 */
  function openTab(tabName) {
    console.log("Open tab:", tabName);
    activeTab = tabName;
  }

</script>

<div class="portfolio-heading-container grid grid-cols-3 gap-4 py-4 items-start">
  <!-- Left column: Profile image, name and role -->
  <div class="flex items-center gap-4">
    <!-- Profile image -->
    <div class="profile-image-container w-20 h-20 rounded-full overflow-hidden border-2 border-gray-300 ml-2">
      <img src={profileImage} alt="Profile" class="profile-image w-full h-full object-cover 
                                                  scale-150 -translate-x-[10px] translate-y-[10px]" />
    </div>
    
    <!-- Name and role -->
    <div class="name-role-container">
      <h1 class="devname text-xl font-bold">Damon Dantin</h1>
      <p class="rolename text-gray-600">Software Developer</p>
    </div>
  </div>

  <!-- Center column: PROJECTS and tapered line -->
  <div class="flex flex-col items-center mt-6">
    <h1 class="text-2xl tracking-[2rem]">PROJECTS</h1>
    <!-- Tapered line below PROJECTS -->
    <div class="tapered-line mt-3"></div>
  </div>

</div>

<div class="flex justify-center w-full">
  <a 
    href="/"
    onclick={() => openTab("docsearch")} 
    class="ml-6 {activeTab === 'docsearch' ? 'active text-green' : ''}">
    SvelteKit-PdfDocSearch
  </a>
  <a 
    href="/nextproject" 
    onclick={() => openTab("nextproject")}
    class="ml-6 {activeTab === 'nextproject' ? 'active text-green' : ''}">
    Next Project
  </a>
</div>

{@render children()}

<style>
  .tapered-line {
    width: 850px; /* Fixed width instead of percentage for better control in grid */
    height: 2px;
    background: linear-gradient(to right, 
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