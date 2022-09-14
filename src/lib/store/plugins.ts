import { onInit } from '$lib/modules/helpers/store';
import { PluginManager } from '$lib/modules/plugin-manager';
import { DatabaseProvider } from '$lib/modules/plugin-manager/core';
import { get, writable } from 'svelte/store';
import { editor$ } from './editor';

const DEFAULT = {
  pluginManager: new PluginManager(),
};

const store = writable({ ...DEFAULT });

onInit(() => {
  store.update((state) => {
    state.pluginManager.registerPlugin({
      name: 'Internal Notes',
      provider: new DatabaseProvider(),
    });
    return state;
  });

  const { pluginManager } = get(store);

  Array.from(pluginManager.plugins)
    .filter((plugin) => plugin.internal)
    .forEach((plugin) => {
      if (plugin.provider.onInit) {
        plugin.provider.onInit();
      }
    });

  pluginManager.initDir().then((dir) => {
    pluginManager.readCustomPlugins(dir).then(() => {
      store.update((state) => state);
      Array.from(pluginManager.plugins)
        .filter((plugin) => !plugin.internal)
        .forEach((plugin) => {
          if (plugin.provider.onInit) {
            plugin.provider.onInit();
          }
        });
    });
  });

  editor$.subscribe((state) => {
    const { pluginManager } = get(store);
    if (!state.currentDocument) {
      return;
    }

    const newDocument = { ...state.currentDocument, content: state.state?.doc?.toString() || '' };
    pluginManager.getPlugins().forEach((plugin) => {
      if (plugin && plugin.provider && plugin.provider.onUpdateDocument) {
        plugin.provider.onUpdateDocument(newDocument);
      }
    });
  });
});

export const plugins$ = {
  subscribe: store.subscribe,
  init() {
    // const state = get(store);
  },
};
