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
      --color-adonis-blue-extralight: #00416b;
      --color-adonis-sky-medium: #1f7ba0;
      --color-adonis-red-medium: #d5002c;
      --color-adonis-yellow-dark: #f8db0f;
    }
  </style>
</svelte:head>

{#if aspectRatio > 6 && aspectRatio < 7}
  <!--THIN-->
  <div
    class="bg-[#EDD2A9] flex h-full justify-between overflow-hidden bg-[url('{assetsRoot}/images/ad/adonis/bg-adonis-stone-320x50.svg')] bg-cover px-2 py-1.5"
  >
    <!--LOGO-->
    <img
      width="130"
      height="48"
      class="shrink-0 self-center"
      alt="Adonis - A world of freshness"
      src="{assetsRoot}/images/ad/adonis/logo-adonis-red.svg"
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
      class="bg-adonis-sky-medium font-gotham hover:bg-adonis-sky-medium/90 flex-none self-center rounded px-3 py-1 text-center text-sm text-center font-bold text-white transition-colors duration-300 ease-in-out"
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
  <!--Tall-->
  {@const LOGO_SIZE = [93, 75] as [number, number]}
  <div
    class="bg-[#EDD2A9] flex h-full flex-col bg-[url('{assetsRoot}/images/ad/adonis/bg-adonis-stone-300x600.svg')] bg-cover py-2.5 pr-2.5 pl-3"
  >
    <!--Header-->
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
      <!--Logo-->
      <img
        width="240"
        height="88"
        alt="Adonis - A world of freshness"
        src="{assetsRoot}/images/ad/adonis/logo-adonis-red.svg"
      />
      <!--/Logo-->
    </div>
    <!--/Header-->

    <!--Main-->
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
      <!--Img-->
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
      <!--/Img-->

      <!--Pricing & Name Section-->
      <div class="flex gap-2 items-center -mt-4 z-10">
        <!--Left (col)-->
        <div class="-bottom-1 inline-block relative self-end">
          <!--Savings-->
          <div>
            <div
              class="bg-adonis-blue-lighter w-[92px] border border-white text-white rounded-tl-lg rounded-br-lg text-right px-1.5 py-0.5"
            >
              <span class="text-sm font-medium uppercase font-gotham-condensed"
                >SAVINGS</span
              >
            </div>
            <!--Yellow 33%-->
            <div class="absolute -top-4 left-1.5">
              <span
                class="text-[40px] text-adonis-yellow-dark leading-[90%] -rotate-3 font-bold font-kapra
              [text-shadow:-1px_-1px_0_#1D3983,1px_1px_0_#1D3983,-1px_1px_0_#1D3983,1px_-1px_0_#1D3983]"
              >
                33<span
                  class="align-top text-[20px] ml-0.5 [text-shadow:-1px_-1px_0_#1D3983,1px_1px_0_#1D3983,-1px_1px_0_#1D3983,1px_-1px_0_#1D3983]"
                  >%</span
                >
              </span>
            </div>
          </div>
          <!--/Savings-->

          <!--Price Section-->
          <div
            class="font-kapra text-adonis-red-medium relative top-7 left-1 flex -translate-y-1/2 justify-center px-1 py-0"
          >
            <span
              class="text-[80px] leading-none font-bold [text-shadow:-2px_-2px_0_white,2px_2px_0_white,-2px_2px_0_white,2px_-2px_0_white]"
            >
              7
            </span>
            <span class="-mt-px ml-0.5 flex flex-col">
              <span
                class="mt-[6px] text-[48px] leading-none font-bold [text-shadow:-2px_-2px_0_white,2px_2px_0_white,-2px_2px_0_white,2px_-2px_0_white]"
              >
                99
              </span>
              <span class="mt-0.5 ml-1 text-[16px] leading-none"> /lib </span>
            </span>
            <span class="text-lg font-semibold mt-1.5 ml-0.5">+TX</span>
          </div>
          <!--/Price Section-->
        </div>
        <!--/Left (col)-->

        <!--Right (col)-->
        <div
          class="font-gotham-condensed text-left text-adonis-blue-extralight"
        >
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
      <!--Pricing & Name Section-->
    </div>
    <!--/Main-->

    <!--Cta-->
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
        class="font-gotham-condensed max-h-[24px] max-w-[278px] overflow-hidden text-[20px] text-adonis-blue-extralight"
      >
        <Validity {content} {lang} />
      </h3>
    </div>
    <!--/Cta-->
  </div>
  <!--/Tall-->
{:else if aspectRatio < 1.5}
  <!--Square-->
  {@const LOGO_SIZE = [48, 45] as [number, number]}
  <div
    class="relative bg-[#EDD2A9] flex h-full overflow-hidden bg-[url('{assetsRoot}/images/ad/adonis/bg-adonis-stone-300x250.svg')] bg-cover py-2"
  >
    <!--Col (left)-->
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
      <!--Logo-->
      <div>
        <img
          width="144"
          height="56"
          alt="Adonis - A world of freshness"
          src="{assetsRoot}/images/ad/adonis/logo-adonis-red.svg"
        />
      </div>
      <!--/Logo-->

      <!--Product-->
      <div class="relative">
        <!--IMG-->
        <div class="relative">
          <img
            class="mx-auto h-[135px] object-contain"
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
        <!--/Img-->
      </div>
      <!--/Product-->
    </div>
    <!--/Col (left)-->

    <!--Col (right)-->
    <div
      class="flex w-[140px] shrink-0 flex-col pr-2.5 pl-2 mt-4"
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
      <!--Saving-->
      <div class="ml-auto mt-0.5">
        <div class="relative">
          <!--Savings Box-->
          <div
            class="w-[70px] h-[22px] flex items-center justify-end border border-white bg-adonis-blue-lighter text-white rounded-tl-md rounded-br-md text-right px-1"
          >
            <span
              class="text-[11px] font-medium uppercase font-gotham-condensed leading-none mt-px"
              >SAVINGS</span
            >
          </div>
          <!--Yellow 33%-->
          <div class="absolute -top-2.5 left-1">
            <span
              class="text-[26px] leading-[90%] -rotate-3 font-bold text-adonis-yellow-dark font-kapra
            [text-shadow:-1px_-1px_0_#1D3983,1px_1px_0_#1D3983,-1px_1px_0_#1D3983,1px_-1px_0_#1D3983]"
            >
              27<span
                class="align-top text-[18px] ml-0.5 [text-shadow:-1px_-1px_0_#1D3983,1px_1px_0_#1D3983,-1px_1px_0_#1D3983,1px_-1px_0_#1D3983]"
                >%</span
              >
            </span>
          </div>
        </div>

        <!--Price Section-->
        <div
          class="font-kapra text-adonis-red-medium relative -top-3 flex -translate-y-1/2-- justify-start px-1 py-0"
        >
          <span
            class="text-[70px] leading-none font-medium [text-shadow:-1px_-1px_0_white,1px_1px_0_white,-1px_1px_0_white,1px_-1px_0_white]"
          >
            7
          </span>
          <span class="-mt-px ml-0.5 flex flex-col">
            <span
              class="mt-[6px] text-[40px] leading-none font-medium [text-shadow:-1px_-1px_0_white,1px_1px_0_white,-1px_1px_0_white,1px_-1px_0_white]"
            >
              99
            </span>
            <span class="mt-0.5 ml-1 text-sm leading-none"> /lib </span>
          </span>
          <span class="text-sm font-semibold mt-1.5 ml-0.5">+TX</span>
        </div>
      </div>
      <!--/Saving-->

      <!--Name-->
      <div
        class="font-gotham-condensed -mt-[7px] text-right leading-none text-adonis-blue-extralight"
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
      <!--/Name-->
    </div>
    <!--/Col(right)-->

    <!--Cta-->
    <div
      class="absolute bottom-0.5 left-1/2 transform -translate-x-1/2 text-center"
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
        class="font-gotham-condensed max-h-[25px] max-w-[280px] overflow-hidden text-[15px] text-adonis-blue-extralight"
      >
        <Validity {content} {lang} />
      </h3>
    </div>
    <!--/Cta-->
  </div>
  <!--/Square-->
{:else}
  <!--Wide-->
  {@const LOGO_SIZE = [45, 40] as [number, number]}
  <div
    class="bg-[#EDD2A9] flex h-full gap-x-2 overflow-hidden bg-[url('{assetsRoot}/images/ad/adonis/bg-adonis-stone-728x90.svg')] bg-cover px-2"
  >
    <!--Brand-->
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
      <!--Logo-->
      <img
        width="160"
        height="64"
        alt="Adonis - A world of freshness"
        src="{assetsRoot}/images/ad/adonis/logo-adonis-red.svg"
      />
      <!--/Logo-->
    </div>
    <!--/Brand-->

    <!--Img-->
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
    <!--/Img-->

    <!--Saving-->
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
      <div class="relative">
        <!--Savings Box-->
        <div
          class="w-[70px] h-[22px] flex items-center justify-end border border-white bg-adonis-blue-lighter text-white rounded-tl-md rounded-br-md text-right px-1"
        >
          <span
            class="text-[10px] font-medium- uppercase font-gotham-condensed leading-none mt-px z-10"
            >SAVINGS</span
          >
        </div>
        <!--Yellow 33%-->
        <div class="absolute -top-2.5 left-1">
          <span
            class="text-[26px] leading-[90%] -rotate-3 font-bold text-adonis-yellow-dark font-kapra
          [text-shadow:-1px_-1px_0_#1D3983,1px_1px_0_#1D3983,-1px_1px_0_#1D3983,1px_-1px_0_#1D3983]"
          >
            27<span
              class="align-top text-[18px] ml-0.5 [text-shadow:-1px_-1px_0_#1D3983,1px_1px_0_#1D3983,-1px_1px_0_#1D3983,1px_-1px_0_#1D3983]"
              >%</span
            >
          </span>
        </div>
      </div>

      <!--Price Section-->
      <div
        class="font-kapra text-adonis-red-medium relative -top-3 flex justify-start px-1 py-0"
      >
        <span
          class="text-[64px] leading-none font-medium [text-shadow:-1px_-1px_0_white,1px_1px_0_white,-1px_1px_0_white,1px_-1px_0_white]"
        >
          7
        </span>
        <span class="-mt-px ml-0.5 flex flex-col">
          <span
            class="mt-[6px] text-[38px] leading-none font-medium [text-shadow:-1px_-1px_0_white,1px_1px_0_white,-1px_1px_0_white,1px_-1px_0_white]"
          >
            99
          </span>
          <span class="mt-0.5 ml-1 text-sm leading-none text-adonis-red-medium">
            /lib
          </span>
        </span>
        <span class="text-sm font-semibold mt-1.5 ml-0.5">+TX</span>
      </div>
      <!--/Price Section-->
    </div>
    <!--/Saving-->

    <!--NAME-->
    <div
      class="font-gotham-condensed gap-px flex w-[144px] py-1 flex-col justify-center text-adonis-blue-extralight"
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

    <!--Cta-->
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
        class="font-gotham-condensed max-h-[25px] max-w-[144px] mt-px overflow-hidden text-[15px] text-center text-adonis-blue-extralight"
      >
        <Validity {content} {lang} />
      </h3>
    </div>
    <!--/Cta-->
  </div>
  <!--/WIDE-->
{/if}
