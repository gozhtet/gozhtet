import { get, writable } from 'svelte/store';
import { locale } from 'svelte-i18n';
import { onInit } from '$lib/modules/helpers/store';

export enum Pages {
  editor = 'editor',
  settings = 'settings',
}

const DEFAULT = {
  page: '',
  debug: false,
  currentLang: 'en',
};

onInit(() => {
  setTimeout(() => {
    locale.subscribe((loc) => {
      store.update((state) => {
        state.currentLang = loc;
        return state;
      });
    });
  });
});

const store = writable({ ...DEFAULT });

export const app$ = {
  subscribe: store.subscribe,
  setDebug(debug: boolean) {
    store.update((state) => {
      state.debug = debug;
      return state;
    });
  },
  setPage(page: Pages) {
    store.update((state) => {
      state.page = page;
      return state;
    });
  },
  setLang(lang: string) {
    locale.set(lang);
    store.update((state) => {
      state.currentLang = lang;
      return state;
    });
  },
};
