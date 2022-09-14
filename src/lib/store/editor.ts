import type { Document } from '$lib/models';
import type { EditorState } from '@codemirror/state';
import { navigate } from 'svelte-routing';
import { writable } from 'svelte/store';
import { app$, Pages } from './app';

const DEFAULT = {
  state: null as EditorState | null,
  currentDocument: null as Document | null,
};

const store = writable({ ...DEFAULT });

export const editor$ = {
  subscribe: store.subscribe,
  onChange(changes: EditorState) {
    store.update((state) => {
      state.state = changes;

      return state;
    });
  },
  setDocument(document: Document) {
    if (document) {
      app$.setPage(Pages.editor);
    }
    store.update((state) => {
      state.currentDocument = document;
      return state;
    });
  },
};
