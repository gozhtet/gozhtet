<script lang="ts">
  import Button from '$lib/components/Button.svelte';

  import { editor$ } from '$lib/store/editor';
  import { platform$ } from '$lib/store/platform';

  import { plugins$ } from '$lib/store/plugins';
  import { _ } from 'svelte-i18n';
  import PluginBar from './PluginBar.svelte';
  import { app$, Pages } from '$lib/store/app';
  import Icon from '$lib/components/Icon.svelte';

  $: plugins = $plugins$.pluginManager.getPlugins();
</script>

<nav class="wrapper" class:macos={$platform$.platform === 'darwin'}>
  <ul>
    {#each plugins as plugin}
      {#if plugin.provider.sidebar}
        <li>
          <PluginBar {plugin} activeDocument={$editor$.currentDocument} />
        </li>
      {/if}
    {/each}
  </ul>

  <ul class="bottom">
    <li>
      <Button
        size="small"
        kind={$app$.page === Pages.settings ? 'raised' : 'base'}
        on:click={() => app$.setPage(Pages.settings)}
      >
        <div class="button__innner">
          <Icon name="settings" size={18} />
          {$_('sidebar.settings')}
        </div>
      </Button>
    </li>
  </ul>
</nav>

<style lang="postcss">
  .wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 12px 10px;
    gap: 12px;

    ul {
      margin: 0;
      padding: 0;
      list-style: none;
    }
  }

  .bottom {
    & :global(button) {
      width: 100%;
    }
  }

  .button__innner {
    display: flex;
    gap: 6px;
    align-items: center;
  }

  .macos {
    padding-top: var(--safearea-top);
  }
</style>
