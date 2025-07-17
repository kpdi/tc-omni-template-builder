<script lang="ts">
  /**
   * An editable Image component that renders an image with variable URL binding,
   * supports repositioning, resizing, and automatic CDN proxying.
   */
  import { imageProxy } from "../attachments/image-proxy";
  import type { ItemBindingName, RenderFrameVars } from "../template";
  import Component, { type BindingDescriptor } from "./component.svelte";

  type Height = {
    /**
     * The default height of the Image component.
     */
    height: { default: string };
  };
  type Top = {
    /**
     * The default top of the Image component using absolute positioning.
     */
    top: { default: string };
  };
  type Bottom = {
    /**
     * The default bottom of the Image component using absolute positioning.
     */
    bottom: { default: string };
  };
  type Left = {
    /**
     * The default left of the Image component using absolute positioning.
     */
    left: { default: string };
  };
  type Right = {
    /**
     * The default right of the Image component using absolute positioning.
     */
    right: { default: string };
  };
  type Width = {
    /**
     * The default width of the Image component.
     */
    width: { default: string };
  };

  type Props = {
    /**
     * The alt text binding for the image, used for accessibility.
     */
    alt: BindingDescriptor<ItemBindingName, string>;
    /**
     * The frame variables that define the context in which this Image component is rendered.
     */
    frame: RenderFrameVars;
    /**
     * A unique name used to identify variables defined by this component.
     */
    name: string;
    /**
     * The source URL binding for the image.
     */
    src: BindingDescriptor<ItemBindingName, string>;
    /**
     * Optional CSS class(es) to apply to the Image component.
     */
    class?: string;
  } & ((Height & Top) | (Height & Bottom) | (Bottom & Top)) &
    ((Width & Left) | (Width & Right) | (Right & Left));

  const { alt, src, frame, name, class: cls, ...rest }: Props = $props();

  const bindings: Record<string, BindingDescriptor<any, any>> = {};

  if (alt) {
    bindings.alt = alt;
  }
  if (src) {
    bindings.src = src;
  }

  if ("height" in rest) {
    bindings.height = { ...rest.height, sizeType: "height" };
  }
  if ("width" in rest) {
    bindings.width = { ...rest.width, sizeType: "width" };
  }
  if ("top" in rest) {
    bindings.top = { ...rest.top, positionType: "top" };
  }
  if ("bottom" in rest) {
    bindings.bottom = { ...rest.bottom, positionType: "bottom" };
  }
  if ("left" in rest) {
    bindings.left = { ...rest.left, positionType: "left" };
  }
  if ("right" in rest) {
    bindings.right = { ...rest.right, positionType: "right" };
  }
</script>

<Component {frame} {name} {bindings}>
  {#snippet el(vars)}
    <img
      alt={vars.alt}
      class={cls}
      src={vars.src || null}
      style:bottom={"bottom" in vars ? vars.bottom : undefined}
      style:height={"height" in vars ? vars.height : undefined}
      style:left={"left" in vars ? vars.left : undefined}
      style:max-height={"height" in vars ? vars.height : undefined}
      style:max-width={"width" in vars ? vars.width : undefined}
      style:right={"right" in vars ? vars.right : undefined}
      style:top={"top" in vars ? vars.top : undefined}
      style:width={"width" in vars ? vars.width : undefined}
      {@attach imageProxy()}
    />
  {/snippet}
</Component>

<style>
  img {
    position: absolute;
  }
</style>
