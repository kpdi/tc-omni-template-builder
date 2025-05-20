import { addEditable, setEditing, type EditController } from "./edit-controller";
import type { RenderContent } from "./template";

type EditableParams<Element extends HTMLElement, Key extends keyof RenderContent> = {
  controller: EditController;
  content: RenderContent;
  itemIndex: number;
  key: Key;
  setValue: (node: Element, value: RenderContent[Key]) => void;
};

export function editable<Element extends HTMLElement, Key extends keyof RenderContent>(
  node: Element,
  params: EditableParams<Element, Key>
) {
  const { controller, key, setValue } = params;
  let { itemIndex, content } = params;

  // Set the initial value
  setValue(node, content[key]);

  const editable = addEditable(controller, node, {
    content,
    itemIndex,
    key,
    setValue,
  });

  const onClick = () => setEditing(controller, editable);

  node.addEventListener("click", onClick);

  return {
    destroy() {
      node.removeEventListener("click", onClick);
      controller.editables.delete(editable);
    },
    update(params: EditableParams<Element, Key>) {
      ({ content, itemIndex } = params);
      editable.config.content = content;
      editable.config.itemIndex = itemIndex;
      editable.config.setValue(node, content[key]);
    },
  };
}
