import type { Action } from "svelte/action";

/**
 * An action that can autosize fonts in nodes that meet certain conditions.
 */
const autoSize: Action<HTMLElement> = function (node) {
  const computedStyle = getComputedStyle(node);

  const { overflowX, overflowY } = computedStyle;

  if (overflowX !== "hidden") {
    console.error("overflow-x must be hidden");
    return;
  }

  if (overflowY !== "hidden") {
    console.error("overflow-y must be hidden");
    return;
  }

  if (computedStyle.maxWidth === "none") {
    console.error("width must be constrained");
    return;
  }

  if (computedStyle.maxHeight === "none") {
    console.error("height must be constrained");
    return;
  }

  if (computedStyle.webkitLineClamp !== "none") {
    console.error("line clamp must not be set");
    return;
  }

  resize(node);

  return {
    update: () => resize(node),
  };
} satisfies Action<HTMLElement>;

/**
 * Check whether the node's content overflows its bounds.
 */
function checkOverflow(node: HTMLElement): boolean {
  const { clientHeight, clientWidth, scrollHeight, scrollWidth } = node;
  const overflow = scrollHeight > clientHeight + 1 || scrollWidth > clientWidth + 1;
  // console.log({
  //   clientHeight,
  //   clientWidth,
  //   scrollHeight,
  //   scrollWidth,
  //   overflow,
  // });
  return overflow;
}

/**
 * Resize the font size of the node until it just fits within its bounds.
 */
async function resize(node: HTMLElement): Promise<void> {
  let minSize = 1;
  let maxSize = 1000;
  let overflow = false;

  while (minSize < maxSize) {
    // await new Promise((resolve) => setTimeout(resolve, 100));
    const midSize = Math.floor((minSize + maxSize) / 2);
    setFontSize(node, midSize);
    overflow = checkOverflow(node);
    if (overflow) {
      maxSize = midSize - 1;
    } else {
      minSize = midSize + 1;
    }
  }

  setFontSize(node, maxSize);
  if (checkOverflow(node)) {
    setFontSize(node, maxSize - 1);
  }
}

/**
 * Change the font size and wait for the browser to re-render.
 */
function setFontSize(node: HTMLElement, size: number) {
  node.style.fontSize = `${size / 100}rem`;
}

export { autoSize };
