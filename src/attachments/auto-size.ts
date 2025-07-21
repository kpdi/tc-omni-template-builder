import type { Attachment } from "svelte/attachments";

/**
 * An action that can autosize fonts in nodes that meet certain conditions.
 */
const autoSize = (debug = false): Attachment<HTMLElement> => {
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

      // if (computedStyle.maxWidth === "none") {
      //   console.error("width must be constrained", node);
      //   return;
      // }

      // if (computedStyle.maxHeight === "none") {
      //   console.error("height must be constrained", node);
      //   return;
      // }

      if (computedStyle.webkitLineClamp !== "none") {
        console.error("line clamp must not be set", node);
        return;
      }
 
      // Don't autosize until the font is loaded
      const { fontFamily, fontSize, fontWeight } = computedStyle;
      const font = `${fontWeight} ${fontSize} ${fontFamily}`;
      document.fonts.load(font).then(async ([fontFace]) => {
        if (fontFace) {
          await fontFace.loaded;
          console.log({
            text: node.innerText,
            font,
            fontFace,
          });
        }
        resize(node, debug);

        // Restore original overflow styles
        node.style.overflowX = overflowX;
        node.style.overflowY = overflowY;
      });
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

    // Watch for size changes
    const resizeObserver = new ResizeObserver(() => resize(node, debug));
    if (node.parentElement) {
      resizeObserver.observe(node.parentElement);
    }

    return () => {
      clearTimeout(timeout);
      contentObserver.disconnect();
      resizeObserver.disconnect();
      styleObserver.disconnect();
    };
  };

  return attachment;
};

/**
 * Check whether the node's content overflows its bounds.
 */
function checkOverflow(node: HTMLElement, debug: boolean): boolean {
  const { clientHeight, clientWidth, scrollHeight, scrollWidth } = node;
  const { fontSize } = node.style;
  const overflowX = scrollWidth > clientWidth;
  const overflowY = scrollHeight > clientHeight;
  if (debug) {
    console.log(fontSize, {
      width: scrollWidth,
      height: scrollHeight,
    });
  }
  return overflowX || overflowY;
}

/**
 * Resize the font size of the node until it just fits within its bounds.
 */
function resize(node: HTMLElement, debug: boolean): void {
  const { overflowX, overflowY, width, height } = node.style;

  node.style.overflowX = "hidden";
  node.style.overflowY = "hidden";
  node.style.width = "100%";
  node.style.height = "100%";

  let minSize = 1;
  let maxSize = 1000;
  let overflow = false;

  if (debug) {
    console.groupCollapsed(node.innerText, {
      width: node.clientWidth,
      height: node.clientHeight,
    });
  }

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
  if (checkOverflow(node, debug)) {
    setFontSize(node, maxSize - 1);
  }

  if (debug) {
    console.log(node.style.fontSize);
    console.groupEnd();
  }

  node.style.overflowX = overflowX;
  node.style.overflowY = overflowY;
  node.style.width = width;
  node.style.height = height;
}

/**
 * Change the font size and wait for the browser to re-render.
 */
function setFontSize(node: HTMLElement, size: number) {
  node.style.fontSize = `${size / 100}rem`;
}

export { autoSize };
