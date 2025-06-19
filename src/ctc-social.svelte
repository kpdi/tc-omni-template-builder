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
      font-family: "CT Eastman Compressed";
      src: url("{assetsRoot}/fonts/ct-eastman-compressed-medium.ttf") format("truetype");
      font-weight: 700;
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: "CT Eastman Compressed";
      src: url("./fonts/ct-eastman-compressed-extrabold.ttf") format("truetype");
      font-weight: 800;
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: "CT Eastman Grotesque";
      src: url("{assetsRoot}/ct-eastman-grotesque-medium.ttf") format("truetype");
      font-weight: 500;
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: "CT Eastman Grotesque";
      src: url("{assetsRoot}/fonts/ct-eastman-grotesque-extrabold.ttf") format("truetype");
      font-weight: 800;
      font-style: normal;
      font-display: swap;
    }
  </style>
  <style type="text/tailwindcss">
    @theme {
      --font-ct-eastman-compressed: "CT Eastman Compressed", sans-serif;
      --font-ct-eastman-grotesque: "CT Eastman Grotesque", sans-serif;
    }
  </style>
</svelte:head>



{#if aspectRatio < 0.8}
  <!--TALL-->
  {@const LOGO_SIZE = [120, 110] as [number, number]}
  <div
    class="flex h-full flex-col bg-[#ED1C24] bg-size-[1080px_1920px] bg-[url('{assetsRoot}/images/ad/canadian-tire/bg-triangle-red-2160x3840.png')] px-16 pb-16 pt-[277px]">
    <!--HEADER-->
    <div 
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
        width="663"
        height="151"
        class="object-contain h-[151px]"
        src="{assetsRoot}/images/ad/canadian-tire/black-friday-dark-663x151.svg"
        alt="Red Thursday Sale Promo Banner" />
    </div>
    <!--/HEADER-->

    <!--MAIN-->
    <div 
      class="mt-4"
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
      
      <div class="flex flex-col gap-2 font-ct-eastman-compressed">
        <h2 class="text-[130px] font-extrabold leading-none text-white uppercase max-w-[950px] max-h-[130px] overflow-hidden shrink-0 w-[950px] h-[130px] " use:autoSize>
          {content.savings}
        </h2>
        <h3 class="text-[55px] leading-[85%] text-white font-extrabold">
          ON PERSONAL CARE
        </h3>
      </div>
    </div>
    <!--/MAIN-->

    <!--PRODUCT-->
    <div class="flex flex-col justify-center h-full"
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
      <!--IMG-->
      <div class="relative max-w-2xl mx-auto">
        <img class="overflow-hidden object-contain max-h-[650px]" alt={content.name} src={content.imageUrl} />
        <img
          alt=""
          class="absolute left-0 top-0 h-1/3 w-1/3 object-contain object-[left_top]"
          use:editable={{
            controller: editController,
            content,
            itemIndex: 0,
            key: "logo1",
            setValue(node: HTMLImageElement, value: string) {
              node.src = value ? imageSrc(value, LOGO_SIZE) : BLANK_IMAGE;
            },
          }} />
        <img
          alt=""
          class="absolute right-0 top-0 h-1/3 w-1/3 object-contain object-[right_top]"
          use:editable={{
            controller: editController,
            content,
            itemIndex: 0,
            key: "logo2",
            setValue(node: HTMLImageElement, value: string) {
              node.src = value ? imageSrc(value, LOGO_SIZE) : BLANK_IMAGE;
            },
          }} />
        <img
          alt=""
          class="absolute bottom-0 right-0 h-1/3 w-1/3 object-contain object-[right_bottom]"
          use:editable={{
            controller: editController,
            content,
            itemIndex: 0,
            key: "logo3",
            setValue(node: HTMLImageElement, value: string) {
              node.src = value ? imageSrc(value, LOGO_SIZE) : BLANK_IMAGE;
            },
          }} />
        <img
          alt=""
          class="absolute bottom-0 left-0 h-1/3 w-1/3 object-contain object-[left_bottom]"
          use:editable={{
            controller: editController,
            content,
            itemIndex: 0,
            key: "logo4",
            setValue(node: HTMLImageElement, value: string) {
              node.src = value ? imageSrc(value, LOGO_SIZE) : BLANK_IMAGE;
            },
          }} />
      </div>
      <!--/IMG-->
    </div>
    <!--/PRODUCT-->
  </div>
  <!--/TALL-->
  {:else if aspectRatio < 1.5}
  <!--SQUARE-->
  {@const LOGO_SIZE = [100, 90] as [number, number]}
  <div
    class="relative flex flex-col h-full overflow-hidden bg-[#ED1C24] bg-size-[1080px_1080px] bg-[url('{assetsRoot}/images/ad/canadian-tire/bg-triangle-red-dark-1080x1080.png')] p-16">
    <div
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
      <!--LOGO--> 
      <div>
        <img 
          width="610" 
          height="139" 
          alt="Red Thursday Sale Promo Banner" 
          src="{assetsRoot}/images/ad/canadian-tire/black-friday-red-thursday-dark-610x139.svg" />
      </div>
      <!--/LOGO-->

      <!--Promo Text-->
      <div class="relative mt-3.5 flex flex-col gap-2 font-ct-eastman-compressed">
        <h2
          class="shrink-0 text-[130px] font-extrabold leading-none text-white uppercase shrink-0 max-w-[950px] max-h-[130px] w-[950px] h-[130px] overflow-hidden " use:autoSize>
          {content.savings}
        </h2>
        <h3 class="text-[55px] leading-[85%] text-white font-extrabold">
          ON PERSONAL CARE
        </h3>
      </div>
      <!--/Promo Text-->
    </div>

    <!--PRODUCT-->
    <div class="flex flex-col justify-center h-full mb-12"
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
      <!--IMG-->
      <div class="relative max-w-xl mx-auto">
        <img class="overflow-hidden object-contain max-h-[400px]" alt={content.name} src={content.imageUrl} />
        <img
          alt=""
          class="absolute left-0 top-0 h-1/3 w-1/3 object-contain object-[left_top]"
          use:editable={{
            controller: editController,
            content,
            itemIndex: 0,
            key: "logo1",
            setValue(node: HTMLImageElement, value: string) {
              node.src = value ? imageSrc(value, LOGO_SIZE) : BLANK_IMAGE;
            },
          }} />
        <img
          alt=""
          class="absolute right-0 top-0 h-1/3 w-1/3 object-contain object-[right_top]"
          use:editable={{
            controller: editController,
            content,
            itemIndex: 0,
            key: "logo2",
            setValue(node: HTMLImageElement, value: string) {
              node.src = value ? imageSrc(value, LOGO_SIZE) : BLANK_IMAGE;
            },
          }} />
        <img
          alt=""
          class="absolute bottom-0 right-0 h-1/3 w-1/3 object-contain object-[right_bottom]"
          use:editable={{
            controller: editController,
            content,
            itemIndex: 0,
            key: "logo3",
            setValue(node: HTMLImageElement, value: string) {
              node.src = value ? imageSrc(value, LOGO_SIZE) : BLANK_IMAGE;
            },
          }} />
        <img
          alt=""
          class="absolute bottom-0 left-0 h-1/3 w-1/3 object-contain object-[left_bottom]"
          use:editable={{
            controller: editController,
            content,
            itemIndex: 0,
            key: "logo4",
            setValue(node: HTMLImageElement, value: string) {
              node.src = value ? imageSrc(value, LOGO_SIZE) : BLANK_IMAGE;
            },
          }} />
      </div>
      <!--/IMG-->
    </div>
    <!--/PRODUCT-->

    <!--Logo-->
    <div class="absolute left-16 bottom-16"
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
        width="145" 
        height="129" 
        alt="Canadian Tire Logo" 
        src="{assetsRoot}/images/ad/canadian-tire/logo-canadian-tire-red.svg" />
    </div>
    <!--/Logo-->
  </div>
  <!--/SQUARE-->
  {:else}
  <!--WIDE-->
  {@const LOGO_SIZE = [70, 75] as [number, number]}
  <div
    class="flex h-full gap-x-4 overflow-hidden justify-between bg-size-[1200px_628px] bg-[#ED1C24] bg-[url('{assetsRoot}/images/ad/canadian-tire/bg-triangle-red-1200x628.png')] py-10 px-14 flex items-start gap-6">
    <!--BRAND-->
    <div 
      class="pt-3" 
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
        class="flex items-start"
        width="90" 
        height="80" 
        alt="Canadian Tire Logo" 
        src="{assetsRoot}/images/ad/canadian-tire/logo-canadian-tire-red.svg" />
    </div>
    <!--/BRAND-->

    <!--MAIN-->
    <div class="flex flex-col gap-5 pt-4"
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
      <div class="flex items-start gap-3"> 
        <img
          width="360"
          height="82"
          class="object-contain h-[82px]"
          src="{assetsRoot}/images/ad/canadian-tire/black-friday-red-thursday-dark-610x139.svg"
          alt="Red Thursday Sale Promo Banner" />
        
        <h3 class="text-3xl text-white font-extrabold leading-[90%] font-ct-eastman-grotesque">
          OUR LOWEST <br> 
          PRICES OF <br> 
          THE YEAR†
        </h3>
      </div>

      <!--Promo Text-->
      <div class="relative mt-3 flex flex-col gap-3">
        <h4 class="text-4xl leading-[100%] font-medium text-[#262626] font-ct-eastman-grotesque"><Validity {content} {lang} /></h4>
        <h2
          class="shrink-0 text-[120px] font-extrabold leading-none text-white font-ct-eastman-compressed shrink-0 max-w-[600px] max-h-[90px] w-[600px] h-[90px] overflow-hidden uppercase" use:autoSize>
          {content.savings} 
        </h2>
        <h3 class="text-[45px] leading-[100%] text-white font-extrabold font-ct-eastman-compressed">
          ON PERSONAL CARE
        </h3>
      </div>
      <!--/Promo Text-->
    </div>
    <!--/MAIN-->

    <!--PRODUCT-->
    <div 
      class="relative self-center max-w-[360px]"
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
      <img class="overflow-hidden object-contain max-h-[400px]" alt={content.name} src={content.imageUrl} />
      <img
        alt=""
        class="absolute left-0 top-0 h-1/3 w-1/3 object-contain object-[left_top]"
        use:editable={{
          controller: editController,
          content,
          itemIndex: 0,
          key: "logo1",
          setValue(node: HTMLImageElement, value: string) {
            node.src = value ? imageSrc(value, LOGO_SIZE) : BLANK_IMAGE;
          },
        }} />
      <img
        alt=""
        class="absolute right-0 top-0 h-1/3 w-1/3 object-contain object-[right_top]"
        use:editable={{
          controller: editController,
          content,
          itemIndex: 0,
          key: "logo2",
          setValue(node: HTMLImageElement, value: string) {
            node.src = value ? imageSrc(value, LOGO_SIZE) : BLANK_IMAGE;
          },
        }} />
      <img
        alt=""
        class="absolute bottom-0 right-0 h-1/3 w-1/3 object-contain object-[right_bottom]"
        use:editable={{
          controller: editController,
          content,
          itemIndex: 0,
          key: "logo4",
          setValue(node: HTMLImageElement, value: string) {
            node.src = value ? imageSrc(value, LOGO_SIZE) : BLANK_IMAGE;
          },
        }} />
      <img
        alt=""
        class="absolute bottom-0 left-0 h-1/3 w-1/3 object-contain object-[left_bottom]"
        use:editable={{
          controller: editController,
          content,
          itemIndex: 0,
          key: "logo3",
          setValue(node: HTMLImageElement, value: string) {
            node.src = value ? imageSrc(value, LOGO_SIZE) : BLANK_IMAGE;
          },
        }} />
    </div>
    <!--/PRODUCT-->
  </div>
  <!--/WIDE-->
{/if}