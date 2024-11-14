<script lang="ts">
	import { fly } from 'svelte/transition';
	import { paletteType } from "$lib/stores/paletteStore";
	import { get } from 'svelte/store';
	import { createEventDispatcher, onMount } from 'svelte';
	import HorizontalDivider from "../Dividers/HorizontalDivider.svelte";
	const dispatch = createEventDispatcher();

	let selectedType: string;

	// Function to update the store with the selected radio value
	const handleRadioChange = (event: Event) => {
		const value = (event.target as HTMLInputElement).value;
		paletteType.set(value);
		selectedType = value; // Synchronize local variable.
	};

	// Sets the initial value of the select based on the store.
	onMount(() => {
		selectedType = get(paletteType);
	});
</script>

<button class="h-screen w-screen fixed right-0 top-0 bg-[#11111173] z-20" on:click={() => dispatch("close")}/>
<div class="h-screen w-72 fixed right-0 top-0 flex flex-col items-center justify-between bg-white p-4 z-20" in:fly={{ x: 200, duration: 600 }} out:fly={{ x: 200, duration: 300 }}>
    <div class="flex justify-center items-start">
        <h1 class="sm:text-5xl text-4xl mr-2 sm:mr-3">Palette</h1>
        <div class="sm:text-3xl text-xl font-light">colors</div>
    </div>
	<HorizontalDivider/>
	<div class="flex-grow w-full flex flex-col justify-start overflow-y-auto p-2">
		<label class="flex flex-col items-start my-2">
			<div class="flex items-center">
				<input 
					type="radio" 
					name="palette-type" 
					value="random" 
					bind:group={selectedType} 
					on:change={handleRadioChange}
					class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500" 
				/>
				<span class="ml-2 text-xl font-bold">Random</span>
			</div>
			<span class="ml-6 text-sm">Generates a completely random palette.</span>
		</label>

		<label class="flex flex-col items-start my-2">
			<div class="flex items-center">
				<input 
					type="radio" 
					name="palette-type" 
					value="monochromatic" 
					bind:group={selectedType} 
					on:change={handleRadioChange}
					class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500" 
				/>
				<span class="ml-2 text-xl font-bold">Monochromatic</span>
			</div>
			<span class="ml-6 text-sm">Uses shades and tints of a single color.</span>
		</label>

		<label class="flex flex-col items-start my-2">
			<div class="flex items-center">
				<input 
					type="radio" 
					name="palette-type" 
					value="analogous" 
					bind:group={selectedType} 
					on:change={handleRadioChange}
					class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500" 
				/>
				<span class="ml-2 text-xl font-bold">Analogous</span>
			</div>
			<span class="ml-6 text-sm">Selects colors adjacent on the color wheel.</span>
		</label>

		<label class="flex flex-col items-start my-2">
			<div class="flex items-center">
				<input 
					type="radio" 
					name="palette-type" 
					value="triadic" 
					bind:group={selectedType} 
					on:change={handleRadioChange}
					class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500" 
				/>
				<span class="ml-2 text-xl font-bold">Triadic-inspired</span>
			</div>
			<span class="ml-6 text-sm">
				Uses colors inspired by triadic harmony. It may contain more or fewer than three colors while keeping a balance across the palette.
			</span>
		</label>
		
		<label class="flex flex-col items-start my-2">
			<div class="flex items-center">
				<input 
					type="radio" 
					name="palette-type" 
					value="tetradic" 
					bind:group={selectedType} 
					on:change={handleRadioChange}
					class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500" 
				/>
				<span class="ml-2 text-xl font-bold">Tetradic-inspired</span>
			</div>
			<span class="ml-6 text-sm">
				Based on tetradic harmony, this palette may have more or fewer than four colors, ensuring a rich variety with complementary contrasts.
			</span>
		</label>
	</div>
	<HorizontalDivider/>		
	<div class="w-full text-black text-4xl flex items-center justify-evenly">
		<a href="https://www.linkedin.com/in/thiagoperinfelipedacruz/">
			<i class="fa-brands fa-linkedin mx-1"></i>
		</a>
		<a href="https://github.com/ThiagoPerin/palette-colors.git/">
			<i class="fa-brands fa-github mx-1"></i>
		</a>
	</div>
</div>
