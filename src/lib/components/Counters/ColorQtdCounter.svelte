<script>
    export let colorQtd;
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();
    let value = colorQtd;

    // Increases value.
    function plus() {
        value += 1;
        dispatch("changeQtd", value);
    }
    
    // Decreases value.
    function minus() {
        value -= 1;
        dispatch("changeQtd", value);
    }
</script>

<div class="h-fit w-fit flex rounded overflow-hidden">
    {#if value > 1}
        <button class="h-10 w-8 flex items-center justify-center text-lg font-bold p-2 bg-green-600 text-white rounded-l-md hover:bg-green-700" on:click={minus}><i class="fa-solid fa-minus"/></button>
    {:else}
        <button class="h-10 w-8 flex items-center justify-center text-lg font-bold p-2 bg-gray-500 text-white rounded-l-md"><i class="fa-solid fa-minus"/></button>
    {/if}
    <div class="h-10 w-8 bg-white flex items-center justify-center text-lg p-2">{value}</div>
    {#if value < 10}
        <button class="h-10 w-8 flex items-center justify-center text-lg font-bold p-2 bg-green-600 text-white rounded-r-md hover:bg-green-700" on:click={plus}><i class="fa-solid fa-plus"/></button>
    {:else}
        <button class="h-10 w-8 flex items-center justify-center text-lg font-bold p-2 bg-gray-500 text-white rounded-r-md"><i class="fa-solid fa-plus"/></button>
    {/if}
</div>