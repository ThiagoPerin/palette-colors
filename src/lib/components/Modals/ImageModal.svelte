<script lang="ts">
    import { fly } from 'svelte/transition';
    import { extractColors } from 'extract-colors';
    import { createEventDispatcher } from 'svelte';
    import MiniColorCard from '../Cards/MiniColorCard.svelte';
    import { ColorUtils } from '$lib/utils/colorUtils';
    import CloseBtn from '../Buttons/CloseBtn.svelte';
    const dispatch = createEventDispatcher();

    let palleteResult: Array<{ color: string, textColor: string }> = [];
    let selectedImage: string | null = null;
    let colorsQtd: number = 0;

    // Handle image upload and extract the palette.
    async function handleImageUpload(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            const file = input.files[0];
            const reader = new FileReader();
            selectedImage = null;
            palleteResult = [];
            colorsQtd = 0;
            reader.onload = async () => {
                selectedImage = reader.result as string;
                try {
                    const colors = await extractColors(selectedImage);
                    colorsQtd = colors.length > 10 ? 10 : colors.length;
                    palleteResult = colors.slice(0, colorsQtd).map(color => ({
                        color: color.hex,
                        textColor: ColorUtils.getTextColor(color.hex)
                    }));
                } catch (error) {
                    console.error('Error extracting colors:', error);
                }
            };
            reader.readAsDataURL(file);
        }
    }

    // Dispatch the update with the selected palette.
    function updateColor() {
        dispatch('updateColor', {
            palette: {colorQtd: colorsQtd, palette: palleteResult}
        });
    }

    // Reset image upload
    function reset() {
        selectedImage = null;
        palleteResult = [];
    }

    // Handle drag over
    function handleDragOver(event: DragEvent) {
        event.preventDefault();
    }

    // Handle file drop
    function handleDrop(event: DragEvent) {
        event.preventDefault();
        const files = event.dataTransfer?.files;
        if (files && files.length > 0) {
            handleImageUpload({ target: { files: files } } as unknown as Event);
        }
    }
</script>

<div class="h-screen w-screen bg-[#000000bd] fixed left-0 top-0 flex items-center justify-center">
    <div class="h-fit w-5/6 xl:w-2/5 bg-gray-50 rounded-lg flex flex-col items-center justify-start p-4" in:fly={{ y: 100, duration: 600 }}>
        <div class="h-fit w-full flex justify-between items-center">
            <h2 class="text-2xl">Upload your image</h2>
            <CloseBtn on:close={() => dispatch('close')}/>
        </div>
        <div class="h-px w-full bg-slate-500 my-2"></div>
        <div class="h-full w-full flex flex-col justify-around items-center overflow-y-auto p-4">
            {#if palleteResult.length > 0}
                {#if selectedImage}
                    <img src={selectedImage} alt="Uploaded file showing colors" class="max-h-64 my-2" />
                {/if}
                <div class="h-fit w-full">
                    <div class="h-fit w-full flex justify-between items-center">
                        <h2 class="text-2xl">Result</h2>
                        <button class="h-10 w-10 bg-red-600 text-white p-2 rounded-md hover:bg-red-700 m-1" on:click={() => reset()}><i class="fas fa-trash"/></button>
                    </div>
                    <div class="h-px w-full bg-slate-500 my-2"></div>
                </div>
                <div class="w-full flex flex-wrap justify-between my-1">
                    {#each palleteResult as color}
                        <MiniColorCard item={color} colorQtd={colorsQtd}/>
                    {/each}
                </div>
                    <button class="bg-green-600 text-white p-2 rounded-md hover:bg-green-700 hover:text-white m-1" on:click={() => updateColor()}>Apply palette</button>
            {:else}
                <button class="flex items-center justify-center w-full" on:dragover={handleDragOver} on:drop={handleDrop}>
                    <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                        <div class="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                            <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                            </svg>
                            <p class="mb-2 text-md text-gray-500 p-2"><span class="font-semibold">Browse or drop image</span> or drag and drop</p>
                        </div>
                        <input id="dropzone-file" type="file" accept="image/*" class="hidden" on:change={handleImageUpload}/>
                    </label>
                </button>
            {/if}
        </div>
    </div>
</div>
