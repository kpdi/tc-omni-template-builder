<script lang="ts">
  import type { Snippet } from "svelte";

  type Props = {
    children?: Snippet;
    class?: string;
    style?: Record<string, string>;
    width: string;
  };
  const { children, class: cls, style: styleObj = {}, width }: Props = $props();

  const style = $derived(
    Object.entries(styleObj)
      .map(([key, value]) => `${key}: ${value};`)
      .join(" ")
  );
</script>

<div
  {style}
  class={["column-container", cls]}
  style:flex-basis={width}
  style:height="100%"
>
  <div class="column">
    {@render children?.()}
  </div>
</div>

<style>
  .column {
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    height: 100%;
  }
</style>
