<script lang="ts">
  import Select from '$lib/components/Select.svelte';
  import { app$ } from '$lib/store/app';

  const languages = [
    { label: 'English', id: 'en' },
    { label: 'Russian', id: 'ru' },
  ];
</script>

<div class="wrapper">
  <Select
    value={$app$.currentLang}
    on:change={({ detail }) => app$.setLang(detail)}
    placeholder="Select language"
    options={languages}
  />
</div>
