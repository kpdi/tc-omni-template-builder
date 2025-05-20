import * as svelte from "svelte";
import App from "./app.svelte";
import { type RenderSpec } from "./template";
import "@tailwindcss/browser";

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

  if ("spec" in window) {
    return window.spec as RenderSpec;
  }

  if (window.location.search) {
    // TODO: check for querystring spec
  }

  const onMessage = (event: MessageEvent<{ type: "init"; spec: string }>) => {
    if (event.data.type === "init") {
      window.removeEventListener("message", onMessage);
      const spec = JSON.parse(event.data.spec);
      svelte.mount(App, { target, props: { spec } });
    }
  };

  window.addEventListener("message", onMessage);
}

(async () => {
  const spec = await resolveSpec();
  svelte.mount(App, { target, props: { spec } });
})();
