<script lang="ts">
  import { onMount } from "svelte";
  import Key from "$lib/components/Key.svelte";

  const bgSpeed = 1;
  let bgOffset = $state(0);
  let muted = $state(false);

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
    <div class="flex items-center gap-4">
      <!-- <button aria-label="volume" class="cursor-pointer flex justify-center items-center">
        <iconify-icon icon="mingcute:volume-fill" class="text-icon"></iconify-icon>
      </button> -->
    </div>
  </nav>

  <div class="grow flex flex-col justify-center items-center gap-12">
    <div class="flex gap-4">
      <div class="flex flex-col justify-center gap-4">
        <button
          aria-label="volume"
          onclick={() => (muted = !muted)}
          class="cursor-pointer flex justify-center items-center rounded-2xl bg-accent shadow-accent grow w-16 active:shadow-none active:translate-y-[5px] duration-100"
        >
          <iconify-icon icon={muted ? "mingcute:volume-off-fill" : "mingcute:volume-fill"} class="text-3xl"></iconify-icon>
        </button>
        <button
          aria-label="palette"
          class="cursor-pointer flex justify-center items-center rounded-2xl bg-accent shadow-accent grow w-16 active:shadow-none active:translate-y-[5px] duration-100"
        >
          <iconify-icon icon="mingcute:palette-fill" class="text-3xl"></iconify-icon>
        </button>
        <button
          aria-label="cat"
          class="cursor-pointer flex justify-center items-center rounded-2xl bg-accent shadow-accent grow w-16 active:shadow-none active:translate-y-[5px] duration-100"
        >
          <iconify-icon icon="mingcute:cat-fill" class="text-3xl"></iconify-icon>
        </button>
      </div>

      <div class="aspect-2/1 flex justify-center">
        <div class="flex gap-1 relative">
          <Key position={0} label="C4" keymap="z" />
          <Key position={0.5} label="C#4" keymap="s" />
          <Key position={1} label="D4" keymap="x" />
          <Key position={1.5} label="D#4" keymap="d" />
          <Key position={2} label="E4" keymap="c" />
          <Key position={3} label="F4" keymap="v" />
          <Key position={3.5} label="F#4" keymap="g" />
          <Key position={4} label="G4" keymap="b" />
          <Key position={4.5} label="G#4" keymap="h" />
          <Key position={5} label="A4" keymap="n" />
          <Key position={5.5} label="A#4" keymap="j" />
          <Key position={6} label="B4" keymap="m" />
          <Key position={7} label="C5" keymap="," />
          <Key position={7.5} label="C#5" keymap="l" />
          <Key position={8} label="D5" keymap="." />
          <Key position={8.5} label="D#5" keymap=";" />
          <Key position={9} label="E5" keymap="/" />
        </div>
      </div>
    </div>
  </div>
</main>
