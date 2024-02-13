<script lang="ts">
  import type { Image } from "../types";

  export let images: Image[] = [];
  export let index: number = 0;
</script>

{#if images.length > 0}
  <div class="flex flex-col">
    <img src={images[index].src} alt={images[index].alt} class="max-h-96" />
    <div class="flex">
      {#each images as image, i}
        <button on:click={() => (index = i)}>
          <img
            src={image.src}
            alt={image.alt}
            class="h-20 w-20 hover:opacity-50"
          />
        </button>
      {/each}
    </div>
  </div>
{/if}
