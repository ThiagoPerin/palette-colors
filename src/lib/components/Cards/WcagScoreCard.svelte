<script lang="ts">
    export let contrast: { contrast: number; classification: string; };
</script>

{#if contrast.classification === 'Very Bad'}
	<div class="text-red-700 text-8xl">{contrast.contrast}</div>
	<div class="text-red-700 text-4xl font-semibold">
		<i class="fa-solid fa-face-sad-cry" />
		{contrast.classification}
	</div>
{:else if contrast.classification === 'Bad'}
	<div class="text-red-500 text-8xl">{contrast.contrast}</div>
	<div class="text-red-500 text-4xl font-semibold">
		<i class="fa-solid fa-face-frown" />
		{contrast.classification}
	</div>
{:else if contrast.classification === 'Medium'}
	<div class="text-orange-500 text-8xl">{contrast.contrast}</div>
	<div class="text-orange-500 text-4xl font-semibold">
		<i class="fa-solid fa-face-meh" />
		{contrast.classification}
	</div>
{:else if contrast.classification === 'Good'}
	<div class="text-green-700 text-8xl">{contrast.contrast}</div>
	<div class="text-green-700 text-4xl font-semibold">
		<i class="fa-solid fa-face-smile" />
		{contrast.classification}
	</div>
{:else if contrast.classification === 'Very Good'}
	<div class="text-green-500 text-8xl">{contrast.contrast}</div>
	<div class="text-green-500 text-4xl font-semibold">
		<i class="fa-solid fa-face-laugh-beam" />
		{contrast.classification}
	</div>
{/if}
