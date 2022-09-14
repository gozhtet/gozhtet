<script lang="ts">
  import { onMount } from 'svelte';

  import { Router, Route } from 'svelte-routing';
  import { derived } from 'svelte/store';
  import { ThemeService } from './modules/theme/service';
  import App from './pages/App.svelte';
  import Welcome from './pages/Welcome.svelte';
  import { theme$ } from './store/theme';

  onMount(() => {
    theme$.init();
    ThemeService.init(derived(theme$, (state) => state.currentTheme));
  });
</script>

<div class="wrapper">
  <Router>
    <Route path="/">
      <Welcome />
    </Route>
    <Route path="/app/*" component={App} />
  </Router>
</div>

<style>
  .wrapper {
    display: flex;
    height: 100%;
  }
</style>
