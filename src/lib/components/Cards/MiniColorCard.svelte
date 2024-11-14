<script lang="ts">
    export let item;
    export let colorQtd;
    let selectedColor = item.color;
</script>

<div class="h-full flex items-end justify-center" style="width: {100/colorQtd}%; background-color: {selectedColor};">
    <div class="text-2xl tex mb-16 flex flex-col items-center justify-start"/> 
</div>