<script lang="ts">
    import { onMount } from 'svelte';
    import { ColorUtils } from "$lib/utils/colorUtils";
    import WcagScoreCard from '$lib/components/Cards/WcagScoreCard.svelte';
    import HorizontalDivider from '$lib/components/Dividers/HorizontalDivider.svelte';

    let bgColor = "#4B5563";
    let textColor = "#ffffff";
    let contrast: { contrast: number; classification: string; };

    function calculateContrast() {
        contrast = ColorUtils.getContrastRatio(bgColor, textColor);
        saveColorsToLocalStorage();
    }

    function saveColorsToLocalStorage() {
        localStorage.setItem("bgColor", bgColor);
        localStorage.setItem("textColor", textColor);
    }

    function loadColorsFromLocalStorage() {
        const storedBgColor = localStorage.getItem("bgColor");
        const storedTextColor = localStorage.getItem("textColor");

        if (storedBgColor) bgColor = storedBgColor;
        if (storedTextColor) textColor = storedTextColor;
    }

    onMount(() => {
        loadColorsFromLocalStorage();
        calculateContrast();
    });
</script>

<title>Font Contrast</title>

<div class="flex-grow flex items-center justify-center p-4 overflow-auto bg-gray-200"> 
    <div class=" h-fit md:h-5/6 w-full md:w-3/4 bg-white flex p-4 rounded-xl flex-col md:flex-row shadow-xl overflow-hidden">
        <div class="h-1/2 md:h-full w-full md:w-1/2 flex flex-col text-white justify-evenly p-4 rounded-xl border-gray-400 border" style="background-color: {bgColor}; color: {textColor};">
            <div class=" text-5xl md:text-7xl">Lorem ipsum dolor</div>
            <div class="text-xl md:text-3xl my-2.5">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
            <div class="text-lg hidden md:flex">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam felis dolor, accumsan id imperdiet at, porta id risus.</div>
        </div>
        <div class="h-fit md:h-full w-full md:w-1/2 flex flex-col text-black justify-start items-center p-4">
            <div class="h-fit w-full flex items-center justify-evenly flex-wrap my-4">
                <div class="w-fit h-fit flex flex-col items-center">
                    <label for="bgColor" class="block text-xl font-medium mb-2">Background color</label>
                    <div class="flex items-center">
                        <input name="bgColor" type="color" class="p-1 h-10 w-14 block bg-white border border-gray-200 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none" id="bgColor" bind:value={bgColor} on:input={() => calculateContrast()} title="Choose your background color">
                        <label for="bgColor" class="text-lg ml-2">{bgColor.toUpperCase()}</label>
                    </div>
                </div>
                <div class="w-fit h-fit flex flex-col items-center">
                    <label for="hs-color-input" class="block text-xl font-medium mb-2">Text color</label>
                    <div class="flex items-center">
                        <input type="color" class="p-1 h-10 w-14 block bg-white border border-gray-200 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none" id="hs-color-input" bind:value={textColor} on:input={() => calculateContrast()} title="Choose your text color">
                        <div class="text-lg ml-2">{textColor.toUpperCase()}</div>
                    </div>
                </div>
            </div>
            <HorizontalDivider/>
            <div class="flex-grow w-full flex flex-col items-center justify-evenly">
                <div class="text-3xl text-center">WCAG Contrast Ratio</div>
                {#key  contrast}
                    {#if contrast}
                        <WcagScoreCard contrast={contrast}/>
                    {/if}
                {/key}
            </div>
        </div>
    </div>
</div>