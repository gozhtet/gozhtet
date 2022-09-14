<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let checked = false;

  const dispatch = createEventDispatcher();
  const onChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    dispatch('change', target.checked);
    target.checked = checked;
  };
</script>

<label>
  <input type="checkbox" {checked} on:change={onChange} />
  <div class="checkbox" />
  <slot />
</label>

<style lang="postcss">
  label {
    display: flex;
    align-items: center;
    gap: 4px;
    cursor: pointer;
    --base-transition: 0.08s;

    & .checkbox {
      --size: 18px;
      height: var(--size);
      width: var(--size);
      background: var(--base-panel);
      border-radius: var(--border-radius);
      border: 1px solid var(--base-border);
      position: relative;

      &::after,
      &::before {
        content: '';
        position: absolute;
        width: 2px;
        background: var(--base-title);
        transform-origin: top left;
        height: 0;
        transition: var(--base-transition);
      }
      &::before {
        left: 2px;
        top: 8px;
        transform: rotate(-45deg);
        transition-delay: var(--base-transition);
      }
      &::after {
        transition-delay: 0s;
        left: 5px;
        top: 11px;
        transform: rotate(-135deg);
        transform-origin: top center;
      }
    }

    & input:focus {
      & + .checkbox {
        box-shadow: 0 0 0 3px var(--base-overlay);
      }
    }

    & input:checked + .checkbox {
      &::after {
        height: 10px;
        transition-delay: var(--base-transition);
      }
      &::before {
        height: 6px;
        transition-delay: 0s;
      }
    }

    input {
      overflow: hidden;
      height: 1px;
      width: 1px;
      /* visibility: hidden; */
      position: absolute;
      top: -10000px;
      left: -10000px;
      z-index: -100;
    }
  }
</style>
