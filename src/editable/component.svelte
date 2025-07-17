<script lang="ts" module>
  import type { Snippet } from "svelte";
  import type {
    ContextId,
    ItemBindingName,
    RenderFrameVars,
  } from "../template";
  import { toKebabCase } from "../utils/string";
  import type { EditableBinding } from "./context";
  import { createEditableContext, type EditableContext } from "./context";
  import type { EditableController } from "./controller";
  import type { PositionType, SizeType } from "./types";

  /**
   * Create an EditableController instance
   */
  function createEditableController<TemplateId extends number>(
    enabled: boolean,
    templateId: TemplateId
  ): EditableController<TemplateId> {
    return {
      // DATA
      contexts: new Map(),
      enabled,
      templateId,

      // METHODS
      addContext: function <ContextName extends string>(
        name: ContextName
      ): EditableContext<TemplateId, ContextName> {
        const id = `template.${templateId}.${name}` as const;

        if (this.contexts.has(id)) {
          throw new Error(`Editable context with id "${id}" already exists`);
        }
        const context = $state(createEditableContext(id));
        this.contexts.set(id, context);
        return context;
      },

      edit(id?: ContextId): void {
        if (!this.enabled) {
          return;
        }
        this.contexts.forEach((c) => (c.active = false));
        if (!id) {
          return;
        }
        const context = this.contexts.get(id);
        if (!context) {
          console.warn(`No editable context found with id "${id}"`);
          return;
        }
        context.active = true;
      },
    };
  }

  export type BindingDescriptor<Name extends ItemBindingName, T> =
    | ItemBindingDescriptor<Name>
    | TemplateBindingDescriptor<T>;

  export type ItemBindingDescriptor<Name extends ItemBindingName> = {
    bind: Name;
  };

  export type TemplateBindingDescriptor<T> = {
    default: T;
    sizeType?: SizeType;
    positionType?: PositionType;
  };

  export const setEditableController = (
    ...args: Parameters<typeof createEditableController>
  ) => {
    return (editableController = createEditableController(...args));
  };

  let editableController = $state<EditableController<number>>();
</script>

<script
  lang="ts"
  generics="T extends Record<string, BindingDescriptor<any, any>>"
>
  const {
    bindings: descriptors,
    el,
    frame,
    name,
  }: {
    bindings: T;
    el: Snippet<[Record<keyof T, string>]>;
    frame: RenderFrameVars;
    name: string;
  } = $props();

  if (!editableController) {
    throw new Error(
      "editableController must be initialized before creating Region components. Call setEditableController() first."
    );
  }

  const context = editableController.addContext(name);

  function createBinding(
    label: string,
    descriptor: BindingDescriptor<ItemBindingName, string>
  ): EditableBinding<string> {
    if ("bind" in descriptor) {
      return {
        label,
        name: descriptor.bind,
      };
    }
    const name = toKebabCase(label);
    return {
      default: descriptor.default,
      label,
      name: context.getBindingName(name),
      positionType: descriptor.positionType,
      sizeType: descriptor.sizeType,
    };
  }

  const bindings = $derived(
    Object.fromEntries(
      Object.entries(descriptors).map(([label, descriptor]) => {
        const binding = createBinding(label, descriptor);
        context.bindings.set(binding.name, binding);
        return [label, binding];
      })
    ) as Record<keyof T, EditableBinding<string>>
  );

  const variables = $derived(
    Object.fromEntries(
      Object.entries(bindings).map(([label, binding]) => [
        label,
        binding.name in frame ? frame[binding.name] : binding.default,
      ])
    ) as Record<keyof T, string>
  );
</script>

<div
  style:display="contents"
  {@attach (node) => {
    if (node.children.length !== 1) {
      throw new Error(
        "Editable component must have exactly one element to render."
      );
    }

    const el = node.children[0];
    if (!(el instanceof HTMLElement)) {
      throw new Error(
        "Editable component must have an HTMLElement as its child."
      );
    }

    context.getDetails = () => {
      const { bottom, left, right, top, height, width } = getComputedStyle(el);
      const bindings = Object.fromEntries(
        context.bindings.entries().map(([key, binding]) => [
          key,
          {
            ...binding,
            ...(binding.positionType === "bottom" ? { initial: bottom } : {}),
            ...(binding.positionType === "left" ? { initial: left } : {}),
            ...(binding.positionType === "right" ? { initial: right } : {}),
            ...(binding.positionType === "top" ? { initial: top } : {}),
            ...(binding.sizeType === "height" ? { initial: height } : {}),
            ...(binding.sizeType === "width" ? { initial: width } : {}),
          },
        ])
      );
      return {
        bindings,
        contextId: context.id,
        position: el.getBoundingClientRect(),
      };
    };
  }}
>
  {@render el(variables)}
</div>
