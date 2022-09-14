<script lang="ts">
  import Button from './Button.svelte';
  import Icon from './Icon.svelte';

  export let name = '';
</script>

<div class="wrapper">
  <div class="title">{name}</div>
  <div class="footer">
    <Button size="small" kind="error">
      <div class="button__inner">
        <Icon name="trash" size={16} />
        <span>Delete</span>
      </div>
    </Button>
  </div>
</div>

<style lang="postcss">
  .title {
    font-size: 1.2rem;
    color: var(--base-title);
    font-weight: 600;
  }
  .wrapper {
    background: var(--base-panel);
    padding: 8px;
    border-radius: var(--border-radius);
  }
  .footer {
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;
  }
  .button__inner {
    display: flex;
    gap: 3px;
    align-items: center;
  }
</style>
