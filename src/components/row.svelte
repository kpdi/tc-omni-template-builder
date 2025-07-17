<script lang="ts">
  import type { Snippet } from "svelte";

  type Props = {
    height: string;
    children?: Snippet;
    class?: string;
    style?: Record<string, string>;
  };

  const {
    children,
    class: cls,
    height,
    style: styleObj = {},
  }: Props = $props();

  $inspect(cls);

  const style = $derived(
    Object.entries(styleObj)
      .map(([key, value]) => `${key}: ${value};`)
      .join(" ")
  );
</script>

<div
  {style}
  class="row-container {cls}"
  style:flex-basis={height}
  style:width="100%"
>
  <div class="row">
    {@render children?.()}
  </div>
</div>

<style>
  .row {
    display: flex;
    flex-direction: row;
    position: relative;
    width: 100%;
    height: 100%;
  }
</style>
