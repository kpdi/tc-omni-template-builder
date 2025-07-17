import type { Attachment } from "svelte/attachments";
import { BLANK_IMAGE, imageSrc, isProxied } from "../url";

/**
 * Attachment that proxies image URLs to a CDN or similar service.
 * It rewrites the `src` attribute of an `<img>` element to use a proxied URL
 * based on the original image URL and the current size of the image.
 *
 * This is useful for optimizing image loading and serving images in a specific format or size.
 */
export function imageProxy(
  // TODO: Pass this in from editable
  options: { dev?: boolean } = { dev: true }
): Attachment<HTMLImageElement> {
  let originalSrc = "";
  let lastProxiedSrc = "";

  return (node: HTMLImageElement) => {
    const rewriteSrc = () => {
      const { src } = node;

      if (!src) {
        node.src = BLANK_IMAGE;
        return;
      }

      // Store original URL if this is the first time we see a non-proxied URL
      if (!isProxied(src) && src !== originalSrc) {
        originalSrc = src;
      }

      // If we don't have an original URL yet, wait
      if (!originalSrc) {
        return;
      }

      // Get dimensions from either the img element or the #ad container
      let sizeNode = options.dev ? document.getElementById("ad") : node;

      if (!sizeNode) {
        sizeNode = node;
      }

      const { offsetWidth, offsetHeight } = sizeNode;

      if (offsetWidth === 0 && offsetHeight === 0) {
        requestAnimationFrame(() => rewriteSrc());
        return;
      }

      const proxied = imageSrc(originalSrc, [offsetWidth, offsetHeight]);

      // Only update if the proxied src changed
      if (proxied !== lastProxiedSrc) {
        lastProxiedSrc = proxied;
        node.src = proxied;
      }
    };

    // Initial rewrite
    rewriteSrc();

    const srcObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "src" &&
          !isProxied(node.src) &&
          node.src !== originalSrc
        ) {
          originalSrc = node.src;
          rewriteSrc();
        }
      });
    });
    srcObserver.observe(node, {
      attributes: true,
      attributeFilter: ["src"],
    });

    // Watch for size changes using ResizeObserver
    const resizeObserver = new ResizeObserver(rewriteSrc);
    resizeObserver.observe(node);

    return () => {
      srcObserver.disconnect();
      resizeObserver.disconnect();
    };
  };
}
