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

{#if aspectRatio > 6 && aspectRatio < 7}
  <!--THIN-->
  <div
    class="flex h-full flex-shrink-0 gap-x-4 bg-[#ED1C24] bg-[url('{assetsRoot}/images/ad/canadian-tire/bg-triangle-red-320x50.svg')] px-4 py-1.5">
    <!--LOGO-->
    <img
      width="28"
      height="26"
      class="h-[26px] object-contain"
      alt="Canadian Tire Logo"
      src="{assetsRoot}/images/ad/canadian-tire/logo-canadian-tire-red.svg"
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
      }}/>
    <!--/LOGO-->

    <div 
      class="flex w-full items-center justify-between"
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
        width="158"
        height="36"
        src="{assetsRoot}/images/ad/canadian-tire/black-friday-red-thursday-dark-158x36.svg"
        alt="Red Thursday Sale Promo Banner" />

      <a
        href={content.link}
        target="_blank"
        class="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-white cursor-pointer">
        <img width="16" height="16" src="{assetsRoot}/images/ad/canadian-tire/chevron-right-black.svg" alt="Chevron icon" />
      </a>
    </div>
  </div>
  <!--/THIN-->
{:else if aspectRatio < 0.8}
  <!--TALL-->
  {@const LOGO_SIZE = [93, 69] as [number, number]}
  <div
    class="flex h-full flex-col bg-[#ED1C24] bg-size-[300px_600px] bg-[url('{assetsRoot}/images/ad/canadian-tire/bg-triangle-red-600x1200.png')] p-4">
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
      <!--LOGO-->
      <div>
        <img width="58" height="53" alt="Canadian Tire Logo" src="{assetsRoot}/images/ad/canadian-tire/logo-canadian-tire-red.svg" />
      </div>
      <!--/LOGO-->
    </div>
    <!--/HEADER-->

    <!--MAIN-->
    <div 
      class="mt-3.5"
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
      <!--Main content-->
      <div>
        <img
          width="230"
          height="53"
          class="object-contain h-[53px]"
          src="{assetsRoot}/images/ad/canadian-tire/black-friday-red-thursday-dark-230x53.svg"
          alt="Red Thursday Sale Promo Banner" />

        <div class="flex flex-col gap-1 pb-2.5 pt-2">
          <h3 class="text-lg leading-[100%] font-extrabold text-white font-ct-eastman-grotesque">
            OUR LOWEST PRICES <br> OF THE YEAR<sup>†</sup>
          </h3>
          <h4 class="text-base leading-[100%] font-medium text-black font-ct-eastman-grotesque"><Validity {content} {lang} /></h4>
          <h2 class="text-[58px] uppercase font-extrabold leading-none text-white max-w-[268px] max-h-[98px] overflow-hidden shrink-0 w-[268px] h-[98px] font-ct-eastman-compressed" use:autoSize>
            {content.savings}
          </h2>
        </div>

        <!--CTA-->
        <div>
          <a
            href={content.link}
            target="_blank"
            class="flex h-[44px] min-w-[120px] max-w-[150px] items-center justify-center rounded-sm bg-black p-1 text-center text-[13px] font-sans leading-none text-white backdrop-blur-sm transition-colors duration-300 ease-in-out hover:bg-opacity-90 shrink-0">
            {#if lang === "en"}
              Shop Now
            {:else}
              Achetez maintenant
            {/if}
          </a>
        </div>
        <!--/CTA-->
      </div>
      <!--Main content-->

      <!--PRODUCT-->
      <div class="relative pt-1.5">
        <img
          class="mx-auto max-h-[200px] overflow-hidden object-contain"
          alt={content.name}
          src={content.imageUrl} />
        <img
          alt=""
          class="absolute left-4 top-4 h-1/3 w-1/3 object-contain object-[left_top]"
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
          class="absolute right-4 top-4 h-1/3 w-1/3 object-contain object-[right_top]"
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
          class="absolute bottom-4 right-4 h-1/3 w-1/3 object-contain object-[right_bottom]"
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
          class="absolute bottom-4 left-4 h-1/3 w-1/3 object-contain object-[left_bottom]"
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
    <!--/MAIN-->
  </div>
  <!--/TALL-->
  {:else if aspectRatio < 1.5}
  <!--SQUARE-->
  {@const LOGO_SIZE = [48, 45] as [number, number]}
  <div
    class="flex h-full justify-between overflow-hidden bg-[#ED1C24] bg-size-[300px_250px] bg-[url('{assetsRoot}/images/ad/canadian-tire/bg-triangle-red-600x500.png')] py-2.5">
    <!--COL(left)-->
    <div
      class="w-[140px] shrink-0 pl-2.5 pr-1.5"
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
          width="48" 
          height="44" 
          alt="Canadian Tire Logo" 
          src="{assetsRoot}/images/ad/canadian-tire/logo-canadian-tire-red.svg" />
      </div>
      <!--/LOGO-->

      <!--IMG-->
      <div class="relative mt-3 flex flex-col gap-1.5">
        <img
          width="107"
          height="69"
          class="mx-auto- h-[69px] object-contain"
          src="{assetsRoot}/images/ad/canadian-tire/black-friday-red-thursday-dark-107x69.svg"
          alt="Red Thursday Sale Promo Banner" />
        <h2
          class="shrink-0 text-[24px] font-extrabold uppercase leading-none text-white max-w-[124px] max-h-[48px] w-[124px] h-[48px] overflow-hidden font-ct-eastman-compressed" use:autoSize>
          {content.savings}
        </h2>

        <!--CTA-->
        <div class="w-[124px]">
          <a
            href={content.link}
            target="_blank"
            class="flex h-[35px] items-center justify-center rounded-sm bg-black p-1 text-center text-[13px] font-sans leading-none text-white backdrop-blur-sm transition-colors duration-300 ease-in-out hover:bg-opacity-90 shrink-0">
            {#if lang === "en"}
              Shop Now
            {:else}
              Achetez maintenant
            {/if}
          </a>
        </div>
        <!--/CTA-->
      </div>
    </div>
    <!--/COL(left)-->

    <!--COL(right)-->
    <div 
      class="mx-auto flex w-[160px] shrink-0 items-center pl-2.5 pr-2.5" 
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
      <!--PRODUCT-->
      <div class="relative w-full">
        <img class="mx-auto max-w-[144px] max-h-[190px] object-contain" alt={content.name} src={content.imageUrl} />
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
      <!--/PRODUCT-->
    </div>
    <!--/COL(right)-->
  </div>
  <!--/SQUARE-->
  {:else if aspectRatio > 3 && aspectRatio < 4}
  <!--WIDE LARGE-->
  <!-- {@const LOGO_SIZE = [27, 27] as [number, number]} -->
  <div class="flex gap-7 h-full overflow-hidden bg-[#ED1C24] bg-[url('{assetsRoot}/images/ad/canadian-tire/bg-triangle-red-dark-970x250.png')] p-4 pt-3">
    <!--Logo-->
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
        width="58" 
        height="53" 
        alt="Canadian Tire Logo" 
        src="{assetsRoot}/images/ad/canadian-tire/logo-canadian-tire-red.svg" />
    </div>
    <!--/Logo-->
  
    <!--Main content-->
    <div 
      class="mt-2" 
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
      <!--Black Friday image and Text-->
      <div class="flex items-start gap-4">
        <img
          width="230"
          height="52"
          loading="lazy"
          class="object-contain"
          src="{assetsRoot}/images/ad/canadian-tire/black-friday-red-thursday-dark-227x52.svg"
          alt="Black Friday Banner" />
        
        <h3 class="text-xl text-white font-extrabold leading-[0.9] font-ct-eastman-grotesque">OUR LOWEST <br> PRICES OF <br> THE YEAR†</h3>
      </div>
      <!--/Black Friday image and Text-->
  
      <!--Promo text-->
      <div class="pb-1.5 pt-2">
        <p class="text-lg font-medium leading-6 text-black font-ct-eastman-grotesque pb-0.5"><Validity {content} {lang} /></p>
        <h2 class="text-[70px] font-extrabold text-white uppercase font-ct-eastman-compressed leading-none max-w-[565px] max-h-[70px] overflow-hidden shrink-0 w-[565px] h-[70px]" use:autoSize>
          {content.savings}
        </h2>
      </div>
      <!--/Promo text-->
  
      <!--CTA-->
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
        <a
          href={content.link}
          target="_blank"
          class="flex min-h-[42px] max-w-[150px] items-center justify-center rounded-sm bg-black p-1 text-center font-sans text-[13px] leading-none text-white backdrop-blur-sm transition-colors duration-300 ease-in-out hover:bg-opacity-90 shrink-0">
          {#if lang === "en"}
            Shop Now
          {:else}
            Achetez maintenant
          {/if}
        </a>
      </div>
      <!--/CTA-->
    </div>
    <!--/Main content-->
  
    <!--Product image-->
    <div class="relative self-center ml-auto"
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
      <img class="max-h-[220px] max-w-60 object-contain overflow-hidden" alt={content.name} src={content.imageUrl} />
      <!-- <img
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
        }} /> -->
    </div>
    <!--/Product image-->
  </div>
  <!--WIDE LARGE-->
  {:else}
  <!--WIDE-->
  {@const LOGO_SIZE = [27, 27] as [number, number]}
  <div
    class="flex h-full gap-x-4 overflow-hidden bg-[#ED1C24] bg-[url('{assetsRoot}/images/ad/canadian-tire/bg-triangle-red-wide.svg')] px-2.5">
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
        width="48" 
        height="44" 
        alt="Canadian Tire Logo" 
        src="{assetsRoot}/images/ad/canadian-tire/logo-canadian-tire-red.svg" />
    </div>
    <!--/BRAND-->

    <div class="flex items-center justify-between gap-x-3- w-full"> 
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
          width="230"
          height="53"
          class="object-contain h-[53px]"
          src="{assetsRoot}/images/ad/canadian-tire/black-friday-red-thursday-dark-230x53.svg"
          alt="Red Thursday Sale Promo Banner" />
      </div>
      
      <div class="max-w-36"
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
        <h2 class="text-xl text-white font-extrabold leading-5 font-ct-eastman-grotesque">OUR LOWEST PRICES OF THE YEAR†</h2>
      </div>

      <!--CTA-->
      <div 
        use:animation={{ controller: animationController, options: {
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
        <a
          href={content.link}
          target="_blank"
          class="flex min-h-[35px] min-w-[110px] max-w-[150px] items-center justify-center rounded-sm bg-black p-1 text-center text-[13px] font-sans leading-none text-white backdrop-blur-sm transition-colors duration-300 ease-in-out hover:bg-opacity-90 shrink-0">
          {#if lang === "en"}
            Shop Now
          {:else}
            Achetez maintenant
          {/if}
        </a>
      </div>
      <!--/CTA-->

      <!--PRODUCT-->
      <div 
        class="relative self-center"
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
        <img class="h-20 w-24 object-contain" alt={content.name} src={content.imageUrl} />
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
  </div>
  <!--/WIDE-->
{/if}