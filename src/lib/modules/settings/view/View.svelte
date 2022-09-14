<script lang="ts">
  import TabItem from '$lib/components/TabItem.svelte';

  import Title from '$lib/components/Title.svelte';
  import Advanced from './pages/Advanced.svelte';
  import General from './pages/General.svelte';
  import Themes from './pages/Themes.svelte';
  import Plugins from './pages/Plugins.svelte';
  import { _ } from 'svelte-i18n';

  enum Tabs {
    general,
    plugins,
    themes,
    advanced,
  }

  let tab = Tabs.general;
</script>

<div class="wrapper">
  <Title>{$_('settings.title')}</Title>
  <div class="tabs">
    <TabItem on:click={() => (tab = Tabs.general)} active={tab === Tabs.general} icon="settings"
      >{$_('settings.tabs.general')}</TabItem
    >
    <TabItem on:click={() => (tab = Tabs.plugins)} active={tab === Tabs.plugins} icon="puzzle"
      >{$_('settings.tabs.plugins')}</TabItem
    >
    <TabItem on:click={() => (tab = Tabs.themes)} active={tab === Tabs.themes} icon="palette"
      >{$_('settings.tabs.themes')}</TabItem
    >
    <TabItem on:click={() => (tab = Tabs.advanced)} active={tab === Tabs.advanced} icon="tool"
      >{$_('settings.tabs.advanced')}</TabItem
    >
  </div>

  {#if tab === Tabs.general}
    <General />
  {/if}
  {#if tab === Tabs.plugins}
    <Plugins />
  {/if}
  {#if tab === Tabs.themes}
    <Themes />
  {/if}
  {#if tab === Tabs.advanced}
    <Advanced />
  {/if}
</div>

<style lang="postcss">
  .wrapper {
    padding: 18px 12px;
    width: 100%;
  }
  .tabs {
    display: flex;
    gap: 10px;
    width: 100%;
    padding-bottom: 12px;
    border-bottom: 1px solid var(--base-border);
    margin-bottom: 12px;
    justify-content: center;
  }
</style>
