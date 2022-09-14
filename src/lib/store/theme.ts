import type { Theme } from '$lib/modules/theme';
import baseTheme from '$lib/themes/base.json';
import { writable } from 'svelte/store';

const DEFAULT = {
  currentTheme: baseTheme as Theme,
  themes: [] as Theme[],
};

const store = writable({ ...DEFAULT });

export const theme$ = {
  subscribe: store.subscribe,
  addAllThemes(themes: Array<Theme>) {
    store.update((state) => {
      state.themes = themes;
      return state;
    });
  },
  addTheme(theme: Theme) {
    store.update((state) => {
      state.themes.push(theme);
      return state;
    });
  },

  setTheme(theme: Theme) {
    store.update((state) => {
      state.currentTheme = theme;
      return state;
    });
  },

  init() {
    this.addAllThemes([baseTheme]);
  },
};
