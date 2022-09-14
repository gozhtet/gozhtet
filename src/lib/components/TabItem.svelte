<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import Icon from './Icon.svelte';
  export let icon: string;
  export let active = false;

  const dispatch = createEventDispatcher();
</script>

<button class="wrapper" type="button" class:active on:click={() => dispatch('click')}>
  <Icon name={icon} size={22} />
  <slot />
</button>

<style lang="postcss">
  .wrapper {
    appearance: none;
    background: none;
    transition: var(--base-transition);
    border: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: var(--border-radius);
    padding: 6px 8px;
    font-size: 1rem;
    color: var(--base-title);
    gap: 4px;
    font-weight: 500;
    cursor: pointer;
    opacity: 0.7;
    outline: none;

    &:focus {
      box-shadow: 0 0 0 4px var(--base-overlay);
    }

    &.active,
    &:active,
    &:focus,
    &:hover {
      background: var(--base-panel);
      opacity: 1;
    }
  }
</style>
