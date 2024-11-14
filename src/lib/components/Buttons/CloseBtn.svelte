<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
</script>

<button class="w-10 h-10 text-lg border-black border-2 text-black p-2 rounded-md hover:bg-black hover:text-white flex items-center justify-center mx-1" on:click={() => dispatch('close')}><i class="fas fa-times"/></button>
