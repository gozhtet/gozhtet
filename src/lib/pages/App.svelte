<script lang="ts">
  import Resizable from '$lib/components/Resizable.svelte';
  import { View as Editor } from '$lib/modules/editor';
  import { View as Sidebar } from '$lib/modules/sidebar';
  import { View as Settings } from '$lib/modules/settings';
  import { plugins$ } from '$lib/store/plugins';
  import { editor$ } from '$lib/store/editor';
  import { onMount } from 'svelte';
  import { Route, Router } from 'svelte-routing';
  import { app$, Pages } from '$lib/store/app';

  onMount(() => {
    plugins$.init();
  });
</script>

<div class="wrapper">
  <div class="content__wrapper">
    <Resizable>
      <Sidebar />
    </Resizable>

    <div class="content">
      {#if $app$.page === Pages.editor}
        {#if $editor$.currentDocument}
          <Editor document={$editor$.currentDocument} on:change={({ detail }) => editor$.onChange(detail)} />
        {/if}
      {/if}
      {#if $app$.page === Pages.settings}
        <Settings />
      {/if}
    </div>
  </div>
</div>

<style lang="postcss">
  .wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .content {
    background: var(--base-background);
    flex-grow: 1;
    display: flex;

    &__wrapper {
      flex-grow: 1;
      width: 100%;
      height: 0;
      display: flex;
    }
  }
</style>
