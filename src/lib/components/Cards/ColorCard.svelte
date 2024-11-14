<script lang="ts">
	import { ColorUtils } from '$lib/utils/colorUtils';
	import { createEventDispatcher, onMount } from 'svelte';
	import SuccessAlert from '../Alerts/SuccessAlert.svelte';

	const dispatch = createEventDispatcher();
	export let item;
	export let colorQtd;
	export let index;

	let selectedColor = item.color;
	let textColor = item.textColor;
	let saveAlert = false;
	let rotateLabel = false;
	let containerRef: HTMLDivElement;

	// Check if the label has enough space and rotate it.
	function checkOverflow() {
		if (containerRef && containerRef.scrollWidth > containerRef.clientWidth) {
			rotateLabel = true;
		} else {
			rotateLabel = false;
		}
	}

	// Change the text color based in the card color.
	function changeTextColor() {
		textColor = ColorUtils.getTextColor(selectedColor);
	}

	// Dispatch the color card change.
	function changeColor() {
		dispatch('changeColor', { newColor: selectedColor });
	}

	// Copy the hex to the Clipboard.
	async function copyToClipboard() {
		try {
			await navigator.clipboard.writeText(selectedColor);
			saveAlert = true;
		} catch (error) {
			console.error('Failed to copy: ', error);
		}
	}

	// Handle the save alert.
	function handleSaveAlert() {
		saveAlert = false;
	}

	$: if (colorQtd) {
		checkOverflow();
	}

	onMount(() => {
		checkOverflow();
		window.addEventListener('resize', checkOverflow);
	});
</script>

<div bind:this={containerRef} class="h-full flex items-end justify-center overflow-hidden" style="width: {100 / colorQtd}%; background-color: {selectedColor};">
	<div class="text-2xl mb-16 flex flex-col items-center justify-start">
		<input type="color"	name={`${selectedColor}-${index}`} id={`${selectedColor}-${index}`} class="h-0 w-0 invisible" bind:value={selectedColor} on:change={changeColor} on:input={changeTextColor}/>
		<button	class={`cursor-pointer rounded-md p-2 hover:bg-opacity-15 ${textColor === 'white' ? 'hover:bg-[#ffffff15]' : 'hover:bg-[#00000015]'}`} style="color: {textColor};" title="Copy Hex" on:click={copyToClipboard}>
			<i class="fas fa-copy"/>
		</button>
		<label for={`${selectedColor}-${index}`} class={`w-28 cursor-pointer rounded-md p-2 ${rotateLabel ? 'mt-10 -rotate-90' : 'mt-px'} ${textColor === 'white' ? 'hover:bg-[#ffffff15]' : 'hover:bg-[#00000015]'}`} style="color: {textColor};">
			{selectedColor.toUpperCase()}
		</label>
	</div>
</div>

{#if saveAlert}
	<SuccessAlert message={`The color <strong>${selectedColor}</strong> has been copied to your clipboard!`} on:close={handleSaveAlert}/>
{/if}