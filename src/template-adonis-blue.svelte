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

{#if aspectRatio > 6 && aspectRatio < 7}
  <!--THIN-->
  <div
    class="bg-adonis-blue-light flex h-full justify-between gap-x-5 bg-[url('/images/ad/bg-blue-light-320x50.webp')] px-4 py-1.5">
    <!--LOGO-->
    <img
      width="118"
      height=""
      class="shrink-0 self-center"
      alt="Adonis - A world of freshness"
      src="{assetsRoot}/images/ad/logo-adonis-white.svg"
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
      }} />
    <!--/LOGO-->

    <!--LINK-->
    <a
      href={content.link}
      target="_blank"
      class="bg-adonis-red-medium font-gotham hover:bg-adonis-red-medium/90 flex-none grow self-center rounded px-1 text-center text-[12px] font-bold text-white transition-colors duration-300 ease-in-out"
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
      {#if lang === "en"}
        SEE OUR FLYER
      {:else}
        VOIR NOTRE FLYER
      {/if}
    </a>
    <!--/LINK-->
  </div>
  <!--/THIN-->
{:else if aspectRatio < 0.8}
  <!--TALL-->
  {@const LOGO_SIZE = [93, 69] as [number, number]}
  <div
    class="p-2.5- bg-adonis-blue-light flex h-full flex-col bg-[url('{assetsRoot}/images/ad/bg-blue-light-300x600.webp')] bg-cover py-2.5 pr-2.5 pl-3">
    <!--HEADER-->
    <div
      class="flex items-center justify-between"
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
          width="170"
          height="56"
          alt="Adonis - A world of freshness"
          src="{assetsRoot}/images/ad/logo-adonis-white.svg" />
      </div>
      <!--/LOGO-->

      <!--SALE-->
      <div>
        <img
          width="98"
          height="73"
          alt="Half Price Sale Banner"
          class="ml-auto table"
          src="{assetsRoot}/images/ad/savings-half-price-blue-red.svg" />
      </div>
      <!--/SALE-->
    </div>
    <!--/HEADER-->

    <!--MAIN-->
    <div class="relative mt-4"
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
      <!--PRICE-->
      <div
        class="relative h-[118px] w-[154px] bg-[url('{assetsRoot}/images/ad/bg-blue-yellow-angled.svg')] bg-cover px-2.5">
        {#if content.price}
          {@const [dollars, cents] = content.price.split(" /")[0].replace("$", "").split(/[.,]/)}
          <div class="font-kapra relative flex top-1/2 -translate-y-1/2 -rotate-6 justify-center px-1 py-0">
            <span
              class="text-adonis-red-medium text-[120px] leading-none font-bold [text-shadow:-2px_-2px_0_white,2px_2px_0_white,-2px_2px_0_white,2px_-2px_0_white] overflow-hidden max-w-[85px] max-h-[80px]" use:autoSize
              >{dollars}</span>
            <span class="-mt-px ml-0.5 flex flex-col">
              {#if cents}
                <span
                  class="text-adonis-red-medium mt-[8px] -ml-[2px]- text-[70px] leading-none font-bold [text-shadow:-2px_-2px_0_white,2px_2px_0_white,-2px_2px_0_white,2px_-2px_0_white] overflow-hidden max-w-[45px] max-h-[35px]" use:autoSize
                  >{cents}</span>
              {/if}
              {#if content.price.includes("/")}
                <span class="ml-auto text-[24px] leading-none text-black"
                  >/{content.price.split("/")[1]}</span>
              {/if}
            </span>
          </div>
        {/if}
      </div>
      <!--/PRICE-->

      <!--IMG-->
      <div class="relative -mt-12">
        <img class="mx-auto h-54 object-contain" alt={content.name} src={content.imageUrl} />
        <img
          alt=""
          class="absolute top-4 left-4 h-1/3 w-1/3 object-contain object-[left_top]"
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
          class="absolute top-4 right-4 h-1/3 w-1/3 object-contain object-[right_top]"
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
          class="absolute right-4 bottom-4 h-1/3 w-1/3 object-contain object-[right_bottom]"
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
      <!--/IMG-->

      <!--SAVINGS-->
      {#if content.savings}
        <div class="absolute right-8 bottom-1 w-[120px]">
          <div
            class="border-adonis-yellow-medium bg-adonis-blue-darker font-gotham-condensed text-adonis-yellow-medium relative z-10 border py-[1px] text-xl">
            <div
              class="relative left-1/2 inline-block max-h-[30px] max-w-[112px] -translate-x-1/2 -rotate-3 overflow-hidden leading-none"
              use:editable={{
                controller: editController,
                content,
                itemIndex: 0,
                key: "savings",
                setValue(node, value) {
                  node.innerText = value;
                  autoSize(node);
                },
              }}>
            </div>
          </div>
          <span class="bg-adonis-yellow-medium absolute top-1 -left-1 -z-0 h-full w-full"></span>
        </div>
      {/if}
      <!--/SAVINGS-->
    </div>
    <!--/MAIN-->

    <!--NAME-->
    <div
      class="font-gotham-condensed mt-2.5 text-center text-white"
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
      <!-- svelte-ignore a11y_missing_content -->
      <h2
        class="max-h-[66px] max-w-[276px] overflow-hidden text-[38px] leading-[32px] font-bold"
        use:editable={{
          controller: editController,
          content,
          itemIndex: 0,
          key: "name",
          setValue(node, value) {
            node.innerText = value;
            autoSize(node);
          },
        }}>
      </h2>
      <!-- svelte-ignore a11y_missing_content -->
      <h3
        class="mt-1 max-h-[42px] max-w-[276px] overflow-hidden text-[21px] leading-[21px]"
        use:editable={{
          controller: editController,
          content,
          itemIndex: 0,
          key: "description",
          setValue(node, value) {
            node.innerText = value;
            autoSize(node);
          },
        }}>
      </h3>
      <!-- svelte-ignore a11y_missing_content -->
      <h4
        class="mt-1 max-h-[21px] max-w-[278px] overflow-hidden text-[21px] leading-[21px]"
        use:editable={{
          controller: editController,
          content,
          itemIndex: 0,
          key: "alternatePrice",
          setValue(node, value) {
            node.innerText = value;
            autoSize(node);
          },
        }}>
      </h4>
    </div>
    <!--/NAME-->

    <!--CTA-->
    <div class="mt-auto text-center" 
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
        class="bg-adonis-red-medium font-gotham hover:bg-adonis-red-medium/90 inline-block rounded px-10 py-1 text-center text-base font-bold text-white transition-colors duration-300 ease-in-out">
        {#if lang === "en"}
          SEE OUR FLYER
        {:else}
          VOIR NOTRE FLYER
        {/if}
      </a>
      <h3
        class="font-gotham-condensed max-h-[26px] max-w-[278px] overflow-hidden pt-0.5 text-[19px] text-white">
        <Validity {content} {lang} />
      </h3>
    </div>
    <!--/CTA-->
  </div>
  <!--/TALL-->
{:else if aspectRatio < 1.5}
  <!--SQUARE-->
  {@const LOGO_SIZE = [48, 45] as [number, number]}
  <div
    class="bg-adonis-blue-light flex h-full overflow-hidden bg-[url('{assetsRoot}/images/ad/bg-blue-light-300x250.webp')] py-2">
    <!--COL(left)-->
    <div
      class="w-[160px] shrink-0 pr-1.5 pl-2.5"
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
          width="145"
          height="48"
          alt="Adonis - A world of freshness"
          src="{assetsRoot}/images/ad/logo-adonis-white.svg" />
      </div>
      <!--/LOGO-->

      <!--PRODUCT-->
      <div class="relative mt-2">
        <!--SAVINGS-->
        {#if content.savings}
          <div class="absolute top-0 left-0 z-10 w-[90px] text-center">
            <div
              class="border-adonis-yellow-medium bg-adonis-blue-darker font-gotham-condensed text-adonis-yellow-medium relative z-10 border px-1 font-medium">
              <div
                class="inline-block max-h-[28px] max-w-[80px] -rotate-3 overflow-hidden"
                use:editable={{
                  controller: editController,
                  content,
                  itemIndex: 0,
                  key: "savings",
                  setValue(node, value) {
                    node.innerText = value;
                    autoSize(node);
                  },
                }}>
              </div>
            </div>
            <span class="bg-adonis-yellow-medium absolute top-1 -left-1 -z-0 h-full w-full"></span>
            <!--decorative element-->
          </div>
        {/if}
        <!--/SAVINGS-->

        <!--IMG-->
        <div class="relative">
          <img class="mx-auto h-[135px] object-contain" alt={content.name} src={content.imageUrl} />
          {#if content.savings}
            <img
              alt=""
              class="absolute top-[30px] left-0 h-1/3 w-1/3 object-contain object-[left_top]"
              use:editable={{
                controller: editController,
                content,
                itemIndex: 0,
                key: "logo1",
                setValue(node: HTMLImageElement, value: string) {
                  node.src = value ? imageSrc(value, LOGO_SIZE) : BLANK_IMAGE;
                },
              }} />
          {:else}
            <img
              alt=""
              class="absolute top-0 left-0 h-1/3 w-1/3 object-contain object-[left_top]"
              use:editable={{
                controller: editController,
                content,
                itemIndex: 0,
                key: "logo1",
                setValue(node: HTMLImageElement, value: string) {
                  node.src = value ? imageSrc(value, LOGO_SIZE) : BLANK_IMAGE;
                },
              }} />
          {/if}
          <img
            alt=""
            class="absolute top-0 right-0 h-1/3 w-1/3 object-contain object-[right_top]"
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
            class="absolute right-0 bottom-0 h-1/3 w-1/3 object-contain object-[right_bottom]"
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

      <!--CTA-->
      <div>
        <a
          href={content.link}
          target="_blank"
          class="bg-adonis-red-medium font-gotham hover:bg-adonis-red-medium/90 block rounded p-1 text-center text-[12px] leading-none font-bold text-white transition-colors duration-300 ease-in-out">
          {#if lang === "en"}
            SEE OUR FLYER
          {:else}
            VOIR NOTRE FLYER
          {/if}
        </a>
        <h3
          class="font-gotham-condensed max-h-[25px] max-w-[144px] overflow-hidden pt-0.5 text-[15px] text-white">
          <Validity {content} {lang} />
        </h3>
      </div>
      <!--/CTA-->
    </div>
    <!--/COL(left)-->

    <!--COL(right)-->
    <div
      class="flex w-[140px] shrink-0 flex-col pr-3 pl-2"      
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
      <!--SALE-->
      <img
        width="85"
        height="64"
        alt="Half Price Sale Banner"
        class="ml-auto table"
        src="{assetsRoot}/images/ad/savings-half-price-blue-red.svg" />
      <!--/SALE-->

      <!--NAME-->
      <div class="font-gotham-condensed mt-1 mb-2 text-right leading-none text-white">
        <h2
          class="max-h-[40px] max-w-[118px] overflow-hidden text-[26px] font-bold"
          use:editable={{
            controller: editController,
            content,
            itemIndex: 0,
            key: "name",
            setValue(node, value) {
              node.innerText = value;
              autoSize(node);
            },
          }}>
          {item.content.name}
        </h2>
        <h3
          class="mt-px max-h-[20px] max-w-[118px] overflow-hidden text-[15px] leading-none"
          use:editable={{
            controller: editController,
            content,
            itemIndex: 0,
            key: "description",
            setValue(node, value) {
              node.innerText = value;
              autoSize(node);
            },
          }}>
          {item.content.description}
        </h3>
        <h4
          class="mt-px max-h-[15px] max-w-[118px] overflow-hidden text-[15px] leading-none"
          use:editable={{
            controller: editController,
            content,
            itemIndex: 0,
            key: "alternatePrice",
            setValue(node, value) {
              node.innerText = value;
              autoSize(node);
            },
          }}>
          {item.content.alternatePrice}
        </h4>
      </div>
      <!--/NAME-->

      <!--PRICE-->
      <div
        class="mt-auto ml-auto table relative shrink-0 h-[78px] w-[102px] bg-[url('{assetsRoot}/images/ad/bg-blue-yellow-angled.svg')] bg-cover px-1">
        {#if content.price}
          {@const [dollars, cents] = content.price.split(" /")[0].replace("$", "").split(/[.,]/)}
          <div
            class="font-kapra relative top-1/2 flex -translate-y-1/2 -rotate-6 justify-center px-1 py-0">
            <span
              class="text-adonis-red-medium max-h-[60px] max-w-[55px] overflow-hidden text-[80px] leading-none font-bold [text-shadow:-2px_-2px_0_white,2px_2px_0_white,-2px_2px_0_white,2px_-2px_0_white]"
              use:autoSize>
              <!-- {dollars} -->
               0
            </span>
            <span class="-mt-px ml-0.5 flex flex-col">
              {#if cents}
                <span
                  class="text-adonis-red-medium mt-[5px] max-h-[31px] max-w-[31px] overflow-hidden text-[48px] leading-none font-bold [text-shadow:-2px_-2px_0_white,2px_2px_0_white,-2px_2px_0_white,2px_-2px_0_white]"
                  use:autoSize>
                  <!-- {cents} -->
                   99
                </span>
              {/if}
              {#if content.price.includes("/")}
                <span class="mt-1 ml-auto text-[16px] leading-none text-black">
                  /{content.price.split("/")[1]}
                </span>
              {/if}
            </span>
          </div>
        {/if}
      </div>
      <!--/PRICE-->
    </div>
    <!--/COL(right)-->
  </div>
  <!--/SQUARE-->
{:else}
  <!--WIDE-->
  {@const LOGO_SIZE = [27, 27] as [number, number]}
  <div
    class="bg-adonis-blue-light flex h-full gap-x-2 overflow-hidden bg-[url('/images/ad/bg-blue-light-728x90.webp')] px-2">
    <!--BRAND-->
    <div class="flex flex-col py-2 shrink-0"
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
      <img
        width="121"
        height="40"
        alt="Adonis - A world of freshness"
        src="{assetsRoot}/images/ad/logo-adonis-white.svg" />
      <!--/LOGO-->

      <!--CTA-->
      <a
        href={content.link}
        target="_blank"
        class="bg-adonis-red-medium font-gotham hover:bg-adonis-red-medium/90 mt-auto block rounded px-4 py-px text-center text-xs font-bold text-white transition-colors duration-300 ease-in-out">
        {#if lang === "en"}
          SEE OUR FLYER
        {:else}
          VOIR NOTRE FLYER
        {/if}
      </a>
      <!--/CTA-->
    </div>
    <!--/BRAND-->

    <!--PRICE-->
    <div
      class="ml-[34px]- ml-5 h-[80px] w-[104px] self-center bg-[url('{assetsRoot}/images/ad/bg-blue-yellow-angled.svg')] bg-cover relative px-1"
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
      {#if content.price}
        {@const [dollars, cents] = content.price.split(" /")[0].replace("$", "").split(/[.,]/)}
        <div
          class="font-kapra relative flex top-1/2 -translate-y-1/2 -rotate-6 justify-center px-1 py-0">
          <span
            class="text-adonis-red-medium max-h-[60px] max-w-[55px] overflow-hidden text-[80px] leading-none font-bold [text-shadow:-2px_-2px_0_white,2px_2px_0_white,-2px_2px_0_white,2px_-2px_0_white]"
            use:autoSize>
            {dollars}
          </span>
          <span class="-mt-px ml-0.5 flex flex-col">
            {#if cents}
              <span
                class="text-adonis-red-medium mt-[5px] max-h-[31px] max-w-[31px] overflow-hidden text-[48px] leading-none font-bold [text-shadow:-2px_-2px_0_white,2px_2px_0_white,-2px_2px_0_white,2px_-2px_0_white]"
                use:autoSize>{cents}</span>
            {/if}
            {#if content.price.includes("/")}
              <span class="ml-auto text-[16px] leading-none text-black"
                >/{content.price.split("/")[1]}</span>
            {/if}
          </span>
        </div>
      {/if}
    </div>
    <!--/PRICE-->

    <!--IMG-->
    <div class="relative self-center"
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
      <img class="w-36 h-[90px] object-contain" alt={content.name} src={content.imageUrl} />
      <img
        alt=""
        class="absolute top-0 left-0 h-1/3 w-1/3 object-contain object-[left_top]"
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
        class="absolute top-0 right-0 h-1/3 w-1/3 object-contain object-[right_top]"
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
        class="absolute right-0 bottom-0 h-1/3 w-1/3 object-contain object-[right_bottom]"
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
    <!--/IMG-->

    <!--SAVINGS-->
    {#if content.savings}
      <div
        class="relative mt-3 w-[75px] self-start text-center"
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
        <div
          class="border-adonis-yellow-medium bg-adonis-blue-darker font-gotham-condensed text-adonis-yellow-medium relative z-10 border py-[1px]">
          <div
            class="inline-block px-1 max-h-[28px] max-w-[80px] -rotate-3 overflow-hidden"
            use:editable={{
              controller: editController,
              content,
              itemIndex: 0,
              key: "savings",
              setValue(node, value) {
                node.innerText = value;
                autoSize(node);
              },
            }}>
          </div>
        </div>
        <span class="bg-adonis-yellow-medium absolute top-1 -left-1 -z-0 h-full w-full"></span>
        <!--decorative element-->
      </div>
    {/if}
    <!--/SAVINGS-->

    <!--NAME-->
    <div
      class="font-gotham-condensed flex w-[144px] py-1 flex-col justify-center text-white"
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
      <!-- svelte-ignore a11y_missing_content -->
      <h2
        class="max-h-[42px] max-w-[144px] overflow-hidden text-[24px] leading-tight font-bold"
        use:editable={{
          controller: editController,
          content,
          itemIndex: 0,
          key: "name",
          setValue(node, value) {
            node.innerText = value;
            autoSize(node);
          },
        }}>
      </h2>
      <!-- svelte-ignore a11y_missing_content -->
      <h3
        class="max-h-[28px] max-w-[144px] overflow-hidden text-[14px] leading-none"
        use:editable={{
          controller: editController,
          content,
          itemIndex: 0,
          key: "description",
          setValue(node, value) {
            node.innerText = value;
            autoSize(node);
          },
        }}>
      </h3>
      <!-- svelte-ignore a11y_missing_content -->
      <h4
        class="max-h-[44px] max-w-[144px] overflow-hidden text-[14px] leading-none"
        use:editable={{
          controller: editController,
          content,
          itemIndex: 0,
          key: "alternatePrice",
          setValue(node, value) {
            node.innerText = value;
            autoSize(node);
          },
        }}>
      </h4>
    </div>
    <!--/NAME-->

    <!--MISC-->
    <div class="ml-auto py-1"
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
      <!--SALE-->
      <img
        width="85"
        height="64"
        alt="Half Price Sale Banner"
        class="ml-auto table"
        src="{assetsRoot}/images/ad/savings-half-price-blue-red.svg" />
      <!--/SALE-->

      <!--EXPIRATION-->
      <h3
        class="font-gotham-condensed max-h-[20px] max-w-[96px] overflow-hidden text-[13px] text-white">
        <Validity {content} {lang} />
      </h3>
      <!--/EXPIRATION-->
    </div>
  </div>
  <!--/WIDE-->
{/if}