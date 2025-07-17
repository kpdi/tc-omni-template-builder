<script lang="ts">
  import { tick } from "svelte";
  import {
    pauseAnimations,
    resetAnimations,
    resumeAnimations,
    stepAnimations,
    type AnimationController,
  } from "./animation-controller";
  import { handleAppMessage, sendRendererMessage } from "./messages";
  import {
    getRenderFrameVars,
    type RenderArgs,
    type RenderSpec,
    type RenderVars,
  } from "./template";
  import Template, { ITEMS_PER_FRAME } from "./templates/basic.svelte";
  import { setEditableController } from "./editable/component.svelte";

  // TYPES

  type ItemCount = typeof ITEMS_PER_FRAME;

  // PROPS

  let { spec }: { spec: RenderSpec } = $props();

  const deepCopy = <T,>(obj: T): T => {
    return JSON.parse(JSON.stringify(obj));
  };

  // STATE

  let renderVars = $state(deepCopy(spec.data));
  let frameIndex = $state(0);

  // DERIVED

  const animationController: AnimationController = {
    animations: new Set(),
    options: {
      mode: spec.mode,
      onDone,
    },
    state: {
      time: 0,
    },
  };

  // Get the variables required to render the current frame
  const frame = $derived(
    getRenderFrameVars<number, ItemCount>(renderVars, frameIndex)
  );

  const args: RenderArgs<ItemCount> = $derived({
    animationController,
    frame,
    frameIndex,
    lang: spec.lang,
    size: spec.size,
    templateId: spec.templateId,
  });

  const editableController = setEditableController(
    spec.editable,
    spec.templateId
  );

  /**
   * Callback for when all animations are done.
   */
  function onDone(controller: AnimationController) {
    if (frameIndex === spec.frames - 1) {
      sendRendererMessage("done");
      if (controller.options.mode === "manual") {
        return;
      }
      frameIndex = 0;
    } else {
      frameIndex++;
    }
    sendRendererMessage("frame", frameIndex);
    resetAnimations(controller);
  }

  /**
   * Handle messages from the app.
   */
  async function onMessage({ data }: MessageEvent) {
    handleAppMessage<RenderVars<number, number>>(data, {
      edit(contextId) {
        editableController.edit(contextId);
      },
      goto(index) {
        frameIndex = index;
        editableController.edit(undefined);
        stepAnimations(animationController, undefined);
        sendRendererMessage("frame", frameIndex);
      },
      pause() {
        animationController.options.mode = "manual";
        stepAnimations(animationController, undefined);
        pauseAnimations(animationController);

        sendRendererMessage("paused", {
          components: Object.fromEntries(
            editableController.contexts
              .entries()
              .map(([name, context]) => [name, context.getDetails()])
          ),
          frameIndex,
        });
      },
      resume() {
        animationController.options.mode = "auto";
        resumeAnimations(animationController);
        sendRendererMessage("running");
      },
      async step(ms) {
        stepAnimations(animationController, ms);
        await tick();
        sendRendererMessage("ready");
      },
      async update(data) {
        renderVars = data;
        await tick();

        // TODO: prevent positioning elements outside of the frame

        if (!editableController.enabled) {
          return;
        }
        const active = editableController.contexts
          .values()
          .find((context) => context.active);
        if (!active) {
          return;
        }
        const { position } = active.getDetails();
        sendRendererMessage("position", position);
      },
    });
  }
</script>

<svelte:window onmessage={onMessage} />

<div id="ad" style:height="{spec.size[1]}px" style:width="{spec.size[0]}px">
  <Template {args} />
</div>

<!-- debugging -->
<!-- <button
  class="my-2 bg-blue-500 p-2 text-white"
  on:click={() =>
    window.postMessage({
      type: "step",
      ms: 1000 / data.fps,
    })}>
  Step
</button> -->

