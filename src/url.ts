const PUBLIC_CDN_URL = "https://promo-omni.net";

export const BLANK_IMAGE =
  "data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";

/**
 * Get the image url via the proxy
 */
export function imageSrc(url: string, size?: [number, number]) {
  const dimensions = size ? `,width=${size[0]},height=${size[1]}` : "";
  return `${PUBLIC_CDN_URL}/cdn-cgi/image/fit=scale-down${dimensions}/${url}`;
}

/**
 * Check whether the specified URL is already proxied or not.
 */
export function isProxied(url: string): boolean {
  return url === BLANK_IMAGE || url.startsWith(PUBLIC_CDN_URL);
}
