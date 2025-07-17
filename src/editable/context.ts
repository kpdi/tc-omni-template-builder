import type { BindingName, ContextId, TemplateBindingName } from "../template";
import type { SizeType, PositionType } from "./types";

export type EditableBinding<T> = {
  label: string;
  name: BindingName;
  default?: T;
  positionType?: PositionType;
  sizeType?: SizeType;
};

/**
 * State associated with an editable region - a collection of fields that are edited as a group.
 */
export type EditableContext<
  TemplateId extends number,
  ContextName extends string
> = {
  /**
   * Whether the context is currently being edited.
   */
  active: boolean;

  /**
   * Map of variable names to their definitions.
   */
  readonly bindings: Map<string, EditableBinding<any>>;

  /**
   * Unique identifier for the context, used to generate unique binding names.
   */
  readonly id: ContextId<TemplateId, ContextName>;

  /**
   * Generates a binding name for a field in the context.
   */
  readonly getBindingName: <FieldName extends string>(
    field: FieldName
  ) => TemplateBindingName<TemplateId, ContextName, FieldName>;

  getDetails: () => EditableDetails;
};

/**
 * Event emitted by the editable controller when an editable is selected.
 */
export type EditableDetails = {
  /**
   * A map of bindings for the selected editable context - used to display fields in the editing UI.
   */
  bindings: Record<string, EditableBinding<any> & { initial?: string }>;

  contextId: ContextId;

  /**
   * The bounds of the editable region - used to position the editing UI.
   */
  position: DOMRect;
};

export function createEditableContext<
  TemplateId extends number,
  ContextName extends string
>(
  id: ContextId<TemplateId, ContextName>
): EditableContext<TemplateId, ContextName> {
  return {
    active: false,
    bindings: new Map<string, EditableBinding<any>>(),
    id,

    getBindingName: <FieldId extends string>(fieldId: FieldId) =>
      `${id}.${fieldId}`,

    getDetails: () => {
      throw new Error("getDetails has not been set");
    },
  };
}
