<script lang="ts">
  import Input from '$lib/components/Input.svelte';
  import ThemeCard from '$lib/components/ThemeCard.svelte';
  import { theme$ } from '$lib/store/theme';
</script>

<div class="wrapper">
  <Input placeholder="Search" />

  <div class="body">
    <ul>
      {#each $theme$.themes as theme}
        <li>
          <ThemeCard name={theme.name} />
        </li>
      {/each}
    </ul>
  </div>
</div>

<style lang="postcss">
  .wrapper {
    & ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
  }
</style>
