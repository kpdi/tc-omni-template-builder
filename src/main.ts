import "@tailwindcss/browser";
import * as svelte from "svelte";
import App from "./app.svelte";
import type { RenderSpec } from "./template";

const target = document.getElementById("app");

if (!target) {
  throw new Error();
}

async function resolveSpec(): Promise<RenderSpec> {
  if (
    typeof import.meta !== "undefined" &&
    import.meta.env &&
    import.meta.env.DEV
  ) {
    const { spec } = await import("./sample-spec");
    return spec;
  }

  if (!("spec" in window)) {
    throw new Error();
  }

  return window.spec as RenderSpec;
}

(async () => {
  const spec = await resolveSpec();
  svelte.mount(App, { target, props: { spec } });
})();
