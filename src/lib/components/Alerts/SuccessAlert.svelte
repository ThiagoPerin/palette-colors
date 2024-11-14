<script>
    import { fly } from 'svelte/transition';
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();

    export let message = ""

    // Close the alert.
    function close() { dispatch("close") };

    setTimeout(close, 2000);
</script>

<div class="fixed bottom-16 right-1 h-fit w-fit flex items-center text-lg p-4 bg-green-500 border-green-700 border-2 rounded-md z-10 text-white" in:fly={{ y: 56, duration: 400 }} out:fly={{ y: 56, duration: 400 }}>
    <i class="fas fa-check mr-2 text-2xl"/>
    <div>
        {@html message}
    </div>
</div>