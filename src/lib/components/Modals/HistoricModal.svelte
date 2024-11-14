<script lang="ts">
    import { fly } from 'svelte/transition';
    import { createEventDispatcher } from 'svelte';
	import MiniColorCard from '../Cards/MiniColorCard.svelte';
	import CloseBtn from '../Buttons/CloseBtn.svelte';
    const dispatch = createEventDispatcher();

    export let paletteHistoric = [] as Array<{colorQtd: number, datetime: string, palette: Array<{color: string, textColor: string}>}>;

    // Dispatch the update with the selected palette.
    function updateColor(palette: {colorQtd: number, palette: Array<{color: string, textColor: string}>}) {
        dispatch('updateColor', {
            palette: palette
        });
    }

    // Reset the historic.
    function reset() {
        localStorage.setItem('paletteHistoric', JSON.stringify([]));
        paletteHistoric = [];
        dispatch('resetHistoric')
    }
</script>

<div class="h-screen w-screen bg-[#000000bd] fixed left-0 top-0 flex items-center justify-center">
    <div class="h-3/4 w-4/5 bg-gray-100 rounded-lg flex flex-col items-center justify-start p-4" in:fly={{ y: 100, duration: 600 }}>
        <div class="h-fit w-full flex justify-between items-center">
            <h2 class="text-2xl">Pallete Historic</h2>
            <div class="flex">
                <button class="h-10 w-10 bg-red-600 text-white p-2 rounded-md hover:bg-red-700 flex items-center justify-center mx-1" on:click={() => reset()}><i class="fas fa-trash"/></button>
                <CloseBtn on:close={() => dispatch('close')}/>
            </div>
        </div>
        <div class="h-px w-full bg-slate-500 my-2"></div>
        <div class="h-full w-full flex flex-col overflow-y-auto">
            {#if paletteHistoric.length > 0} 
                {#each paletteHistoric as palette}
                    <div class="text-md font-bold"><i class="fa-regular fa-clock mr-2"/>{palette.datetime}</div>
                    <button class="h-48 w-full flex justify-between my-1 hover:border-black hover:border-4 hover:my-0 rounded-md" on:click={() => updateColor(palette)}>
                        {#each palette.palette as color}
                            <MiniColorCard item={color} colorQtd={palette.colorQtd}/>
                        {/each}
                    </button>
                    <div class="h-px w-full bg-slate-500 my-2"></div>
                {/each}
            {:else}
                <div class="h-full w-full flex flex-col items-center justify-center text-3xl">
                    <i class="fa-regular fa-face-smile-wink text-9xl"></i>
                    <div class="text-3xl font-bold my-3 text-center">There are no palettes saved yet</div>
                    <div class="text-2xl text-center">Please save the ones you like!</div>
                </div>
            {/if}
        </div>
    </div>
</div>