const PUBLIC_CDN_URL = "https://promo-omni.net";

/**
 * Get the image url via the proxy
 */
export function imageSrc(url: string, size?: [number, number]) {
  const dimensions = size ? `,width=${size[0]},height=${size[1]}` : "";
  return `${PUBLIC_CDN_URL}/cdn-cgi/image/fit=scale-down${dimensions}/${encodeURI(url)}`;
}

export const BLANK_IMAGE =
  "data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
