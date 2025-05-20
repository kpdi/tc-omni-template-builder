import type { RenderContent, RenderItem } from "./template";

// TYPES

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyEditable = Editable<any, any>;

type EditingCallback = (editable: AnyEditable) => void;

/**
 * Created by the renderer and passed into templates. It facilitates passing edit messages between
 * the app and the renderer.
 */
export type EditController = {
  editables: Set<AnyEditable>;
  config: {
    onStartEditing: EditingCallback;
    onStopEditing: EditingCallback;
  };
  state: {
    editing: boolean;
  };
};

/**
 * An editable field that is managed by the EditController.
 */
type Editable<Element extends HTMLElement, Key extends keyof RenderContent> = {
  node: Element;
  config: EditableConfig<Element, Key>;
  state: {
    editing: boolean;
  };
};

type EditableConfig<Element extends HTMLElement, Key extends keyof RenderContent> = {
  content: RenderContent;
  itemIndex: number;
  key: Key;
  setValue: (node: Element, value: RenderContent[Key]) => void;
};

/**
 * Add a new editable to the edit controller.
 */
export function addEditable<Element extends HTMLElement, Key extends keyof RenderContent>(
  controller: EditController,
  node: Element,
  config: EditableConfig<Element, Key>
) {
  const editable = {
    node,
    config,
    state: {
      editing: false,
    },
  };
  controller.editables.add(editable);
  if (controller.state.editing) {
    node.classList.add("editable");
  } else {
    node.classList.remove("editable");
  }
  return editable;
}

/**
 * Set the field being edited.
 */
export function setEditing(controller: EditController, editable: AnyEditable | undefined) {
  if (!controller.state.editing) {
    return;
  }

  const current = controller.editables.values().find((editable) => editable.state.editing);

  if (current === editable) {
    return;
  }

  if (current && editable) {
    current.state.editing = false;
    current.node.classList.remove("editing");
    editable.state.editing = true;
    editable.node.classList.add("editing");
    controller.config.onStartEditing(editable);
  } else if (current) {
    current.state.editing = false;
    current.node.classList.remove("editing");
    controller.config.onStopEditing(current);
  } else if (editable) {
    editable.state.editing = true;
    editable.node.classList.add("editing");
    controller.config.onStartEditing(editable);
  }
}

export function updateEditables(controller: EditController, frame: { items: RenderItem[] }) {
  const editable = controller.editables.values().find((editable) => editable.state.editing);
  if (!editable) {
    return;
  }

  const value =
    frame.items[editable.config.itemIndex].content[editable.config.key as keyof RenderContent];

  editable?.config.setValue(editable.node, value);
}
