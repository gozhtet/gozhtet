<script>
  import { Link } from 'svelte-routing';
  import { _ } from 'svelte-i18n';
</script>

<div class="wrapper">
  <h1>{$_('welcome.title')}</h1>
  <Link to="app">Go to app</Link>
</div>

<style lang="postcss">
  .wrapper {
    padding-top: var(--safearea-top);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
</style>
