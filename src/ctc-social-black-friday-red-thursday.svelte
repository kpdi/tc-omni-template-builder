<script lang="ts">
  import { animation } from "./animation";
  import { autoSize } from "./auto-size";
  import { editable } from "./editable";
  import Validity from "./validity.svelte";
  import type { RenderArgs } from "./template";
  import { BLANK_IMAGE, imageSrc } from "./url";

  const { args }: { args: RenderArgs } = $props();
  const animationController = $derived(args.animationController);
  const aspectRatio = $derived(args.size[0] / args.size[1]);
  const item = $derived(args.items[0]);
  const content = $derived(item.content);
  const lang = $derived(args.lang);
  const editController = $derived(args.editController);

  const assetsRoot =
    "https://iheyhknkyvnxvedrtxqk.supabase.co/storage/v1/object/public/assets";
</script>

<svelte:head>
  <style>
   @font-face {
      font-family: "CT Eastman Roman";
      src: url("./fonts/ct-eastman-roman-extrabold.ttf") format("truetype");
      font-weight: 800;
      font-style: normal;
      font-display: swap;
    }
  </style>
  <style type="text/tailwindcss">    
    @theme {
      --font-ct-eastman-roman: "CT Eastman Roman", sans-serif;
    }
  </style>
</svelte:head>

<div
  class="flex h-full gap-x-4 overflow-hidden justify-between bg-size-[1080px_300px]  bg-[#ED1C24] bg-[url('{assetsRoot}/images/ad/canadian-tire/bg-triangle-red-dark-1080x300.png')] p-5 flex items-center justify-center font-ct-eastman-roman">
  <div
    class="text-center"
    use:animation={{
      controller: animationController,
      options: {
        name: "fadeIn",
        normal: {
          duration: 250,
        },
        reverse: {
          delay: 5000,
          duration: 50,
        },
      },
    }}>
    <img
      width="630"
      height="144"
      class="mx-auto h-[144px] object-contain"
      src="{assetsRoot}/images/ad/canadian-tire/black-friday-red-thursday-dark-630x144.svg"
      alt="Red Thursday Sale Promo Banner" />

    <h2 class="text-[58px] leading-[103%] text-white font-extrabold mt-3">
      See more deals online now
    </h2>
  </div>
</div>
