import type { ContextId } from "../template";
import type { EditableContext } from "./context";

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
