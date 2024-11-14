<script lang="ts">
	import { onMount } from 'svelte';
	import ColorCard from "$lib/components/Cards/ColorCard.svelte";
	import ColorQtdCounter from "$lib/components/Counters/ColorQtdCounter.svelte";
	import HistoricModal from "$lib/components/Modals/HistoricModal.svelte";
	import ImageModal from "$lib/components/Modals/ImageModal.svelte";
	import SuccessAlert from "$lib/components/Alerts/SuccessAlert.svelte";
	import { ColorUtils } from "$lib/utils/colorUtils";
	import { paletteType } from "$lib/stores/paletteStore";

	let historicModal = false;
	let imageModal = false;
	let saveAlert = false;
	let colorQtd = 5;
	let paletteResult = [] as Array<{color: string, textColor: string}>;
	let paletteHistoric = [] as Array<{colorQtd: number, datetime: string, palette: Array<{color: string, textColor: string}>}>;
	let currentPaletteType = 'random'; // initial value
  
	// Update the palette type automatically when the store changes
	paletteType.subscribe((value) => {
		currentPaletteType = value;
		generatePalette(); // Regenerates the palette whenever the type changes
	});

	// Saves the most recent palette.
	function savePalette() {
		const date = new Date();
		paletteHistoric.push({ colorQtd: colorQtd, datetime: date.toLocaleString(), palette: JSON.parse(JSON.stringify(paletteResult)) });
		if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
			localStorage.setItem('paletteHistoric', JSON.stringify(paletteHistoric));
		}
		saveAlert = true;
	}

	// Load the historic from the storage.
	function loadHistoricFromStorage() {
		if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
			const savedHistoric = localStorage.getItem('paletteHistoric');
			if (savedHistoric) {
				paletteHistoric = JSON.parse(savedHistoric);
			}
		}
	}

	// Generate a randon palette.
	function generatePalette() {
		paletteResult = [];

		switch (currentPaletteType) {
			case 'monochromatic':
				paletteResult = ColorUtils.getMonochromaticPalette(colorQtd, null);
				break;
			case 'analogous':
				paletteResult = ColorUtils.getAnalogousPalette(colorQtd);
				break;
			case 'triadic':
				paletteResult = ColorUtils.getTriadicPalette(colorQtd);
				break;
			case 'tetradic':
				paletteResult = ColorUtils.getTetradicPalette(colorQtd);
				break;
			default: // 'random'
				for (let i = 0; i < colorQtd; i++) {
					paletteResult.push(ColorUtils.getRandomColor());
				}
				break;
		}
	}

	// Handle the color quantity change.
	function handleQtdChange(event: { detail: number }) {
		const newQtd = event.detail;

		if (newQtd < colorQtd) {
			paletteResult.splice(newQtd);
		} else {
			const additionalColors = generateAdditionalColors(currentPaletteType, newQtd).slice(-1);
			paletteResult.push(...additionalColors.slice(-1));
		}

		colorQtd = newQtd;
	}

	// Generate additional colors following the selected palette type.
	function generateAdditionalColors(type: string, qtd: number) {
		switch (type) {
			case 'monochromatic':
				return ColorUtils.getMonochromaticPalette(qtd, paletteResult[0]?.color);
			case 'analogous':
				return ColorUtils.getAnalogousPalette(qtd);
			case 'triadic':
				return ColorUtils.getTriadicPalette(qtd);
			case 'tetradic':
				return ColorUtils.getTetradicPalette(qtd);
			default:
				return Array.from({ length: qtd }, () => ColorUtils.getRandomColor());
		}
	}

	// Update the palette with another palette
	function updateColor (event: { detail: { palette: { palette: { color: string; textColor: string; }[]; colorQtd: number; }; }; }) {
		paletteResult = [];
		paletteResult = JSON.parse(JSON.stringify(event.detail.palette.palette));
		historicModal = false;
		imageModal = false;
		colorQtd = event.detail.palette.colorQtd;
	}

	// Upadte the palette with the custom color choosed.
	function updateCardColor(event: {newColor: string}, index: number) {
		paletteResult[index].color = event.newColor;
		paletteResult[index].textColor = ColorUtils.getTextColor(event.newColor);
	}

	// Hanlde the historic modal.
	function handleHistoricModal () {
		historicModal = !historicModal;
	}

	// Handle the image upload modal.
	function handleImageModal () {
		imageModal = !imageModal;
	}

	// Handle the save image alert.
	function handleSaveAlert () {
		saveAlert = false
	}
	
	onMount(() => {
		loadHistoricFromStorage();
		generatePalette();
	});
</script>
<title>Palette Colors</title>

<div class="flex-grow flex flex-col-reverse items-center sm:flex-col"> 
	<div class="h-fit w-full flex flex-wrap justify-center xs:justify-between items-center text-black p-2">
		<div class="flex items-center">
			<button class="h-10 w-10 bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 m-0.5" on:click={() => savePalette()}><i class="fa-solid fa-floppy-disk"/></button>
			<button class="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 m-0.5" on:click={() => handleHistoricModal()}>Historic</button>
			<button class="h-10 w-10 bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 m-0.5" on:click={() => handleImageModal()}><i class="fa-solid fa-image"/></button>
		</div>
		<div class="flex items-center">	
			{#key colorQtd}
				<ColorQtdCounter colorQtd={colorQtd} on:changeQtd={handleQtdChange}/>
			{/key}
			<button class="bg-green-600 text-white p-2 rounded-md hover:bg-green-700 m-1" on:click={() => generatePalette()}>Generate</button>
		</div>
	</div>
	<div class="h-full w-full flex flex-wrap bg-gray-400">
		{#key paletteResult}
			{#each paletteResult as item, i}
				<ColorCard item={item} index={i} colorQtd={colorQtd} on:changeColor={(event) => updateCardColor(event.detail, i)}/>
			{/each}
		{/key}
	</div>
</div>

{#if historicModal}
	<HistoricModal paletteHistoric={paletteHistoric} on:close={handleHistoricModal} on:updateColor={updateColor} on:resetHistoric={loadHistoricFromStorage}/>
{/if}

{#if imageModal}
	<ImageModal on:close={handleImageModal} on:updateColor={updateColor}/>
{/if}

{#if  saveAlert}
	<SuccessAlert message={"Palette saved successfully!"} on:close={handleSaveAlert}/>
{/if}