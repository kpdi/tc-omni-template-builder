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
      font-family: "CT Eastman Grotesque";
      src: url("./fonts/ct-eastman-grotesque-heavy.ttf") format("truetype");
      font-weight: 900;
      font-style: normal;
      font-display: swap;
    }
  </style>
  <style type="text/tailwindcss">
    @theme {
      --font-ct-eastman-grotesque: "CT Eastman Grotesque", sans-serif;
    }
  </style>
</svelte:head>

<div
  class="flex h-full gap-x-4 overflow-hidden justify-between bg-size-[1080px_300px] bg-[#ED1C24] bg-[url('{assetsRoot}/images/ad/canadian-tire/bg-triangle-red-dark-1080x300.png')] p-5 flex items-center justify-center font-ct-eastman-grotesque">
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
    
    <h2
      class="text-[80px] leading-[100%] tracking-[0.395px] text-white font-black uppercase max-w-[984px] max-h-[140px] w-[984px] h-[140px] overflow-hidden"
      use:autoSize>
      {item.content.name} 
    </h2>
  </div>
</div>    
