<script lang="ts">
  import PluginCard from '$lib/components/PluginCard.svelte';

  import { plugins$ } from '$lib/store/plugins';
  const plugins = $plugins$.pluginManager.getPlugins();
</script>

<div class="wrapper">
  <ul>
    {#each plugins as plugin}
      <li>
        <PluginCard name={plugin.name} />
      </li>
    {/each}
  </ul>
</div>

<style lang="postcss">
  .wrapper {
    ul {
      list-style: none;
      padding: 0;
      margin: 0;

      & li + li {
        margin-top: 10px;
      }
    }
  }
</style>
