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
  <style type="text/tailwindcss">
    @theme {
      --color-adonis-blue-lighter: #1d3983;
      --color-adonis-sky-medium: #1f7ba0;
      --color-adonis-red-medium: #d5002c;
      --color-adonis-yellow-dark: #f8db0f;
    }
  </style>
</svelte:head>

{#if aspectRatio > 6 && aspectRatio < 7}
  <!--THIN-->
  <div
    class="bg-[#CC112C] flex h-full justify-between overflow-hidden bg-[url('{assetsRoot}/images/ad/adonis/bg-adonis-canada-320x50.svg')] bg-cover px-2 py-1.5"
  >
    <!--LOGO-->
    <img
      width="128"
      height="46"
      class="shrink-0 self-center"
      alt="Adonis - A world of freshness"
      src="{assetsRoot}/images/ad/adonis/logo-adonis-white.svg"
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
      }}
    />
    <!--/LOGO-->

    <!--LINK-->
    <a
      href={content.link}
      target="_blank"
      class="bg-adonis-sky-medium font-gotham hover:bg-adonis-sky-medium/90 flex-none self-center rounded px-3 py-1 text-center text-sm font-bold text-white transition-colors duration-300 ease-in-out"
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
      }}
    >
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
  {@const LOGO_SIZE = [93, 75] as [number, number]}
  <div
    class="bg-[#CC112C] flex h-full flex-col bg-[url('{assetsRoot}/images/ad/adonis/bg-adonis-canada-300x600.svg')] bg-cover py-2.5 pr-2.5 pl-3"
  >
    <!--HEADER-->
    <div
      class="flex justify-center"
      use:animation={{
        controller: animationController,
        options: {
          name: "fadeIn",
          normal: { duration: 250 },
          reverse: { delay: 5000, duration: 50 },
        },
      }}
    >
      <!--LOGO-->
      <img
        width="240"
        height="88"
        alt="Adonis - A world of freshness"
        src="{assetsRoot}/images/ad/adonis/logo-adonis-white.svg"
      />
      <!--/LOGO-->
    </div>
    <!--/HEADER-->

    <!--MAIN-->
    <div
      class="relative mt-1 flex flex-col justify-between h-full"
      use:animation={{
        controller: animationController,
        options: {
          name: "fadeIn",
          normal: { duration: 250 },
          reverse: { delay: 5000, duration: 50 },
        },
      }}
    >
      <!--IMG-->
      <div class="relative">
        <img
          class="mx-auto h-64 object-contain"
          alt={content.name}
          src={content.imageUrl}
        />
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
          }}
        />
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
          }}
        />
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
          }}
        />
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
          }}
        />
      </div>
      <!--/IMG-->

      <!--PRICE + SAVINGS + TEXT-->
      <div class="flex gap-2 items-center -mt-4 z-10">
        <!--LEFT (col)-->
        <div class="-bottom-1 relative self-end">
          <!--SAVING-->
          {#if content.savings}
            {@const match = content.savings.match(/^(.*?)(\d+)(%?)(.*)$/)}
            {@const [, prefix, number, percent, suffix] = match ?? [
              "",
              "",
              "",
              "",
              "",
            ]}
            <div
              class="bg-adonis-blue-lighter relative w-[94px] h-[30px] px-1 flex items-center justify-center text-white rounded-tl-md rounded-br-md py-0.5 border border-white"
            >
              {#if prefix}
                <span
                  class="font-gotham-condensed text-sm max-w-[35px] max-h-[18px] overflow-hidden"
                  use:autoSize>{prefix}</span
                >
              {/if}
              <span
                class="font-kapra text-[34px] font-semibold text-adonis-yellow-dark leading-none tracking-tighter -top-[10px] relative align-top"
              >
                <span
                  class="[text-shadow:-1px_-1px_0_#1D3983,1px_1px_0_#1D3983,-1px_1px_0_#1D3983,1px_-1px_0_#1D3983]"
                  use:autoSize>{number}</span
                >
                <sup
                  class="-top-[6px] leading-none -left-0.5 [text-shadow:-1px_-1px_0_#1D3983,1px_1px_0_#1D3983,-1px_1px_0_#1D3983,1px_-1px_0_#1D3983]"
                  >{percent}</sup
                >
              </span>
              <span
                class="font-gotham-condensed text-sm mb-px max-w-[38px] max-h-[18px] overflow-hidden"
                use:autoSize>{suffix}</span
              >
            </div>
          {/if}
          <!--/SAVING-->

          <!--PRICE-->
          {#if content.price}
            {@const [dollars, cents] = content.price
              .split(" /")[0]
              .replace("$", "")
              .split(/[.,]/)}
            <div
              class="font-kapra relative flex justify-center px-1 py-0 -mt-[17px]"
            >
              <span
                class="text-white max-h-[90px] overflow-hidden text-[90px] leading-[85px] font-bold [text-shadow:-2px_-2px_0_#572D2E,2px_2px_0_#572D2E,-2px_2px_0_#572D2E,2px_-2px_0_#572D2E] mt-1"
                use:autoSize
              >
                {dollars}
              </span>
              <span class="-mt-px ml-0.5 flex flex-col">
                {#if cents}
                  <span
                    class="text-white max-h-[60px] max-w-[50px] overflow-hidden text-[60px] leading-normal font-bold [text-shadow:-2px_-2px_0_#572D2E,2px_2px_0_#572D2E,-2px_2px_0_#572D2E,2px_-2px_0_#572D2E]"
                    use:autoSize
                  >
                    {cents}
                  </span>
                {/if}
                {#if content.price.includes("/")}
                  <span class="ml-0.5 text-xl leading-none text-white">
                    /{content.price.split("/")[1]}
                  </span>
                {/if}
              </span>
              <span class="text-lg text-white font-semibold mt-2 ml-0.5 z-10"
                >+TX</span
              >
            </div>
          {/if}
          <!--/PRICE-->
        </div>
        <!--/LEFT (col)-->

        <!--RIGHT (col)-->
        <div class="font-gotham-condensed text-left text-white">
          <!-- svelte-ignore a11y_missing_content -->
          <h2
            class="max-h-[116px] max-w-[158px] overflow-hidden text-[26px] leading-[23px] font-bold z-10"
            use:editable={{
              controller: editController,
              content,
              itemIndex: 0,
              key: "name",
              setValue(node, value) {
                node.innerText = value;
                autoSize(node);
              },
            }}
          ></h2>
          <!--svelte-ignore a11y_missing_content-->
          <h3
            class="mt-1 max-h-[32px] max-w-[158px] overflow-hidden text-[18px] leading-[16px]"
            use:editable={{
              controller: editController,
              content,
              itemIndex: 0,
              key: "description",
              setValue(node, value) {
                node.innerText = value;
                autoSize(node);
              },
            }}
          ></h3>
          <!--svelte-ignore a11y_missing_content-->
          <h4
            class="mt-1 max-h-[16px] max-w-[158px] overflow-hidden text-[18px] leading-[16px]"
            use:editable={{
              controller: editController,
              content,
              itemIndex: 0,
              key: "alternatePrice",
              setValue(node, value) {
                node.innerText = value;
                autoSize(node);
              },
            }}
          ></h4>
        </div>
        <!--/Right (col)-->
      </div>
      <!--PRICE + SAVINGS + TEXT-->
    </div>
    <!--/MAIN-->

    <!--CTA-->
    <div
      class="text-center mt-5"
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
      }}
    >
      <a
        href={content.link}
        target="_blank"
        class="bg-adonis-sky-medium font-gotham hover:hover:bg-adonis-sky-medium/90 inline-block rounded px-5 py-px text-center text-lg font-bold text-[white] transition-colors duration-300 ease-in-out"
      >
        {#if lang === "en"}
          SEE OUR FLYER
        {:else}
          VOIR NOTRE FLYER
        {/if}
      </a>
      <h3
        class="font-gotham-condensed max-h-[24px] max-w-[278px] overflow-hidden text-[20px] text-white"
      >
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
    class="relative bg-[#CC112C] flex h-full overflow-hidden bg-[url('{assetsRoot}/images/ad/adonis/bg-adonis-canada-300x250.svg')] bg-cover py-2"
  >
    <div class="flex h-full">
      <!--COL (left)-->
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
        }}
      >
        <!--LOGO-->
        <div>
          <img
            width="144"
            height="56"
            alt="Adonis - A world of freshness"
            src="{assetsRoot}/images/ad/adonis/logo-adonis-white.svg"
          />
        </div>
        <!--/LOGO-->

        <!--PRODUCT-->
        <div class="relative">
          <!--IMG-->
          <div class="relative">
            <img
              class="mx-auto h-[136px] object-contain"
              alt={content.name}
              src={content.imageUrl}
            />
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
                }}
              />
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
                }}
              />
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
              }}
            />
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
              }}
            />
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
              }}
            />
          </div>
          <!--/IMG-->
        </div>
        <!--/PRODUCT-->
      </div>
      <!--/COL (left)-->

      <!--COL (right)-->
      <div
        class="flex w-[140px] shrink-0 flex-col pr-2.5 pl-2 mt-3.5"
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
        }}
      >
        <!--SAVING-->
        <div class="ml-auto mt-0.5">
          {#if content.savings}
            {@const match = content.savings.match(/^(.*?)(\d+)(%?)(.*)$/)}
            {@const [, prefix, number, percent, suffix] = match ?? [
              "",
              "",
              "",
              "",
              "",
            ]}
            <div
              class="bg-adonis-blue-lighter relative w-[76px] h-[22px] px-1 flex items-center justify-center text-white rounded-tl-md rounded-br-md py-0.5 border border-white"
            >
              {#if prefix}
                <span
                  class="font-gotham-condensed text-[10px] max-w-[30px] max-h-[15px] overflow-hidden"
                  use:autoSize>{prefix}</span
                >
              {/if}
              <span
                class="font-kapra text-[26px] font-semibold text-adonis-yellow-dark leading-none tracking-tighter -top-[8px] relative align-top"
              >
                <span
                  class="[text-shadow:-1px_-1px_0_#1D3983,1px_1px_0_#1D3983,-1px_1px_0_#1D3983,1px_-1px_0_#1D3983]"
                  >{number}</span
                >
                <sup
                  class="-top-[6px] leading-none -left-0.5 [text-shadow:-1px_-1px_0_#1D3983,1px_1px_0_#1D3983,-1px_1px_0_#1D3983,1px_-1px_0_#1D3983] max-h-[23px] max-w-[9px] overflow-hidden"
                  >{percent}</sup
                >
              </span>
              <span
                class="font-gotham-condensed mb-px text-[10px] max-w-[30px] max-h-[15px] overflow-hidden"
                use:autoSize>{suffix}</span
              >
            </div>
          {/if}

          <!--PRICE-->
          {#if content.price}
            {@const [dollars, cents] = content.price
              .split(" /")[0]
              .replace("$", "")
              .split(/[.,]/)}
            <div
              class="font-kapra relative flex justify-center px-1 py-0 -mt-[15px]"
            >
              <span
                class="text-white max-h-[70px] overflow-hidden text-[70px] leading-[65px] font-bold [text-shadow:-1px_-1px_0_#572D2E,1px_1px_0_#572D2E,-1px_1px_0_#572D2E,1px_-1px_0_#572D2E] mt-1.5"
                use:autoSize
              >
                {dollars}
              </span>
              <span class="-mt-px ml-0.5 flex flex-col">
                {#if cents}
                  <span
                    class="text-white mt-[2px] max-h-[48px] max-w-[35px] overflow-hidden text-[48px] leading-normal font-bold [text-shadow:-1px_-1px_0_#572D2E,1px_1px_0_#572D2E,-1px_1px_0_#572D2E,1px_-1px_0_#572D2E]"
                    use:autoSize
                  >
                    {cents}
                  </span>
                {/if}
                {#if content.price.includes("/")}
                  <span class="ml-0.5 text-[15px] leading-none text-white">
                    /{content.price.split("/")[1]}
                  </span>
                {/if}
              </span>
              <span class="text-[14px] text-white font-semibold mt-2 ml-1 z-10"
                >+TX</span
              >
            </div>
          {/if}
          <!--/PRICE-->
        </div>
        <!--/SAVING-->

        <!--NAME-->
        <div
          class="font-gotham-condensed mt-1 mb-2 text-right leading-none text-white"
        >
          <h2
            class="max-h-[72px] max-w-[122px] overflow-hidden text-[18px] font-bold"
            use:editable={{
              controller: editController,
              content,
              itemIndex: 0,
              key: "name",
              setValue(node, value) {
                node.innerText = value;
                autoSize(node);
              },
            }}
          >
            {item.content.name}
          </h2>
          <h3
            class="mt-px max-h-[22px] max-w-[122px] overflow-hidden text-[12px] leading-[11px] z-10"
            use:editable={{
              controller: editController,
              content,
              itemIndex: 0,
              key: "description",
              setValue(node, value) {
                node.innerText = value;
                autoSize(node);
              },
            }}
          >
            {item.content.description}
          </h3>
          <h4
            class="mt-0.5 max-h-[12px] max-w-[118px] overflow-hidden text-xs leading-none"
            use:editable={{
              controller: editController,
              content,
              itemIndex: 0,
              key: "alternatePrice",
              setValue(node, value) {
                node.innerText = value;
                autoSize(node);
              },
            }}
          >
            {item.content.alternatePrice}
          </h4>
        </div>
        <!--/NAME-->
      </div>
      <!--/COL(right)-->
    </div>
    <!--CTA-->
    <div
      class="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-center"
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
      }}
    >
      <a
        href={content.link}
        target="_blank"
        class="bg-adonis-sky-medium font-gotham hover:bg-adonis-sky-medium/90 block rounded px-3 py-[5px] text-center text-[12px] leading-none font-bold text-white transition-colors duration-300 ease-in-out"
      >
        {#if lang === "en"}
          SEE OUR FLYER
        {:else}
          VOIR NOTRE FLYER
        {/if}
      </a>
      <h3
        class="font-gotham-condensed max-h-[25px] max-w-[280px] overflow-hidden text-[15px] text-white"
      >
        <Validity {content} {lang} />
      </h3>
    </div>
    <!--/CTA-->
  </div>
  <!--/SQUARE-->
{:else}
  <!--WIDE-->
  {@const LOGO_SIZE = [50, 40] as [number, number]}
  <div
    class="bg-[#CC112C] flex h-full gap-x-2 overflow-hidden bg-[url('{assetsRoot}/images/ad/adonis/bg-adonis-canada-728x90.svg')] bg-cover px-2"
  >
    <!--BRAND-->
    <div
      class="flex flex-col justify-center"
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
      }}
    >
      <!--LOGO-->
      <img
        width="160"
        height="64"
        alt="Adonis - A world of freshness"
        src="{assetsRoot}/images/ad/adonis/logo-adonis-white.svg"
      />
      <!--/LOGO-->
    </div>
    <!--/BRAND-->

    <!--IMG-->
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
      }}
    >
      <img
        class="w-36 h-[90px] object-contain"
        alt={content.name}
        src={content.imageUrl}
      />
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
        }}
      />
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
        }}
      />
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
        }}
      />
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
        }}
      />
    </div>
    <!--/IMG-->

    <!--SAVING-->
    <div
      class="mt-4 flex flex-col justify-centers"
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
      }}
    >
      <div>
        {#if content.savings}
          {@const match = content.savings.match(/^(.*?)(\d+)(%?)(.*)$/)}
          {@const [, prefix, number, percent, suffix] = match ?? [
            "",
            "",
            "",
            "",
            "",
          ]}
          <div
            class="bg-adonis-blue-lighter relative w-[76px] h-[22px] px-1 flex items-center justify-center text-white rounded-tl-md rounded-br-md py-0.5 border border-white"
          >
            {#if prefix}
              <span
                class="font-gotham-condensed text-[10px] max-w-[30px] max-h-[15px] overflow-hidden"
                use:autoSize>{prefix}</span
              >
            {/if}
            <span
              class="font-kapra font-semibold text-[26px] text-adonis-yellow-dark leading-none tracking-tighter -top-[8px] relative align-top"
            >
              <span
                class="[text-shadow:-1px_-1px_0_#1D3983,1px_1px_0_#1D3983,-1px_1px_0_#1D3983,1px_-1px_0_#1D3983]"
                >{number}</span
              >
              <sup
                class="-top-[6px] leading-none -left-0.5 [text-shadow:-1px_-1px_0_#1D3983,1px_1px_0_#1D3983,-1px_1px_0_#1D3983,1px_-1px_0_#1D3983] max-h-[23px] max-w-[9px] overflow-hidden"
                >{percent}</sup
              >
            </span>
            <span
              class="font-gotham-condensed mb-px text-[10px] max-w-[30px] max-h-[15px] overflow-hidden"
              use:autoSize>{suffix}</span
            >
          </div>
        {/if}

        <!--PRICE-->
        {#if content.price}
          {@const [dollars, cents] = content.price
            .split(" /")[0]
            .replace("$", "")
            .split(/[.,]/)}
          <div
            class="font-kapra relative flex justify-center px-1 py-0 -mt-[14px]"
          >
            <span
              class="text-white max-h-[70px] overflow-hidden text-[70px] leading-[60px] font-bold [text-shadow:-1px_-1px_0_#572D2E,1px_1px_0_#572D2E,-1px_1px_0_#572D2E,1px_-1px_0_#572D2E] mt-[6px]"
              use:autoSize
            >
              {dollars}
            </span>
            <span class="-mt-px ml-0.5 flex flex-col">
              {#if cents}
                <span
                  class="text-white mt-[2px] max-h-[46px] max-w-[35px] overflow-hidden text-[48px] leading-normal font-bold [text-shadow:-1px_-1px_0_#572D2E,1px_1px_0_#572D2E,-1px_1px_0_#572D2E,1px_-1px_0_#572D2E]"
                  use:autoSize
                >
                  {cents}
                </span>
              {/if}
              {#if content.price.includes("/")}
                <span class="ml-0.5 text-[15px] leading-none text-white">
                  /{content.price.split("/")[1]}
                </span>
              {/if}
            </span>
            <span class="text-[14px] text-white font-semibold mt-2 ml-0.5 z-10"
              >+TX</span
            >
          </div>
        {/if}
        <!--/PRICE-->
      </div>
    </div>
    <!--/SAVING-->

    <!--NAME-->
    <div
      class="font-gotham-condensed gap-px flex w-[144px] py-1 flex-col justify-center text-white"
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
      }}
    >
      <!-- svelte-ignore a11y_missing_content -->
      <h2
        class="max-h-[40px] max-w-[144px] overflow-hidden text-[21px] leading-none font-bold"
        use:editable={{
          controller: editController,
          content,
          itemIndex: 0,
          key: "name",
          setValue(node, value) {
            node.innerText = value;
            autoSize(node);
          },
        }}
      ></h2>
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
        }}
      ></h3>
      <!-- svelte-ignore a11y_missing_content -->
      <h4
        class="max-h-[14px] max-w-[145px] overflow-hidden text-[14px] leading-none"
        use:editable={{
          controller: editController,
          content,
          itemIndex: 0,
          key: "alternatePrice",
          setValue(node, value) {
            node.innerText = value;
            autoSize(node);
          },
        }}
      ></h4>
    </div>
    <!--/NAME-->

    <!--CTA-->
    <div
      class="flex flex-col justify-end ml-auto mb-1"
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
      }}
    >
      <a
        href={content.link}
        target="_blank"
        class="bg-adonis-sky-medium font-gotham hover:bg-adonis-sky-medium/90 block rounded px-3 py-1 text-center text-[12px] leading-none font-bold text-white transition-colors duration-300 ease-in-out"
      >
        {#if lang === "en"}
          SEE OUR FLYER
        {:else}
          VOIR NOTRE FLYER
        {/if}
      </a>
      <h3
        class="font-gotham-condensed max-h-[25px] max-w-[144px] overflow-hidden text-[15px] text-center text-white mt-px"
      >
        <Validity {content} {lang} />
      </h3>
    </div>
    <!--/CTA-->
  </div>
  <!--/WIDE-->
{/if}
