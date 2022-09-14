<script lang="ts">
  export let width = 200;
  export let min = 100;
  export let max = 400;

  let ref: HTMLDivElement;
  let isResize = false;

  const onMove = (event: MouseEvent) => {
    const newWidth = event.clientX - ref.offsetLeft;
    if (newWidth < min) {
      if (width !== min) {
        width = min;
      }
    } else if (newWidth > max) {
      if (width !== max) {
        width = max;
      }
    } else {
      width = newWidth;
    }
  };

  const onDown = (e: Event) => {
    e.preventDefault();
    isResize = true;
    document.body.style.cursor = 'col-resize';
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  };

  const onUp = () => {
    document.body.style.cursor = 'auto';
    isResize = false;
    window.removeEventListener('mousemove', onMove);
    window.removeEventListener('mouseup', onUp);
  };
</script>

<div class="wrapper" style={`width: ${width}px; min-width:${width}px; max-width:${width}px;`} bind:this={ref}>
  <slot />
  <div class="line" class:resize={isResize} on:mousedown={onDown} />
</div>

<style>
  .wrapper {
    position: relative;
    height: 100%;
    overflow-x: hidden;
  }
  .line {
    cursor: col-resize;
    position: absolute;
    right: -0px;
    top: 0;
    width: 4px;
    height: 100%;
    transition: var(--base-transition);
  }
  .line:hover,
  .resize {
    background-color: var(--base-primary24);
  }
  .resize::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
