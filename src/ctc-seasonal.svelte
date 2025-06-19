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


{#if aspectRatio < 1}
  <!--TALL-->
  <!-- {@const LOGO_SIZE = [120, 110] as [number, number]} -->
  <div class="pt-[194px] relative w-full h-full bg-size-[1000px_1250px]">
    <div
     class="h-full w-full bg-cover bg-center bg-no-repeat bg-[url('{assetsRoot}/images/ad/canadian-tire/couple-camping-1000x1250.webp')] p-16">
     <!--Red Angled Banner with Text-->
      <div class="absolute top-0 left-0 w-full h-[620px] bg-[#D81E05] z-10 [clip-path:polygon(0_0,100%_0,100%_55%,0_100%)]">
        <div class="pr-6 pl-16 pt-16 font-ct-eastman-roman"
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
          <h2 class="text-white font-extrabold text-7xl leading-[80px]"> 
            Outdoor <br> 
            adventures begin <br> 
            at your local <br> 
            Canadian Tire
          </h2>
        </div>
      </div>
      <!--/Red Angled Banner with Text--> 

      <!--Logo-->
      <div class="absolute bottom-[72px] right-[72px]"
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
          width="539" 
          height="106" 
          alt="Canadian Tire Logo" 
          src="{assetsRoot}/images/ad/canadian-tire/canadian-tire-store-en-539x107.svg" />
      </div>
      <!--/Logo-->
    </div>
  </div>
  <!--/TALL-->
  {:else if aspectRatio < 1.5}
  <!--SQUARE-->
  <!-- {@const LOGO_SIZE = [90, 85] as [number, number]} -->
  <div class="pt-[114px] relative w-full h-full bg-size-[1080px_1080px]">
    <div
     class="h-full bg-cover bg-center bg-no-repeat bg-[url('{assetsRoot}/images/ad/canadian-tire/couple-campign-1080x1080.webp')] p-16">
     <!--Red Angled Banner with Text-->
      <div class="absolute top-0 left-0 w-full h-[550px] bg-[#D81E05] z-10 [clip-path:polygon(0_0,100%_0,100%_47%,0_100%)]">
        <div class="pr-6 pl-16 pt-16 font-ct-eastman-roman"
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
          <h2 class="text-white font-extrabold text-7xl leading-[85px]">
            Outdoor adventures<br />
            begin at your local<br />
            Canadian Tire
          </h2>
        </div>
      </div>
      <!--/Red Angled Banner with Text-->

      <!--Logo-->
      <div class="absolute bottom-[72px] right-[72px]"
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
          width="539" 
          height="106" 
          alt="Canadian Tire Logo" 
          src="{assetsRoot}/images/ad/canadian-tire/canadian-tire-store-en-539x107.svg" />
      </div>
      <!--/Logo-->
    </div>
  </div>
  <!--/SQUARE-->
  {:else if aspectRatio > 1.8 && aspectRatio < 2.1}
  <!--WIDE-->
  <!-- {@const LOGO_SIZE = [70, 75] as [number, number]} -->
  <div class="pl-[475px] relative w-full h-full bg-size-[1200px_628px]">
    <div
     class="w-full h-full bg-cover bg-center bg-no-repeat bg-[url('{assetsRoot}/images/ad/canadian-tire/couple-camping-wide-1576x1257.webp')]">
     <!--Red Angled Banner with Text-->
      <div class="absolute left-0 top-0 z-10 w-full h-[628px] bg-[#D81E05] text-white p-16 [clip-path:polygon(0_0,52%_0,66%_100%,0%_100%)]">
        <div class="font-ct-eastman-roman"
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
          <h2 class="text-[56px] font-extrabold leading-[110%]">
            Outdoor<br />
            adventures begin<br />
            at your local<br />
            Canadian Tire
          </h2>
        </div>
      </div>
      <!--/Red Angled Banner with Text-->

      <!--Logo-->
      <div class="absolute bottom-[72px] left-[64px] z-10"
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
          width="539" 
          height="106" 
          alt="Canadian Tire Logo" 
          src="{assetsRoot}/images/ad/canadian-tire/canadian-tire-store-en-539x107.svg" />
      </div>
      <!--/Logo-->
    </div>
  </div>
  <!--/WIDE-->
{/if}

