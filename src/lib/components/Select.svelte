<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import Icon from './Icon.svelte';

  type Option = {
    label: string;
    id: string;
  };

  export let options: Option[] = [];
  export let placeholder = '';
  export let value: string = '';

  const dispatch = createEventDispatcher();

  const onChange = (e: Event) => {
    const target = e.target as HTMLSelectElement;
    dispatch('change', target.value);
    target.value = value;
  };
</script>

<label>
  <select required class="select" {value} on:change={onChange}>
    {#if placeholder}
      <option value="" disabled selected hidden>{placeholder}</option>
    {/if}
    {#each options as option}
      <option value={option.id}>{option.label}</option>
    {/each}
  </select>
  <div class="icon">
    <Icon size={18} name="chevron-down" />
  </div>
</label>

<style lang="postcss">
  select {
    appearance: none;
    background: var(--base-panel);
    color: var(--base-text);
    padding: 4px 12px;
    min-height: 28px;
    border: none;
    display: flex;
    font-size: 1rem;
    font-weight: 600;
    padding-right: 28px;
    overflow: hidden;
    text-overflow: ellipsis;

    &:active + .icon {
      transform: rotate(180deg);
    }
    &:invalid {
      color: var(--base-text);
    }
  }
  label {
    display: inline-flex;
    align-items: center;
    position: relative;
  }
  .icon {
    position: absolute;
    top: 7px;
    right: 7px;
    transition: var(--base-transition);
  }
</style>
