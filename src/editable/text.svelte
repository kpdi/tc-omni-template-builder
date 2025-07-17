<script lang="ts">
  /**
   * An editable Text component that renders a variable binding and supports repositioning,
   * resizing, and auto-sizing.
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
    height: TemplateBindingDescriptor<string>;
  };
  type Top = {
    /**
     * The default top of the Text component using absolute positioning.
     */
    top: TemplateBindingDescriptor<string>;
  };
  type Bottom = {
    /**
     * The default bottom of the Text component using absolute positioning.
     */
    bottom: TemplateBindingDescriptor<string>;
  };
  type Left = {
    /**
     * The default left of the Text component using absolute positioning.
     */
    left: TemplateBindingDescriptor<string>;
  };
  type Right = {
    /**
     * The default right of the Text component using absolute positioning.
     */
    right: TemplateBindingDescriptor<string>;
  };
  type Width = {
    /**
     * The default width of the Text component.
     */
    width: TemplateBindingDescriptor<string>;
  };

  type Props = {
    /**
     * The frame variables that define the context in which this Text component is rendered.
     */
    frame: RenderFrameVars;
    /**
     * A unique name used to identify variables defined by this component.
     */
    name: string;
    /**
     * The text content binding.
     */
    text: BindingDescriptor<ItemBindingName, string>;
    /**
     * Optional alignment property for the content.
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

    style?: Record<string, string>;
  } & ((Height & Top) | (Height & Bottom) | (Bottom & Top)) &
    ((Width & Left) | (Width & Right) | (Right & Left));

  const {
    class: cls,
    frame,
    name,
    style: styleObj = {},
    text,
    ...rest
  }: Props = $props();

  const bindings: Record<string, BindingDescriptor<any, any>> = {
    text,
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

  const style = $derived(
    Object.entries(styleObj)
      .map(([key, value]) => `${key}: ${value};`)
      .join(" ")
  );
</script>

<Component {frame} {name} {bindings}>
  {#snippet el(vars)}
    <div
      {@attach autoSize(name === "savingsNumber" ? name : undefined)}
      {style}
      class={cls}
      style:align-items={"align" in vars ? vars.align : undefined}
      style:bottom={"bottom" in vars ? vars.bottom : undefined}
      style:height={"height" in vars ? vars.height : undefined}
      style:justify-content={"justify" in vars ? vars.justify : undefined}
      style:left={"left" in vars ? vars.left : undefined}
      style:max-height={"height" in vars ? vars.height : undefined}
      style:max-width={"width" in vars ? vars.width : undefined}
      style:right={"right" in vars ? vars.right : undefined}
      style:top={"top" in vars ? vars.top : undefined}
      style:width={"width" in vars ? vars.width : undefined}
    >
      {vars.text}
    </div>
  {/snippet}
</Component>

<style>
  div {
    position: absolute;
    line-height: 1;
    display: flex;
  }
</style>
