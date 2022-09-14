import type { Platform } from '@tauri-apps/api/os';
import { writable } from 'svelte/store';
import { getPlatform } from '../modules/helpers';
import { onInit } from '../modules/helpers/store';

const DEFAULT = {
  platform: '' as Platform,
};

onInit(async () => {
  const platform = await getPlatform();
  store.update((state) => {
    state.platform = platform;

    return state;
  });
});

const store = writable({ ...DEFAULT });

export const platform$ = {
  subscribe: store.subscribe,
};
