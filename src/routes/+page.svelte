<script lang="ts">
  import { onMount } from "svelte";
  import Key from "$lib/components/Key.svelte";
  import { fly } from "svelte/transition";
  import { cyclePalette } from "$lib/stores/theme";

  const bgSpeed = 1;
  let bgOffset = $state(0);
  let muted = $state(false);
  let visualizerOpen = $state(false);
  let catEnabled = $state(false);

  function keyPressed() {
    catEnabled = true;
    setTimeout(() => {
      catEnabled = false;
    }, 180);
  }

  onMount(() => {
    setInterval(() => {
      bgOffset += bgSpeed;
    }, 20);
  });
</script>

<svelte:head>
  <title>meowboard</title>
</svelte:head>

<main
  style="background-position: {bgOffset}px {bgOffset}px;"
  class="min-h-screen flex flex-col bg-[url('/background.svg')] bg-repeat"
>
  <nav class="flex justify-between items-center hnav pr-5">
    <a href="/" class="text-2xl font-borel font-black -mb-4 flex gap-0.5 items-center group bg-dark rounded-br-3xl pr-7 pl-4 py-4 shadow-base">
      <iconify-icon icon="mingcute:cat-fill" class="text-3xl group-hover:-rotate-12 duration-200"></iconify-icon>
      <span class="translate-y-2">meowboard</span>
    </a>
  </nav>

  <div class="grow flex flex-col justify-center items-center gap-12">
    <div class="relative pt-16">
      {#if visualizerOpen}
        <div
          transition:fly={{ y: 250, opacity: 100, duration: 200 }}
          class="bg-accent rounded-2xl w-84 h-80 absolute left-1/2 -translate-x-1/2 -top-40 py-4 pb-18 flex justify-center"
        >
          <img
            src={catEnabled ? "/meowsynth-2.png" : "/meowsynth-1.png"}
            alt="meowsynth cat"
            class="h-full object-contain rounded-2xl"
          >
        </div>
      {/if}

      <div class="flex gap-4 duration-200 {visualizerOpen ? "translate-y-16" : ""}">
        <div class="flex flex-col justify-center gap-4">
          <a
            aria-label="github"
            href="https://github.com/deltea/meowboard"
            class="cursor-pointer flex justify-center items-center rounded-2xl bg-accent shadow-accent grow w-16 active:shadow-none active:translate-y-[5px] duration-100"
          >
            <iconify-icon icon="mingcute:github-fill" class="text-3xl"></iconify-icon>
          </a>
          <button
            aria-label="palette"
            onclick={cyclePalette}
            class="cursor-pointer flex justify-center items-center rounded-2xl bg-accent shadow-accent grow w-16 active:shadow-none active:translate-y-[5px] duration-100"
          >
            <iconify-icon icon="mingcute:palette-fill" class="text-3xl"></iconify-icon>
          </button>
          <button
            aria-label="cat"
            onclick={() => (visualizerOpen = !visualizerOpen)}
            class="cursor-pointer flex justify-center items-center rounded-2xl bg-accent shadow-accent grow w-16 active:shadow-none active:translate-y-[5px] duration-100"
          >
            <iconify-icon icon="mingcute:cat-fill" class="text-3xl"></iconify-icon>
          </button>
        </div>

        <div class="aspect-2/1 flex justify-center bg-bg rounded-2xl">
          <div class="flex gap-1 relative">
            <Key {keyPressed} position={0} label="C4" keymap="z" />
            <Key {keyPressed} position={0.5} label="C#4" keymap="s" />
            <Key {keyPressed} position={1} label="D4" keymap="x" />
            <Key {keyPressed} position={1.5} label="D#4" keymap="d" />
            <Key {keyPressed} position={2} label="E4" keymap="c" />
            <Key {keyPressed} position={3} label="F4" keymap="v" />
            <Key {keyPressed} position={3.5} label="F#4" keymap="g" />
            <Key {keyPressed} position={4} label="G4" keymap="b" />
            <Key {keyPressed} position={4.5} label="G#4" keymap="h" />
            <Key {keyPressed} position={5} label="A4" keymap="n" />
            <Key {keyPressed} position={5.5} label="A#4" keymap="j" />
            <Key {keyPressed} position={6} label="B4" keymap="m" />
            <Key {keyPressed} position={7} label="C5" keymap="," />
            <Key {keyPressed} position={7.5} label="C#5" keymap="l" />
            <Key {keyPressed} position={8} label="D5" keymap="." />
            <Key {keyPressed} position={8.5} label="D#5" keymap=";" />
            <Key {keyPressed} position={9} label="E5" keymap="/" />
          </div>
        </div>
      </div>
    </div>
  </div>
</main>
