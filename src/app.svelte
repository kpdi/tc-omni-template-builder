<script lang="ts">
  import {
    pauseAnimations,
    resetAnimations,
    resumeAnimations,
    stepAnimations,
    type AnimationController,
  } from "./animation-controller";
  import {
    setEditing,
    updateEditables,
    type EditController,
  } from "./edit-controller";
  import type { RenderArgs, RenderSpec } from "./template";
  import {
    createMessage,
    handleMessage,
    type AppMessage,
    type RendererMessage,
    type TypedMessage,
  } from "./messages";
  import { tick } from "svelte";
  import Template from "./template.svelte";

  // PROPS

  let { spec }: { spec: RenderSpec } = $props();

  const deepCopy = <T,>(obj: T): T => {
    return JSON.parse(JSON.stringify(obj));
  };

  // STATE

  let frames = $state(deepCopy(spec.data.frames));
  let frameIndex = $state(0);

  // DERIVED

  const frame = $derived(frames[frameIndex]);

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

  const editController: EditController = {
    editables: new Set(),
    config: {
      onStartEditing(editable) {
        pause();
        const { config, node } = editable;
        const { itemIndex, key } = config;
        const { top, left, width, height } = node.getBoundingClientRect();
        notify(
          createMessage<RendererMessage>("edit", {
            frameIndex,
            itemIndex,
            key,
            top,
            left,
            width,
            height,
          })
        );
      },
      onStopEditing() {
        notify(createMessage<RendererMessage>("edit", undefined));
      },
    },
    state: {
      editing: spec.editable,
    },
  };

  const args: RenderArgs = $derived({
    animationController,
    editController,
    items: frame.items,
    lang: spec.lang,
    size: spec.size,
  });

  function notify<Message extends RendererMessage, Type extends keyof Message>(
    message: TypedMessage<Message, Type>
  ) {
    // Write to the console for the builder
    if ("payload" in message) {
      console.log(message.type, message.payload);
    } else {
      console.log(message.type);
    }
    // Write to the parent window for the app
    window.parent?.postMessage(message, "*");
  }

  /**
   * Callback for when all animations are done.
   */
  function onDone(controller: AnimationController) {
    if (frameIndex === spec.data.frames.length - 1) {
      notify(createMessage<RendererMessage>("done"));
      if (controller.options.mode === "manual") {
        return;
      }
      frameIndex = 0;
    } else {
      frameIndex++;
    }
    notify(createMessage<RendererMessage>("frame", frameIndex));
    resetAnimations(controller);
  }

  function pause() {
    animationController.options.mode = "manual";
    pauseAnimations(animationController);
    notify(createMessage<RendererMessage>("paused"));
  }

  async function onMessage({ data }: MessageEvent) {
    handleMessage<AppMessage>(data, {
      cancel() {
        setEditing(editController, undefined);
      },
      goto(index) {
        frameIndex = index;
        setEditing(editController, undefined);
        stepAnimations(animationController, undefined);
        notify(createMessage<RendererMessage>("frame", frameIndex));
      },
      pause,
      resume() {
        animationController.options.mode = "auto";
        resumeAnimations(animationController);
        notify(createMessage<RendererMessage>("running"));
      },
      async step(ms) {
        stepAnimations(animationController, ms);
        await tick();
        notify(createMessage<RendererMessage>("ready"));
      },
      update(data) {
        ({ frameIndex } = data);
        frames[frameIndex] = data.frame;
        updateEditables(editController, data.frame);
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

    .editable {
      outline: 1px dashed transparent;
      outline-offset: -1px;
      border-radius: 4px;
    }

    #ad:hover .editable {
      outline-color: rgba(0, 0, 255, 0.3);
      background: rgba(0, 0, 0, 0.05);
    }

    .editable.editing,
    #ad:hover .editable.editing {
      outline-color: rgba(0, 0, 255, 0.4);
      background: rgba(0, 0, 0, 0.05);
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
