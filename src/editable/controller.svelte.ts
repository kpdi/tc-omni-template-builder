import type { ContextId } from "../template";
import { createEditableContext, type EditableContext } from "./context";

/**
 * Keeps track of editable contexts to ensure only one is being edited at a time and that it's
 * reflected in the UI.
 */
export type EditableController<TemplateId extends number> = {
  readonly contexts: Map<ContextId, EditableContext<any, any>>;
  enabled: boolean;
  readonly templateId: TemplateId;

  /**
   * Create a new editable context with the specified name.
   */
  readonly addContext: <ContextName extends string>(
    name: ContextName
  ) => EditableContext<TemplateId, ContextName>;

  /**
   * Toggle editing the specified context.
   */
  readonly edit: (id?: ContextId) => void;
};

/**
 * Create an EditableController instance
 */
export function createEditableController<TemplateId extends number>(
  enabled: boolean,
  templateId: TemplateId
): EditableController<TemplateId> {
  return {
    // DATA
    contexts: new Map(),
    enabled,
    templateId,

    // METHODS
    addContext<ContextName extends string>(
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
