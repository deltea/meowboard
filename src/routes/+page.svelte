<script lang="ts">
  import { Howl } from "howler";
  import hotkeys from "hotkeys-js";
  import { onMount } from "svelte";

  const sound = new Howl({
    src: ["/meowsynth.wav"],
    volume: 0.5,
    preload: true,
  });

  const keys = [
    { position: 0, isBlack: false, label: "C4", keymap: "z" },
    { position: 0.5, isBlack: true, label: "C#4", keymap: "s" },
    { position: 1, isBlack: false, label: "D4", keymap: "x" },
    { position: 1.5, isBlack: true, label: "D#4", keymap: "d" },
    { position: 2, isBlack: false, label: "E4", keymap: "c" },
    { position: 3, isBlack: false, label: "F4", keymap: "v" },
    { position: 3.5, isBlack: true, label: "F#4", keymap: "g" },
    { position: 4, isBlack: false, label: "G4", keymap: "b" },
    { position: 4.5, isBlack: true, label: "G#4", keymap: "h" },
    { position: 5, isBlack: false, label: "A4", keymap: "n" },
    { position: 5.5, isBlack: true, label: "A#4", keymap: "j" },
    { position: 6, isBlack: false, label: "B4", keymap: "m" },
  ];

  function playSound() {
    sound.play();
  }

  onMount(() => {
    for (const key of keys) {
      hotkeys(key.keymap, (event) => {
        event.preventDefault();
        playSound();
      });
    }
  });
</script>

<main class="min-h-screen flex flex-col">
  <nav class="flex justify-between items-center hnav pr-5">
    <a href="/" class="text-2xl font-borel font-black -mb-4 flex gap-0.5 items-center group bg-dark rounded-br-3xl pr-6 pl-4 py-4 shadow-base">
      <iconify-icon icon="mingcute:cat-fill" class="text-3xl -translate-y-0.5 group-hover:-rotate-12 duration-200"></iconify-icon>
      <span class="translate-y-2">nekoboard</span>
    </a>
    <div class="flex items-center gap-4">
      <button aria-label="volume" class="cursor-pointer flex justify-center items-center">
        <iconify-icon icon="mingcute:volume-fill" class="text-icon"></iconify-icon>
      </button>
    </div>
  </nav>

  <div class="grow flex flex-col justify-center items-center px-24">
    <div class="w-full aspect-5/2 flex justify-center">
      <div class="flex gap-1 relative">
        {#each keys as key, i}
          {#if key.isBlack}
            <button
              onclick={playSound}
              style:left={`${key.position * 68}px`}
              class="absolute -translate-y-8 top-0 h-2/3 w-16 rounded-2xl shadow-base bg-dark z-10 active:shadow-none active:-translate-y-[27px] duration-100 flex flex-col justify-end cursor-pointer"
            >
              <span class="pb-2 text-fg font-bold">{key.label}</span>
            </button>
          {:else}
            <button
              onclick={playSound}
              class="h-full rounded-2xl shadow-muted w-16 active:shadow-none active:translate-y-[5px] duration-100 flex flex-col justify-end bg-fg cursor-pointer"
            >
              <span class="pb-2 text-dark font-bold">{key.label}</span>
            </button>
          {/if}
        {/each}
      </div>
    </div>
  </div>
</main>
