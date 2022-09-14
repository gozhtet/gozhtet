<script lang="ts">
  import Checkbox from '$lib/components/Checkbox.svelte';

  import { app$ } from '$lib/store/app';
</script>

<div class="wrapper">
  <Checkbox checked={$app$.debug} on:change={({ detail }) => app$.setDebug(detail)}>Debug</Checkbox>
</div>
