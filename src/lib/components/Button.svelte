<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  export let type: 'button' | 'submit' | 'reset' = 'button';
  export let kind: 'base' | 'raised' | 'error' = 'base';
  export let size: 'small' | 'default' = 'default';

  const dispatch = createEventDispatcher();
</script>

<button
  class="btn"
  class:base={kind === 'base'}
  class:raised={kind === 'raised'}
  class:error={kind === 'error'}
  class:size__small={size === 'small'}
  class:size__default={size === 'default'}
  {type}
  on:click={(event) => dispatch('click', event)}
>
  <slot />
</button>

<style lang="postcss">
  .btn {
    appearance: none;
    border: none;
    background: none;
    border-radius: var(--border-radius);
    font-size: 1rem;
    color: var(--base-title);
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 0 10px;
    margin: 0;
    outline: none;

    &:disabled {
      cursor: default;
    }
  }
  .size {
    &__small {
      min-height: 28px;
    }
    &__default {
      min-height: 32px;
    }
  }

  .base {
    &:hover {
      background-color: var(--base-overlay);
    }
  }
  .raised {
    background-color: var(--base-primary);
  }
  .error {
    background-color: var(--base-red);
  }
</style>
