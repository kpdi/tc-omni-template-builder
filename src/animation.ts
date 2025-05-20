import type { Action } from "svelte/action";
import type { AnimationController, AnimationOptions } from "./animation-controller";
import { addAnimation } from "./animation-controller";

export const animation: Action<
  HTMLElement,
  {
    controller: AnimationController;
    options: AnimationOptions;
  }
> = (node, actionOptions) => {
  const { controller, options } = actionOptions;
  const destroy = addAnimation(controller, node, options);
  return {
    destroy,
    update: () => {},
  };
};
