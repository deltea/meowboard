<script lang="ts">
  import { onMount } from "svelte";
  import { Howl } from "howler";

  let { position, label, keymap }: {
    position: number,
    label: string,
    keymap: string
  } = $props();
  let isDown = $state(false);

  function getRateForNote(note: string): number {
    const noteToRate: Record<string, number> = {
      "C4": 1.0,
      "C#4": 1.059,
      "D4": 1.122,
      "D#4": 1.189,
      "E4": 1.260,
      "F4": 1.335,
      "F#4": 1.414,
      "G4": 1.498,
      "G#4": 1.587,
      "A4": 1.682,
      "A#4": 1.782,
      "B4": 1.888,
      "C5": 2.0,
      "C#5": 2.119,
      "D5": 2.245,
      "D#5": 2.378,
      "E5": 2.520
    };
    return noteToRate[note.toUpperCase()] || 1.0;
  }

  const sound = new Howl({
    src: ["/meowsynth.wav"],
    volume: 0.5,
    preload: true,
    rate: getRateForNote(label)
  });

  function playSound() {
    sound.play();
  }

  onMount(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === keymap && !event.repeat && !isDown) {
        event.preventDefault();
        isDown = true;
        isDown = true;
        playSound();
      }
    };

    const handleKeyup = (event: KeyboardEvent) => {
      if (event.key === keymap) {
        event.preventDefault();
        isDown = false;
        isDown = false;
      }
    };

    document.addEventListener('keydown', handleKeydown);
    document.addEventListener('keyup', handleKeyup);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
      document.removeEventListener('keyup', handleKeyup);
    };
  });
</script>

{#if position % 1 !== 0}
  <button
    onmousedown={playSound}
    style:left={`${position * 68}px`}
    class="absolute -translate-y-8 top-0 h-2/3 w-16 rounded-2xl outline-none shadow-base bg-dark z-10 active:shadow-none active:-translate-y-[27px] duration-100 flex flex-col justify-end cursor-pointer {isDown ? "shadow-none -translate-y-[27px]" : ""}"
  >
    <span class="pb-2 text-fg font-bold">{label}</span>
  </button>
{:else}
  <button
    onmousedown={playSound}
    class="h-full rounded-2xl outline-none shadow-muted w-16 active:shadow-none active:translate-y-[5px] duration-100 flex flex-col justify-end bg-fg cursor-pointer {isDown ? "shadow-none translate-y-[5px]" : ""}"
  >
    <span class="pb-2 text-dark font-bold">{label}</span>
  </button>
{/if}
