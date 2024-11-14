<script>
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
    import { paletteType } from "$lib/stores/paletteStore";
	import Sidebar from "./Sidebar.svelte";

    let sidebarVisible = false;
    let currentPaletteType = 'random';
    let currentUrl = $page.url.pathname;
    $: {
        currentUrl = $page.url.pathname;
        sidebarVisible = false;
    }
  
    paletteType.subscribe((value) => {
        currentPaletteType = value;
    });

    function toggleSidebar() {
        sidebarVisible = !sidebarVisible;
    }
</script>

<div class="h-fit w-full bg-main-color flex justify-between items-center text-white p-2 relative">
    <div class="flex justify-center items-start">
        <h1 class="sm:text-5xl text-4xl mr-2 sm:mr-3">Palette</h1>
        <div class="sm:text-3xl text-xl font-light">colors</div>
    </div>
    <div class="flex items-center">
        {#if currentUrl !== "/fontContrast"}
            <div class="text-xl mr-2.5 hidden sm:flex absolute left-1/2 transform -translate-x-1/2">{currentPaletteType.toUpperCase()}</div>
            <button class="w-fit h-10 text-xl border-white border-2 text-white p-2 rounded-md hover:bg-white hover:text-black flex items-center justify-center mx-1" title="Font Contrast" on:click={() => goto("/fontContrast")}><i class="fa-solid fa-circle-half-stroke"/></button>
            <button class="w-10 h-10 text-xl border-white border-2 text-white p-2 rounded-md hover:bg-white hover:text-black flex items-center justify-center mx-1" on:click={toggleSidebar}><i class="fas fa-bars"/></button>
        {:else}
            <div class="text-xl mr-2.5 hidden sm:flex absolute left-1/2 transform -translate-x-1/2">FONT CONTRAST</div>
            <button class="w-fit h-10 text-xl border-white border-2 text-white p-2 rounded-md hover:bg-white hover:text-black flex items-center justify-center mx-1" on:click={() => goto("/")}><i class="fa-solid fa-palette"/></button>
        {/if}
    </div>
</div>

{#if sidebarVisible}
    <Sidebar on:close={toggleSidebar}/>
{/if}