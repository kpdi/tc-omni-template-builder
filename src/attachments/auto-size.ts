import type { Attachment } from "svelte/attachments";

/**
 * An action that can autosize fonts in nodes that meet certain conditions.
 */
const autoSize = (debug?: string): Attachment<HTMLElement> => {
  const attachment = (node: HTMLElement) => {
    let maxHeight = "";
    let maxWidth = "";

    const timeout = setTimeout(() => {
      const { overflowX, overflowY } = node.style;

      node.style.overflowX = "hidden";
      node.style.overflowY = "hidden";

      const computedStyle = getComputedStyle(node);
      ({ maxHeight, maxWidth } = computedStyle);

      if (computedStyle.overflowX !== "hidden") {
        console.error("overflow-x must be hidden", node);
        return;
      }

      if (computedStyle.overflowY !== "hidden") {
        console.error("overflow-y must be hidden", node);
        return;
      }

      if (computedStyle.maxWidth === "none") {
        console.error("width must be constrained", node);
        return;
      }

      if (computedStyle.maxHeight === "none") {
        console.error("height must be constrained", node);
        return;
      }

      if (computedStyle.webkitLineClamp !== "none") {
        console.error("line clamp must not be set", node);
        return;
      }

      resize(node, debug);

      // Restore original overflow styles
      node.style.overflowX = overflowX;
      node.style.overflowY = overflowY;
    }, 10);

    // Watch for content changes
    const contentObserver = new MutationObserver(() => resize(node, debug));
    contentObserver.observe(node, {
      characterData: true,
      childList: true,
      subtree: true,
    });

    // Watch for max-height and max-width changes
    const styleObserver = new MutationObserver(() => {
      const computed = getComputedStyle(node);
      if (computed.maxHeight !== maxHeight || computed.maxWidth !== maxWidth) {
        ({ maxHeight, maxWidth } = computed);
        resize(node, debug);
      }
    });
    styleObserver.observe(node, { attributeFilter: ["style"] });

    return () => {
      clearTimeout(timeout);
      contentObserver.disconnect();
      styleObserver.disconnect();
    };
  };

  return attachment;
};

/**
 * Check whether the node's content overflows its bounds.
 */
function checkOverflow(node: HTMLElement, debug?: string): boolean {
  const { clientHeight, clientWidth, scrollHeight, scrollWidth } = node;
  const overflowX = scrollWidth > clientWidth + 1;
  if (overflowX) {
    if (debug) {
      console.log(
        `${debug} overflow X ${scrollWidth} > ${clientWidth} at ${node.style.fontSize}`
      );
    }
    return true;
  }
  const overflowY = scrollHeight > clientHeight + 1;
  if (overflowY) {
    if (debug) {
      console.log(
        `${debug} overflow Y ${scrollHeight} > ${clientHeight}  at ${node.style.fontSize}`
      );
    }
    return true;
  }
  return false;
}

/**
 * Resize the font size of the node until it just fits within its bounds.
 */
function resize(node: HTMLElement, debug?: string): void {
  let minSize = 1;
  let maxSize = 1000;
  let overflow = false;

  while (minSize < maxSize) {
    // await new Promise((resolve) => setTimeout(resolve, 100));
    const midSize = Math.floor((minSize + maxSize) / 2);
    setFontSize(node, midSize);
    overflow = checkOverflow(node, debug);
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
