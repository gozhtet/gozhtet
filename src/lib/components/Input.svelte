<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let type = 'text';
  export let value = '';
  export let placeholder = '';
  export let label = '';
  export let naked = false;

  const dispatch = createEventDispatcher();

  const onChange = (e: Event) => {
    const target = e.target as HTMLInputElement;

    dispatch('change', target.value);
    target.value = value;
  };
</script>

<label class="wrapper" class:naked>
  {#if label}
    <div class="label">{label}</div>
  {/if}
  <input {type} on:input={onChange} {value} {placeholder} />
</label>

<style lang="postcss">
  .wrapper {
    display: inline-flex;
    flex-direction: column;
  }

  .label {
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--base-subtitle);
    margin-bottom: 2px;
  }

  input {
    width: 100%;
    outline: none;
    background: none;
    border: none;
    appearance: none;
    color: var(--base-title);
    font-size: 1rem;
    background-color: var(--base-panel);
    border-radius: var(--border-radius);
    padding: 4px 8px;
  }
  .naked {
    & input {
      background: none;
      padding: 0;
    }
  }
</style>
