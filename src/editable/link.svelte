<script lang="ts">
  /**
   * An editable Link component that renders a clickable link with variable URL binding,
   * supports repositioning, resizing, and auto-sizing.
   */
  import { autoSize } from "../attachments/auto-size";
  import type { ItemBindingName, RenderFrameVars } from "../template";
  import Component, {
    type BindingDescriptor,
    type TemplateBindingDescriptor,
  } from "./component.svelte";

  type Height = {
    /**
     * The default height of the Text component.
     */
    height: { default: string };
  };
  type Top = {
    /**
     * The default top of the Text component using absolute positioning.
     */
    top: { default: string };
  };
  type Bottom = {
    /**
     * The default bottom of the Text component using absolute positioning.
     */
    bottom: { default: string };
  };
  type Left = {
    /**
     * The default left of the Text component using absolute positioning.
     */
    left: { default: string };
  };
  type Right = {
    /**
     * The default right of the Text component using absolute positioning.
     */
    right: { default: string };
  };
  type Width = {
    /**
     * The default width of the Text component.
     */
    width: { default: string };
  };

  type Props = {
    /**
     * The frame variables that define the context in which this Text component is rendered.
     */
    frame: RenderFrameVars;
    /**
     * The url binding for the link.
     */
    href: BindingDescriptor<ItemBindingName, string>;
    /**
     * A unique name used to identify variables defined by this component.
     */
    name: string;
    /**
     * The text content binding.
     */
    text: BindingDescriptor<ItemBindingName, string>;
    /**
     * Optional justification property for the content.
     */
    align?: TemplateBindingDescriptor<"start" | "center" | "end">;
    /**
     * Optional CSS class(es) to apply to the Text component.
     */
    class?: string;
    /**
     * Optional justification property for the content.
     */
    justify?: TemplateBindingDescriptor<"start" | "center" | "end">;
  } & ((Height & Top) | (Height & Bottom) | (Bottom & Top)) &
    ((Width & Left) | (Width & Right) | (Right & Left));

  const { class: cls, frame, href, name, text, ...rest }: Props = $props();

  const bindings: Record<string, BindingDescriptor<any, any>> = {
    href,
    text,
    target: { default: "_blank" },
  };

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
  if ("align" in rest && rest.align) {
    bindings.align = { ...rest.align };
  }
  if ("justify" in rest && rest.justify) {
    bindings.justify = { ...rest.justify };
  }
</script>

<Component {frame} {name} {bindings}>
  {#snippet el(vars)}
    <div
      style:bottom={"bottom" in vars ? vars.bottom : undefined}
      style:height={"height" in vars ? vars.height : undefined}
      style:left={"left" in vars ? vars.left : undefined}
      style:right={"right" in vars ? vars.right : undefined}
      style:top={"top" in vars ? vars.top : undefined}
      style:width={"width" in vars ? vars.width : undefined}
      style:align-items={"align" in vars ? vars.align : undefined}
      style:justify-content={"justify" in vars ? vars.justify : undefined}
    >
      <a class={cls} href={vars.href} target={vars.target} {@attach autoSize()}>
        {vars.text}
      </a>
    </div>
  {/snippet}
</Component>

<style>
  div {
    position: absolute;
    display: flex;
  }
  a {
    max-height: 100%;
    max-width: 100%;
  }
</style>
