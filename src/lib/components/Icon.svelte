<script lang="ts">
  export let name: string;
  export let size = 24;
</script>

<span class={`ti ti-${name}`} style:font-size={`${size}px`} />

<style>
  .ti {
    font-size: 24px;
    color: var(--color, var(--base-title));
  }
</style>
