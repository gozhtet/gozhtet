<script lang="ts">
  import { EditorView, lineNumbers, highlightActiveLineGutter, keymap } from '@codemirror/view';
  import { EditorState } from '@codemirror/state';
  import { historyKeymap, defaultKeymap } from '@codemirror/commands';
  import { bracketMatching } from '@codemirror/language';
  import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
  import { languages } from '@codemirror/language-data';
  import { oneDark } from '@codemirror/theme-one-dark';
  import { createEventDispatcher, onMount } from 'svelte';
  import type { Document } from '$lib/models';

  export let document: Document;

  let editorView: EditorView;
  let prevContent = '';

  $: {
    if (prevContent !== document.content) {
      updateDocumentValue();
    }
    prevContent = document.content;
  }

  const updateDocumentValue = () => {
    if (editorView) {
      editorView.dispatch({
        changes: {
          from: 0,
          to: editorView.state.doc.length,
          insert: document.content || '',
        },
      });
    }
  };

  let editorEl: HTMLDivElement;

  const dispatch = createEventDispatcher();

  onMount(() => {
    const state = EditorState.create({
      doc: document?.content || '',
      extensions: [
        lineNumbers(),
        highlightActiveLineGutter(),
        keymap.of([...historyKeymap, ...defaultKeymap]),
        bracketMatching(),
        lineNumbers(),
        highlightActiveLineGutter(),
        EditorView.lineWrapping,
        markdown({
          base: markdownLanguage,
          codeLanguages: languages,
          addKeymap: true,
        }),
        oneDark,
        // highlightActiveLine(),
        // markdown({
        //   base: markdownLanguage,
        //   codeLanguages: languages,
        //   addKeymap: true,
        // }),
        // oneDark,
        // theme,
        // syntaxHighlighting,
        // history(),
        // indentOnInput(),
        // bracketMatching(),
        // defaultHighlightStyle.fallback,
        // EditorView.lineWrapping,
        EditorView.updateListener.of((update) => {
          if (update.changes) {
            dispatch('change', update.state);
          }
        }),
      ],
    });

    editorView = new EditorView({
      parent: editorEl,
      state,
    });
  });
</script>

<div class="wrapper">
  <div class="editor" bind:this={editorEl} />
</div>

<style lang="postcss">
  .wrapper {
    width: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }

  .editor {
    width: 100%;
    height: 0;
    flex-grow: 1;

    & :global(.cm-scroller) {
      overflow: auto;
    }

    & :global(.cm-editor) {
      height: 100%;
    }
  }
</style>
