import { writable } from "svelte/store";

export type Palette = "default" | "ocean" | "gruvbox" | "tokyo-night";

type ThemeState = { palette: Palette };

const STORAGE_KEY = "kb:theme";
const PALETTES: Palette[] = ["default", "ocean", "gruvbox", "tokyo-night"];

function readInitial(): ThemeState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      const palette: Palette = parsed && PALETTES.includes(parsed.palette) ? (parsed.palette as Palette) : "default";
      return { palette };
    }

    return { palette: "default" };
  } catch (e) {
    return { palette: "default" };
  }
}

function applyTheme(state: ThemeState) {
  document.documentElement.setAttribute("data-palette", state.palette);
}

const initial = (typeof window !== "undefined" ? readInitial() : { palette: "default" }) as ThemeState;

export const theme = writable<ThemeState>(initial, (set) => {
  applyTheme(initial);

  const unsub = theme.subscribe((s) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
    applyTheme(s);
  });

  return () => unsub();
});

export function cyclePalette() {
  theme.update((t) => {
    const idx = PALETTES.indexOf(t.palette);
    const nextPalette = PALETTES[(idx + 1) % PALETTES.length];
    const next = { ...t, palette: nextPalette } as ThemeState;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      applyTheme(next);
    } catch (e) {}
    return next;
  });
}

export function setPalette(p: Palette) {
  theme.update((t) => {
    const next = { ...t, palette: p } as ThemeState;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      applyTheme(next);
    } catch (e) {}
    return next;
  });
}
