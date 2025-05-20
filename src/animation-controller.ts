// Goals:
//
// - synchronize animations
// - step animations for videos
// - skip to time for snapshots
// - wait between product changes

export type AnimationController = {
  animations: Set<Animation>;
  options: AnimationControllerOptions;
  state: AnimationControllerState;
};

type AnimationControllerOptions = {
  mode?: "manual" | "auto";
  onDone?: (controller: AnimationController) => void;
  resetDelay?: number;
};

type AnimationControllerState = {
  time: number;
};

type Animation = {
  node: HTMLElement;
  options: AnimationOptions;
  state: AnimationState;
};

type AnimationTimingOptions = {
  delay?: number;
  duration: number;
  iterationCount?: number;
};

export type AnimationOptions = {
  name: string;
  normal: AnimationTimingOptions;
  once?: boolean;
  reverse?: AnimationTimingOptions;
};

type AnimationState = {
  done: boolean;
};

/**
 * The number of milliseconds to wait before re-running animations.
 * If terms of ads, this is the amount of time to wait between product changes.
 */
const RESET_DELAY = 500;

export function addAnimation(
  controller: AnimationController,
  node: HTMLElement,
  options: AnimationOptions
) {
  const animation = {
    node,
    options,
    state: { delay: 0, done: false },
  };

  const callback = () => onAnimationEnd(controller, animation);

  controller.animations.add(animation);
  node.addEventListener("animationend", callback);

  initAnimation(controller, animation);

  return () => {
    controller.animations.delete(animation);
    node.removeEventListener("animationend", callback);
  };
}

function initAnimation(controller: AnimationController, { node, options, state }: Animation) {
  const { name } = options;
  const { delay = 0, duration, iterationCount = 1 } = options.normal;
  node.style.animationPlayState = controller.options.mode === "manual" ? "paused" : "running";
  state.done = false;
  setAnimationProperties(node, name, delay, "normal", duration, iterationCount);
}

function reverseAnimation(controller: AnimationController, animation: Animation) {
  const { node, options } = animation;
  if (node.style.animationDirection === "normal" && options.reverse) {
    const { name } = options;
    const { delay = 0, duration, iterationCount = 1 } = options.reverse;
    setAnimationProperties(node, name, delay, "reverse", duration, iterationCount);
    if (controller.options.mode === "manual") {
      stepAnimation(controller, animation);
    }
    return true;
  }
  return false;
}

/**
 * Predicate used to check if an animation is done.
 */
const isDone = (animation: Animation) => animation.state.done;

/**
 * Call the onDone callback if all animations are done.
 */
function notifyIfAllDone(controller: AnimationController) {
  if (!controller.options.onDone) {
    return;
  }
  if ([...controller.animations].every(isDone)) {
    controller.options.onDone(controller);
  }
}

/**
 * When an animation ends, reverse it if reverse options are set, otherwise
 * mark it as done and check if all animations are done.
 */
function onAnimationEnd(controller: AnimationController, animation: Animation) {
  if (reverseAnimation(controller, animation)) {
    return;
  }
  animation.node.style.animationFillMode = "forwards";
  animation.state.done = true;
  notifyIfAllDone(controller);
}

/**
 * Predicate used to filter out animations that should not run more than once.
 */
const notOnce = (animation: Animation) => !animation.options.once;

/**
 * Reset all animations to their initial state.
 */
export function resetAnimations(controller: AnimationController) {
  controller.state.time = 0;
  const resetDelay = controller.options.resetDelay ?? RESET_DELAY;
  [...controller.animations].filter(notOnce).forEach(({ node, options, state }) => {
    const { name } = options;
    const { delay = 0, duration, iterationCount = 1 } = options.normal;
    state.done = false;
    setAnimationProperties(node, name, delay + resetDelay, "normal", duration, iterationCount);
  });
}

export function pauseAnimations(controller: AnimationController) {
  controller.animations.forEach(({ node }) => (node.style.animationPlayState = "paused"));
}

/**
 * Let the animations run automatically.
 */
export function resumeAnimations(controller: AnimationController) {
  controller.animations.forEach(({ node }) => (node.style.animationPlayState = "running"));
}

/**
 * Set animation properties for a node and restart the animation timer.
 */
function setAnimationProperties(
  node: HTMLElement,
  name: string,
  delay: number,
  direction: "normal" | "reverse",
  duration: number,
  iterationCount: number
) {
  node.style.animationDelay = `${delay}ms`;
  node.style.animationDirection = direction;
  node.style.animationDuration = `${duration}ms`;
  node.style.animationFillMode = "backwards";
  node.style.animationIterationCount = `${iterationCount}`;
  node.style.animationName = "none";
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  node.offsetHeight;
  node.style.animationName = name;
}

/**
 * Manually step an animation according to `controller.state.time`.
 */
function stepAnimation(controller: AnimationController, animation: Animation) {
  const { node, options, state } = animation;
  if (state.done) {
    return;
  }
  let { delay = 0 } = options.normal;
  if (node.style.animationDirection === "reverse") {
    delay += options.normal.duration;
    delay += options.reverse?.delay || 0;
  }
  node.style.animationDelay = `${delay - controller.state.time}ms`;
}

/**
 * Find the latest time at which all animations are in their normal state.
 */
function latestNormalTime(controller: AnimationController) {
  return [...controller.animations].reduce(
    (max, { options: { normal } }) => Math.max(max, (normal.delay || 0) + normal.duration),
    0
  );
}

/**
 * Manually step animations by the given number of milliseconds.
 */
export function stepAnimations(controller: AnimationController, ms: number | undefined) {
  if (ms === undefined) {
    controller.state.time = latestNormalTime(controller);
  } else {
    controller.state.time += ms;
  }
  controller.animations.forEach((animation) => stepAnimation(controller, animation));
}
