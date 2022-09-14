<script lang="ts">
  import Button from './Button.svelte';
  import Icon from './Icon.svelte';

  export let name = '';
</script>

<div class="wrapper">
  <div class="title">{name}</div>

  <div class="footer">
    <Button kind="error" size="small">
      <div class="button__inner">
        <Icon name="trash" size={18} />
        Удалить
      </div>
    </Button>
    <Button size="small">
      <div class="button__inner">Применить</div>
    </Button>
  </div>
</div>

<style lang="postcss">
  .wrapper {
    border-radius: var(--border-radius);
    background-color: var(--base-panel);
    padding: 8px;
  }
  .title {
    font-size: 1.2rem;
    color: var(--base-title);
    font-weight: 600;
  }

  .footer {
    display: flex;
    align-items: center;
    gap: 8px;
    justify-content: flex-end;
  }
  .button__inner {
    display: flex;
    gap: 3px;
    align-items: center;
  }
</style>
