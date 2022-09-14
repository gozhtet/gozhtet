<script lang="ts">
  import { derived } from 'svelte/store';
  import type { Plugin } from '$lib/modules/plugin-manager';
  import { editor$ } from '$lib/store/editor';
  import { slide } from 'svelte/transition';
  import type { Document } from '$lib/models';
  import Icon from '$lib/components/Icon.svelte';
  import ContextMenu, { type Option } from '$lib/components/ContextMenu.svelte';
  import Button from '$lib/components/Button.svelte';
  import { _, locale } from 'svelte-i18n';
  import { app$, Pages } from '$lib/store/app';

  export let plugin: Plugin;
  export let activeDocument: Document;

  let isOpen = false;

  const documents = derived(plugin.provider.documents, (store) => store || []);

  const options: Option[] = [
    {
      label: $_('sidebar.contextmenu.new_document'),
      id: 'new_document',
    },
  ];

  const onSelectContextMenu = (id: string) => {
    console.log(id);
    if (id === 'new_document') {
      plugin.provider.sidebar.onAddNewDocument?.();
    }
  };

  const label = plugin.provider.sidebar.label || {};
  $: translatedLabel = typeof label === 'string' ? label : label[$locale] || label['en'] || Object.values(label)[0];
</script>

<ContextMenu {options} on:select={({ detail }) => onSelectContextMenu(detail)}>
  <button class="action" on:click={() => (isOpen = !isOpen)}>
    {translatedLabel}
    {#if plugin.provider.sidebar.onAddNewDocument}
      <div class="action__arrow" class:action__arrow__active={isOpen}>
        <Icon size={14} name="chevron-down" />
      </div>
    {/if}
  </button>
</ContextMenu>

{#if isOpen}
  <ul class="inner" transition:slide={{ duration: 200 }}>
    {#each $documents as document}
      <li>
        <Button
          size="small"
          kind={activeDocument?.id === document.id && $app$.page === Pages.editor ? 'raised' : 'base'}
          on:click={() => editor$.setDocument(document)}
        >
          <div class="document">
            <Icon size={18} name="file-text" />
            <div class="document__name">
              {document.name}
            </div>
          </div>
        </Button>
      </li>
    {/each}
  </ul>
{/if}

<style lang="postcss">
  .action {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2px 4px;
    font-size: 1rem;
    appearance: none;
    width: 100%;
    border: none;
    margin: 0;
    background: none;
    color: var(--base-subtitle);
    font-size: 0.8rem;
    font-weight: 600;
    outline: none;
    border-radius: var(--border-radius);

    &:focus {
      background-color: var(--base-primary);
    }

    &__arrow {
      transition: var(--transition);
      &__active {
        transform: rotate(180deg);
      }
    }
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    & li :global(button) {
      width: 100%;
    }
  }

  .inner {
    overflow: hidden;
  }

  .document {
    padding-left: 16px;

    text-align: left;
    display: flex;
    align-items: center;
    gap: 5px;
    width: 100%;

    &__name {
      min-width: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      flex-grow: 0;
    }
  }
</style>