<svelte:head>
  <style>
    @font-face {
      font-family: "Clash Grotesk";
      src: url("https://iheyhknkyvnxvedrtxqk.supabase.co/storage/v1/object/public/assets/fonts/clash-grotesk.woff2")
        format("woff2");
      font-weight: 200 700;
      font-display: swap;
      font-style: normal;
    }

    @font-face {
      font-family: "Gotham";
      src: url("https://iheyhknkyvnxvedrtxqk.supabase.co/storage/v1/object/public/assets/fonts/gotham-regular.woff2")
        format("woff2");
      font-weight: 400;
      font-style: normal;
      font-display: swap;
    }

    @font-face {
      font-family: "Gotham";
      src: url("https://iheyhknkyvnxvedrtxqk.supabase.co/storage/v1/object/public/assets/fonts/gotham-medium.woff2")
        format("woff2");
      font-weight: 500;
      font-style: normal;
      font-display: swap;
    }

    @font-face {
      font-family: "Gotham";
      src: url("https://iheyhknkyvnxvedrtxqk.supabase.co/storage/v1/object/public/assets/fonts/gotham-bold.woff2")
        format("woff2");
      font-weight: 700;
      font-style: normal;
      font-display: swap;
    }

    @font-face {
      font-family: "Gotham Condensed";
      src: url("https://iheyhknkyvnxvedrtxqk.supabase.co/storage/v1/object/public/assets/fonts/gotham-regular-condensed.woff2")
        format("woff2");
      font-weight: 400;
      font-display: swap;
    }

    @font-face {
      font-family: "Gotham Condensed";
      src: url("https://iheyhknkyvnxvedrtxqk.supabase.co/storage/v1/object/public/assets/fonts/gotham-condensed-medium.woff2")
        format("woff2");
      font-weight: 500;
      font-display: swap;
    }

    @font-face {
      font-family: "Gotham Condensed";
      src: url("https://iheyhknkyvnxvedrtxqk.supabase.co/storage/v1/object/public/assets/fonts/gotham-condensed-bold.woff2")
        format("woff2");
      font-weight: 700;
      font-display: swap;
    }

    @font-face {
      font-family: "Kapra";
      src: url("https://iheyhknkyvnxvedrtxqk.supabase.co/storage/v1/object/public/assets/fonts/kapra-neue-pro-medium.woff2")
        format("woff2");
      font-weight: 500;
      font-style: normal;
      font-display: swap;
    }

    @font-face {
      font-family: "Kapra";
      src: url("https://iheyhknkyvnxvedrtxqk.supabase.co/storage/v1/object/public/assets/fonts/kapra-neue-pro-bold.woff2")
        format("woff2");
      font-weight: 700;
      font-style: normal;
      font-display: swap;
    }

    @keyframes slideLeft {
      0% {
        transform: translateX(100%);
        opacity: 0;
      }
      100% {
        transform: translateX(0);
        opacity: 1;
      }
    }

    @keyframes slideRight {
      0% {
        transform: translateX(-100%);
        opacity: 0;
      }
      100% {
        transform: translateX(0);
        opacity: 1;
      }
    }

    @keyframes fadeIn {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }

    @keyframes spin {
      0% {
        transform: rotateY(0deg);
      }
      100% {
        transform: rotateY(360deg);
      }
    }

    .font-clash {
      font-family: "Clash Grotesk", sans-serif;
    }
    .font-gotham {
      font-family: "Gotham", sans-serif;
    }
    .font-gotham-condensed {
      font-family: "Gotham Condensed", sans-serif;
    }
    .font-kapra {
      font-family: "Kapra", sans-serif;
    }
  </style>

  <style type="text/tailwindcss">
    @theme {
      --color-adonis-blue-darker: #183982;
      --color-adonis-blue-light: #166884;
      --color-adonis-blue-medium: #12566f;
      --color-adonis-red-medium: #d5002c;
      --color-adonis-yellow-medium: #fada0c;
    }
  </style>
</svelte:head>
