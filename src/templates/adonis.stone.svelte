<script lang="ts" module>
  export const ITEMS_PER_FRAME = 1 as const;
</script>

<script lang="ts">
  import { animation } from "../animation";
  import Column from "../components/column.svelte";
  import Row from "../components/row.svelte";
  import Image from "../editable/image.svelte";
  import Link from "../editable/link.svelte";
  import Text from "../editable/text.svelte";
  import type { RenderArgs } from "../template";
  import { getValidity } from "../utils/validity";

  const { args }: { args: RenderArgs<typeof ITEMS_PER_FRAME> } = $props();
  const { animationController, lang } = args;
  const frame = $derived(args.frame);
  const aspectRatio = $derived(args.size[0] / args.size[1]);

  const assetsRoot =
    "https://iheyhknkyvnxvedrtxqk.supabase.co/storage/v1/object/public/assets";

  // Shared parsing logic for savings and price
  const savings = $derived.by(() => {
    if (!frame["item.0.savings"]) return null;
    const match = frame["item.0.savings"].match(/^(.*?)(\d+)(%?)(.*)$/);
    const [, prefix, number, percent, suffix] = match ?? ["", "", "", "", ""];
    const prefixRatio = prefix.length / (prefix.length + suffix.length);
    const suffixRatio = 1 - prefixRatio;
    return { prefix, number, percent, suffix, prefixRatio, suffixRatio };
  });

  const price = $derived.by(() => {
    if (!frame["item.0.price"]) return null;
    const [dollars, cents] = frame["item.0.price"]
      .split(" /")[0]
      .replace("$", "")
      .split(/[.,]/);
    const unit = frame["item.0.price"].includes("/")
      ? `/${frame["item.0.price"].split("/")[1]}`
      : null;
    return { dollars, cents, unit };
  });

  const validity = $derived(
    getValidity(frame["item.0.validFrom"], frame["item.0.validTo"], lang)
  );
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
  <!-- THIN LAYOUT (320x50) -->
  <div
    class="bg-[#EDD2A9] bg-[url('{assetsRoot}/images/ad/adonis/bg-adonis-stone-320x50.svg')] bg-cover h-full w-full overflow-hidden flex"
    use:animation={{
      controller: animationController,
      options: {
        name: "fadeIn",
        normal: { duration: 250 },
        reverse: { delay: 5000, duration: 50 },
      },
    }}
  >
    <Row height="100%" class="px-[8px] py-[6px]">
      <!-- LOGO -->
      <Column width="50%" class="flex-none">
        <Image
          {frame}
          alt={{ default: "Adonis - A world of freshness" }}
          src={{
            default: `${assetsRoot}/images/ad/adonis/logo-adonis-red.svg`,
          }}
          class="object-contain self-center"
          height={{ default: "100%" }}
          left={{ default: "0" }}
          name="adonisLogo"
          top={{ default: "0" }}
          width={{ default: "100%" }}
        />
      </Column>

      <!-- CTA BUTTON -->
      <Column width="50%" class="flex-none ml-auto">
        <Link
          href={{ bind: "item.0.link" }}
          {frame}
          name="ctaLink"
          text={{
            default: lang === "en" ? "SEE OUR FLYER" : "VOIR NOTRE FLYER",
          }}
          class="bg-adonis-sky-medium font-gotham hover:bg-adonis-sky-medium/90 rounded px-[12px] py-[4px] text-center text-sm font-bold text-white transition-colors duration-300 ease-in-out self-center"
          height={{ default: "100%" }}
          width={{ default: "100%" }}
          top={{ default: "0" }}
          left={{ default: "0" }}
          align={{ default: "center" }}
          justify={{ default: "center" }}
        />
      </Column>
    </Row>
  </div>
{:else if aspectRatio < 0.8}
  <!-- TALL LAYOUT (300x600) -->
  <div
    class="bg-[#EDD2A9] bg-[url('{assetsRoot}/images/ad/adonis/bg-adonis-stone-300x600.svg')] bg-cover h-full w-full overflow-hidden"
    use:animation={{
      controller: animationController,
      options: {
        name: "fadeIn",
        normal: { duration: 250 },
        reverse: { delay: 5000, duration: 50 },
      },
    }}
  >
    <Column width="100%" class="p-[10px]">
      <!-- HEADER WITH LOGO -->
      <Row height="96px">
        <Image
          {frame}
          alt={{ default: "Adonis - A world of freshness" }}
          src={{
            default: `${assetsRoot}/images/ad/adonis/logo-adonis-red.svg`,
          }}
          class="object-contain"
          height={{ default: "100%" }}
          left={{ default: "0" }}
          name="adonisLogo"
          top={{ default: "0" }}
          width={{ default: "100%" }}
        />
      </Row>
      <!-- PRODUCT IMAGE WITH LOGOS -->
      <Row height="256px">
        <Image
          {frame}
          alt={{ default: "Product Image" }}
          src={{ bind: "item.0.imageUrl" }}
          class="object-contain"
          height={{ default: "100%" }}
          left={{ default: "0" }}
          name="productImage"
          top={{ default: "0" }}
          width={{ default: "100%" }}
        />

        <!-- Corner logos -->
        <Image
          alt={{ default: "Logo 1" }}
          src={{ bind: "item.0.logo1" }}
          class="object-contain object-[left_top]"
          {frame}
          height={{ default: "33%" }}
          left={{ default: "0" }}
          name="logo1"
          top={{ default: "0" }}
          width={{ default: "33%" }}
        />
        <Image
          alt={{ default: "Logo 2" }}
          src={{ bind: "item.0.logo2" }}
          class="object-contain object-[right_top]"
          {frame}
          height={{ default: "33%" }}
          name="logo2"
          right={{ default: "0" }}
          top={{ default: "0" }}
          width={{ default: "33%" }}
        />
        <Image
          alt={{ default: "Logo 3" }}
          src={{ bind: "item.0.logo3" }}
          class="object-contain object-[left_bottom]"
          {frame}
          height={{ default: "33%" }}
          left={{ default: "0" }}
          name="logo3"
          bottom={{ default: "0" }}
          width={{ default: "33%" }}
        />
        <Image
          alt={{ default: "Logo 4" }}
          src={{ bind: "item.0.logo4" }}
          class="object-contain object-[right_bottom]"
          {frame}
          height={{ default: "33%" }}
          name="logo4"
          right={{ default: "0" }}
          bottom={{ default: "0" }}
          width={{ default: "33%" }}
        />
      </Row>

      <!-- PRICE AND SAVINGS AND TEXT SECTION -->
      <Row height="164px">
        <Column width="140px" class="pt-[40px]">
          <!-- SAVINGS -->
          {#if savings}
            <!-- SAVINGS -->
            <Row height="48px" class="pr-[40px]">
              <!-- BACKGROUND -->
              <Text
                text={{ default: "" }}
                {frame}
                name="savingsBackground"
                class="bg-adonis-blue-lighter rounded-tl-md rounded-br-md border border-white"
                height={{ default: "28px" }}
                width={{ default: "100%" }}
                bottom={{ default: "0" }}
                left={{ default: "0" }}
              />

              <Row height="100%" class="p-[4px]">
                {#if savings.prefix}
                  <Column
                    width="{savings.prefixRatio * 48}px"
                    class="flex-1 pr-[4px] pb-[6px] pt-[24px]"
                  >
                    <Text
                      text={{ default: savings.prefix }}
                      {frame}
                      name="savingsPrefix"
                      class="font-semibold font-gotham-condensed text-white justify-end whitespace-nowrap"
                      height={{ default: "100%" }}
                      width={{ default: "100%" }}
                      bottom={{ default: "0" }}
                      left={{ default: "0" }}
                    />
                  </Column>
                {/if}

                <Column width="{savings.number.length === 1 ? 18 : 36}px">
                  <Text
                    text={{ default: savings.number }}
                    {frame}
                    name="savingsNumber"
                    class="font-kapra font-bold text-adonis-yellow-dark tracking-tighter justify-center"
                    height={{ default: "100%" }}
                    width={{ default: "100%" }}
                    bottom={{ default: "0" }}
                    left={{ default: "0" }}
                    style={{ "-webkit-text-stroke": "0.75px #1D3983" }}
                  />

                  <Text
                    text={{ default: savings.percent }}
                    {frame}
                    name="savingsPercent"
                    class="font-kapra font-bold text-adonis-yellow-dark tracking-tighter justify-start"
                    height={{ default: "18px" }}
                    width={{ default: "14px" }}
                    top={{ default: "-2px" }}
                    right={{ default: "-14px" }}
                    style={{ "-webkit-text-stroke": "0.75px #1D3983" }}
                  />
                </Column>

                {#if savings.suffix}
                  <Column
                    width="{savings.suffixRatio * 48}px"
                    class="flex-1 pl-[4px] pb-[6px] pt-[24px]"
                  >
                    <Text
                      text={{ default: savings.suffix }}
                      {frame}
                      name="savingsSuffix"
                      class="font-semibold font-gotham-condensed text-white whitespace-nowrap"
                      height={{ default: "100%" }}
                      width={{ default: "100%" }}
                      bottom={{ default: "0" }}
                      left={{ default: "0" }}
                    />
                  </Column>
                {/if}
              </Row>
            </Row>
          {/if}

          <!-- PRICE -->
          {#if price}
            <Row height="116px" class="mt-[-14px]">
              <Column width={price.dollars.length === 1 ? "32px" : "64px"}>
                <Text
                  text={{ default: price.dollars }}
                  {frame}
                  name="priceDollars"
                  class="font-kapra text-adonis-red-medium font-bold"
                  height={{ default: "100%" }}
                  width={{ default: "100%" }}
                  bottom={{ default: "0" }}
                  left={{ default: "0" }}
                  style={{ "-webkit-text-stroke": "2px white" }}
                  justify={{ default: "center" }}
                />
              </Column>

              <Column width="36px">
                {#if price.cents}
                  <Text
                    text={{ default: price.cents }}
                    {frame}
                    name="priceCents"
                    class="font-kapra text-adonis-red-medium font-bold"
                    height={{ default: "100%" }}
                    width={{ default: "100%" }}
                    top={{ default: "4px" }}
                    left={{ default: "0" }}
                    style={{ "-webkit-text-stroke": "2px white" }}
                  />
                {/if}

                {#if price.unit}
                  <Text
                    text={{ default: price.unit }}
                    {frame}
                    name="priceUnit"
                    class="text-adonis-red-medium"
                    height={{ default: "20px" }}
                    width={{ default: "100%" }}
                    top={{ default: "56px" }}
                    left={{ default: "6px" }}
                  />
                {/if}
              </Column>

              <!-- TAX -->
              {#if frame["item.0.tax"] === "excluded"}
                <Column width="24px" class="p-[2px]">
                  <Text
                    text={{ default: "+TX" }}
                    {frame}
                    name="priceTax"
                    class="text-adonis-red-medium font-semibold"
                    height={{ default: "14px" }}
                    width={{ default: "100%" }}
                    top={{ default: "12px" }}
                    left={{ default: "0" }}
                  />
                </Column>
              {/if}
            </Row>
          {/if}
        </Column>

        <Column width="140px">
          <!-- PRODUCT NAME -->
          {#if frame["item.0.name"]}
            <Row height="100px">
              <Text
                text={{ bind: "item.0.name" }}
                {frame}
                name="name"
                class="font-bold font-gotham-condensed text-adonis-blue-extralight text-left items-center"
                height={{ default: "100%" }}
                width={{ default: "100%" }}
                top={{ default: "0" }}
                left={{ default: "0" }}
              />
            </Row>
          {/if}

          <!-- PRODUCT DESCRIPTION -->
          {#if frame["item.0.description"]}
            <Row height="32px">
              <Text
                text={{ bind: "item.0.description" }}
                {frame}
                name="productDescription"
                class="text-adonis-blue-extralight text-left font-gotham-condensed"
                height={{ default: "100%" }}
                width={{ default: "100%" }}
                top={{ default: "0" }}
                left={{ default: "0" }}
              />
            </Row>
          {/if}

          {#if frame["item.0.alternatePrice"]}
            <Row height="18px" class="mt-[4px]">
              <Text
                text={{ bind: "item.0.alternatePrice" }}
                {frame}
                name="alternatePrice"
                class="text-adonis-blue-extralight text-left font-gotham-condensed"
                height={{ default: "100%" }}
                width={{ default: "100%" }}
                top={{ default: "0" }}
                left={{ default: "0" }}
              />
            </Row>
          {/if}

          {#if frame["item.0.regularPrice"]}
            <Row height="18px" class="mt-[4px]">
              <Text
                text={{ bind: "item.0.regularPrice" }}
                {frame}
                name="regularPrice"
                class="text-adonis-blue-extralight text-left font-gotham-condensed"
                height={{ default: "100%" }}
                width={{ default: "100%" }}
                top={{ default: "0" }}
                left={{ default: "0" }}
              />
            </Row>
          {/if}
        </Column>
      </Row>

      <!-- CTA -->
      <Row height="40px" class="mt-[20px]">
        <Link
          href={{ bind: "item.0.link" }}
          {frame}
          name="ctaLink"
          text={{
            default: lang === "en" ? "SEE OUR FLYER" : "VOIR NOTRE FLYER",
          }}
          class="bg-adonis-sky-medium font-gotham hover:bg-adonis-sky-medium/90 rounded px-5 py-1 text-center font-bold text-white transition-colors duration-300 ease-in-out"
          height={{ default: "100%" }}
          width={{ default: "100%" }}
          top={{ default: "0" }}
          left={{ default: "0" }}
          align={{ default: "center" }}
          justify={{ default: "center" }}
        />
      </Row>

      <!-- VALIDITY -->
      <Row height="24px" class="mt-[8px]">
        <Text
          {frame}
          name="validity"
          text={{ default: validity }}
          class="font-gotham-condensed text-adonis-blue-extralight"
          align={{ default: "center" }}
          justify={{ default: "center" }}
          height={{ default: "100%" }}
          width={{ default: "100%" }}
          top={{ default: "0" }}
          left={{ default: "0" }}
        />
      </Row>
    </Column>
  </div>
{:else if aspectRatio < 1.5}
  <!-- SQUARE LAYOUT (300x250) -->
  <div
    class="bg-[#EDD2A9] bg-[url('{assetsRoot}/images/ad/adonis/bg-adonis-stone-300x250.svg')] bg-cover h-full w-full overflow-hidden"
  >
    <div
      class="relative h-full w-full flex flex-col"
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
      <!-- TOP SECTION -->
      <Row height="220px">
        <!-- LEFT COLUMN -->
        <Column width="198px">
          <!-- ADONIS LOGO -->
          <Row height="56px">
            <Image
              {frame}
              alt={{ default: "Adonis - A world of freshness" }}
              src={{
                default: `${assetsRoot}/images/ad/adonis/logo-adonis-red.svg`,
              }}
              class="object-contain object-left-top"
              height={{ default: "100%" }}
              left={{ default: "0" }}
              name="adonisLogo"
              top={{ default: "0" }}
              width={{ default: "100%" }}
            />
          </Row>

          <Row height="140px">
            <!-- MAIN PRODUCT IMAGE -->
            <Image
              {frame}
              alt={{ default: "Product Image" }}
              src={{ bind: "item.0.imageUrl" }}
              class="object-contain"
              height={{ default: "100%" }}
              left={{ default: "0" }}
              name="productImage"
              top={{ default: "0" }}
              width={{ default: "100%" }}
            />

            <!-- CORNER LOGOS -->
            <Image
              alt={{ default: "Logo 1" }}
              src={{ bind: "item.0.logo1" }}
              class="object-contain object-[left_top]"
              {frame}
              height={{ default: "33%" }}
              left={{ default: "0" }}
              name="logo1"
              top={{ default: "0" }}
              width={{ default: "33%" }}
            />
            <Image
              alt={{ default: "Logo 2" }}
              src={{ bind: "item.0.logo2" }}
              class="object-contain object-[right_top]"
              {frame}
              height={{ default: "33%" }}
              name="logo2"
              right={{ default: "0" }}
              top={{ default: "0" }}
              width={{ default: "33%" }}
            />
            <Image
              alt={{ default: "Logo 3" }}
              src={{ bind: "item.0.logo3" }}
              class="object-contain object-[right_bottom]"
              {frame}
              height={{ default: "33%" }}
              name="logo3"
              right={{ default: "0" }}
              bottom={{ default: "0" }}
              width={{ default: "33%" }}
            />
            <Image
              alt={{ default: "Logo 4" }}
              src={{ bind: "item.0.logo4" }}
              class="object-contain object-[left_bottom]"
              {frame}
              height={{ default: "33%" }}
              left={{ default: "0" }}
              name="logo4"
              bottom={{ default: "0" }}
              width={{ default: "33%" }}
            />
          </Row>

          <!-- CALL TO ACTION -->
          <Row height="24px" class="py-[2px]">
            <Link
              href={{ bind: "item.0.link" }}
              {frame}
              name="ctaLink"
              text={{
                default: lang === "en" ? "SEE OUR FLYER" : "VOIR NOTRE FLYER",
              }}
              class="bg-adonis-sky-medium font-gotham hover:bg-adonis-sky-medium/90 rounded px-[12px] py-[5px] text-center font-bold text-white transition-colors duration-300 ease-in-out whitespace-nowrap"
              height={{ default: "100%" }}
              width={{ default: "120px" }}
              top={{ default: "0" }}
              right={{ default: "0" }}
              align={{ default: "center" }}
              justify={{ default: "center" }}
            />
          </Row>
        </Column>

        <!-- RIGHT COLUMN -->
        <Column width="102px" class="pr-[8px]">
          {#if savings}
            <!-- SAVINGS -->
            <Row height="28px" class="mt-[4px]">
              <!-- BACKGROUND -->
              <Column width="69px">
                <Text
                  text={{ default: "" }}
                  {frame}
                  name="savingsBackground"
                  class="bg-adonis-blue-lighter rounded-tl-md rounded-br-md border border-white"
                  height={{ default: "21px" }}
                  width={{ default: "100%" }}
                  bottom={{ default: "-6px" }}
                  left={{ default: "0" }}
                />

                <Row height="100%" class="px-[4px] pb-[2px]">
                  {#if savings.prefix}
                    <Column
                      width="{savings.prefixRatio * 40}px"
                      class="flex-1 pt-[16px]"
                    >
                      <Text
                        text={{ default: savings.prefix }}
                        {frame}
                        name="savingsPrefix"
                        class="font-semibold font-gotham-condensed text-white whitespace-nowrap"
                        height={{ default: "100%" }}
                        width={{ default: "100%" }}
                        bottom={{ default: "0" }}
                        left={{ default: "0" }}
                        justify={{ default: "end" }}
                      />
                    </Column>
                  {/if}

                  <Column width="28px">
                    <Text
                      text={{ default: savings.number }}
                      {frame}
                      name="savingsNumber"
                      class="font-kapra font-bold text-adonis-yellow-dark tracking-tighter"
                      height={{ default: "100%" }}
                      width={{ default: "100%" }}
                      bottom={{ default: "-5px" }}
                      left={{ default: "0" }}
                      style={{ "-webkit-text-stroke": "0.75px #1D3983" }}
                      justify={{ default: "center" }}
                    />

                    <Text
                      text={{ default: savings.percent }}
                      {frame}
                      name="savingsPercent"
                      class="font-kapra font-bold text-adonis-yellow-dark tracking-tighter"
                      height={{ default: "14px" }}
                      width={{ default: "14px" }}
                      top={{ default: "4px" }}
                      right={{ default: "-12px" }}
                      style={{ "-webkit-text-stroke": "0.75px #1D3983" }}
                      justify={{ default: "start" }}
                    />
                  </Column>

                  {#if savings.suffix}
                    <Column
                      width="{savings.suffixRatio * 40}px"
                      class="flex-1 pt-[16px]"
                    >
                      <Text
                        text={{ default: savings.suffix }}
                        {frame}
                        name="savingsSuffix"
                        class="font-semibold font-gotham-condensed text-white text-[10px] whitespace-nowrap"
                        height={{ default: "100%" }}
                        width={{ default: "100%" }}
                        bottom={{ default: "0" }}
                        left={{ default: "0" }}
                        justify={{ default: "start" }}
                      />
                    </Column>
                  {/if}
                </Row>
              </Column>
            </Row>
          {/if}

          {#if price}
            <!-- PRICE -->
            <Row height="60px" class="mt-[-6px]">
              <Column width="69px">
                <Row height="100%">
                  <Column width={price.dollars.length === 1 ? "30px" : "39px"}>
                    <Text
                      text={{ default: price.dollars }}
                      {frame}
                      name="priceDollars"
                      class="font-kapra text-adonis-red-medium font-bold text-[60px] leading-[55px]"
                      height={{ default: "100%" }}
                      width={{ default: "100%" }}
                      bottom={{ default: "0" }}
                      left={{ default: "0" }}
                      style={{ "-webkit-text-stroke": "2px white" }}
                      justify={{ default: "center" }}
                    />
                  </Column>

                  <Column width="30px">
                    {#if price.cents}
                      <Text
                        text={{ default: price.cents }}
                        {frame}
                        name="priceCents"
                        class="font-kapra text-adonis-red-medium font-bold"
                        height={{ default: "100%" }}
                        width={{ default: "100%" }}
                        top={{ default: "2px" }}
                        left={{ default: "0" }}
                        style={{ "-webkit-text-stroke": "2px white" }}
                      />
                    {/if}

                    {#if price.unit}
                      <Text
                        text={{ default: price.unit }}
                        {frame}
                        name="priceUnit"
                        class="text-adonis-red-medium justify-start"
                        height={{ default: "12px" }}
                        width={{ default: "100%" }}
                        top={{ default: "34px" }}
                        left={{ default: "0" }}
                      />
                    {/if}
                  </Column>
                </Row>
              </Column>

              <!-- TAX -->
              {#if frame["item.0.tax"] === "excluded"}
                <Column width="16px" class="p-[2px]">
                  <Text
                    text={{ default: "+TX" }}
                    {frame}
                    name="priceTax"
                    class="text-adonis-red-medium font-semibold"
                    height={{ default: "14px" }}
                    width={{ default: "100%" }}
                    top={{ default: "8px" }}
                    left={{ default: "0" }}
                  />
                </Column>
              {/if}
            </Row>
          {/if}

          <!-- PRODUCT NAME -->
          {#if frame["item.0.name"]}
            <Row height="52px" class="mt-[-10px]">
              <Text
                text={{ bind: "item.0.name" }}
                {frame}
                name="name"
                class=" font-bold font-gotham-condensed text-adonis-blue-extralight text-right"
                height={{ default: "100%" }}
                width={{ default: "100%" }}
                top={{ default: "0" }}
                left={{ default: "0" }}
              />
            </Row>
          {/if}

          <!-- PRODUCT DESCRIPTION -->
          {#if frame["item.0.description"]}
            <Row height="22px">
              <Text
                text={{ bind: "item.0.description" }}
                {frame}
                name="productDescription"
                class="text-adonis-blue-extralight text-right font-gotham-condensed"
                height={{ default: "100%" }}
                width={{ default: "100%" }}
                top={{ default: "0" }}
                left={{ default: "0" }}
              />
            </Row>
          {/if}

          {#if frame["item.0.alternatePrice"]}
            <Row height="12px" class="py-[2px]">
              <Text
                text={{ bind: "item.0.alternatePrice" }}
                {frame}
                name="alternatePrice"
                class=" text-adonis-blue-extralight text-right font-gotham-condensed"
                height={{ default: "100%" }}
                width={{ default: "100%" }}
                top={{ default: "0" }}
                left={{ default: "0" }}
                justify={{ default: "end" }}
              />
            </Row>
          {/if}

          {#if frame["item.0.regularPrice"]}
            <Row height="12px" class="py-[2px]">
              <Text
                text={{ bind: "item.0.regularPrice" }}
                {frame}
                name="regularPrice"
                class=" text-adonis-blue-extralight text-right font-gotham-condensed"
                height={{ default: "100%" }}
                width={{ default: "100%" }}
                top={{ default: "0" }}
                left={{ default: "0" }}
                justify={{ default: "end" }}
              />
            </Row>
          {/if}
        </Column>
      </Row>

      <!-- VALIDITY TEXT -->
      <Row height="30px" class="px-0 pt-[6px] pb-[10px]">
        <Text
          {frame}
          name="validity"
          text={{ default: validity }}
          class="font-gotham-condensed text-adonis-blue-extralight"
          align={{ default: "center" }}
          justify={{ default: "center" }}
          height={{ default: "100%" }}
          width={{ default: "100%" }}
          top={{ default: "0" }}
          left={{ default: "0" }}
        />
      </Row>
    </div>
  </div>
{:else}
  <!-- WIDE LAYOUT (728x90) -->
  <div
    class="bg-[#EDD2A9] bg-[url('{assetsRoot}/images/ad/adonis/bg-adonis-stone-728x90.svg')] bg-cover h-full w-full overflow-hidden"
    use:animation={{
      controller: animationController,
      options: {
        name: "fadeIn",
        normal: { duration: 250 },
        reverse: { delay: 5000, duration: 50 },
      },
    }}
  >
    <Row height="100%" class="px-[8px] gap-[8px]">
      <!-- ADONIS LOGO -->
      <Column width="160px">
        <Row height="90px">
          <Image
            {frame}
            alt={{ default: "Adonis - A world of freshness" }}
            src={{
              default: `${assetsRoot}/images/ad/adonis/logo-adonis-red.svg`,
            }}
            class="object-contain"
            height={{ default: "100%" }}
            left={{ default: "0" }}
            name="adonisLogo"
            top={{ default: "0" }}
            width={{ default: "100%" }}
          />
        </Row>
      </Column>

      <!-- PRODUCT IMAGE WITH CORNER LOGOS -->
      <Column width="130px">
        <Row height="90px">
          <Image
            {frame}
            alt={{ default: "Product Image" }}
            src={{ bind: "item.0.imageUrl" }}
            class="object-contain"
            height={{ default: "100%" }}
            left={{ default: "0" }}
            name="productImage"
            top={{ default: "0" }}
            width={{ default: "100%" }}
          />

          <!-- Corner logos -->
          <Image
            alt={{ default: "Logo 1" }}
            src={{ bind: "item.0.logo1" }}
            class="object-contain object-[left_top]"
            {frame}
            height={{ default: "33%" }}
            left={{ default: "0" }}
            name="logo1"
            top={{ default: "0" }}
            width={{ default: "33%" }}
          />
          <Image
            alt={{ default: "Logo 2" }}
            src={{ bind: "item.0.logo2" }}
            class="object-contain object-[right_top]"
            {frame}
            height={{ default: "33%" }}
            name="logo2"
            right={{ default: "0" }}
            top={{ default: "0" }}
            width={{ default: "33%" }}
          />
          <Image
            alt={{ default: "Logo 3" }}
            src={{ bind: "item.0.logo3" }}
            class="object-contain object-[left_bottom]"
            {frame}
            height={{ default: "33%" }}
            left={{ default: "0" }}
            name="logo3"
            bottom={{ default: "0" }}
            width={{ default: "33%" }}
          />
          <Image
            alt={{ default: "Logo 4" }}
            src={{ bind: "item.0.logo4" }}
            class="object-contain object-[right_bottom]"
            {frame}
            height={{ default: "33%" }}
            name="logo4"
            right={{ default: "0" }}
            bottom={{ default: "0" }}
            width={{ default: "33%" }}
          />
        </Row>
      </Column>

      <!-- SAVINGS AND PRICE SECTION -->
      <Column width="90px">
        {#if savings}
          <!-- SAVINGS -->
          <Row height="28px" class="mt-[4px]">
            <!-- BACKGROUND -->
            <Column width="69px">
              <Text
                text={{ default: "" }}
                {frame}
                name="savingsBackground"
                class="bg-adonis-blue-lighter rounded-tl-md rounded-br-md border border-white"
                height={{ default: "21px" }}
                width={{ default: "100%" }}
                bottom={{ default: "-6px" }}
                left={{ default: "0" }}
              />

              <Row height="100%" class="px-[4px] pb-[2px]">
                {#if savings.prefix}
                  <Column
                    width="{savings.prefixRatio * 40}px"
                    class="flex-1 pt-[16px]"
                  >
                    <Text
                      text={{ default: savings.prefix }}
                      {frame}
                      name="savingsPrefix"
                      class="font-semibold font-gotham-condensed text-white whitespace-nowrap"
                      height={{ default: "100%" }}
                      width={{ default: "100%" }}
                      bottom={{ default: "0" }}
                      left={{ default: "0" }}
                      justify={{ default: "end" }}
                    />
                  </Column>
                {/if}

                <Column width="28px">
                  <Text
                    text={{ default: savings.number }}
                    {frame}
                    name="savingsNumber"
                    class="font-kapra font-bold text-adonis-yellow-dark tracking-tighter"
                    height={{ default: "100%" }}
                    width={{ default: "100%" }}
                    bottom={{ default: "-5px" }}
                    left={{ default: "0" }}
                    style={{ "-webkit-text-stroke": "0.75px #1D3983" }}
                    justify={{ default: "center" }}
                  />

                  <Text
                    text={{ default: savings.percent }}
                    {frame}
                    name="savingsPercent"
                    class="font-kapra font-bold text-adonis-yellow-dark tracking-tighter"
                    height={{ default: "14px" }}
                    width={{ default: "14px" }}
                    top={{ default: "4px" }}
                    right={{ default: "-12px" }}
                    style={{ "-webkit-text-stroke": "0.75px #1D3983" }}
                    justify={{ default: "start" }}
                  />
                </Column>

                {#if savings.suffix}
                  <Column
                    width="{savings.suffixRatio * 40}px"
                    class="flex-1 pt-[16px]"
                  >
                    <Text
                      text={{ default: savings.suffix }}
                      {frame}
                      name="savingsSuffix"
                      class="font-semibold font-gotham-condensed text-white text-[10px] whitespace-nowrap"
                      height={{ default: "100%" }}
                      width={{ default: "100%" }}
                      bottom={{ default: "0" }}
                      left={{ default: "0" }}
                      justify={{ default: "start" }}
                    />
                  </Column>
                {/if}
              </Row>
            </Column>
          </Row>
        {/if}

        {#if price}
          <!-- PRICE -->
          <Row height="60px" class="mt-[-6px]">
            <Column width="69px">
              <Row height="100%">
                <Column width={price.dollars.length === 1 ? "30px" : "39px"}>
                  <Text
                    text={{ default: price.dollars }}
                    {frame}
                    name="priceDollars"
                    class="font-kapra text-adonis-red-medium font-bold text-[60px] leading-[55px]"
                    height={{ default: "100%" }}
                    width={{ default: "100%" }}
                    bottom={{ default: "0" }}
                    left={{ default: "0" }}
                    style={{ "-webkit-text-stroke": "2px white" }}
                    justify={{ default: "center" }}
                  />
                </Column>

                <Column width="30px">
                  {#if price.cents}
                    <Text
                      text={{ default: price.cents }}
                      {frame}
                      name="priceCents"
                      class="font-kapra text-adonis-red-medium font-bold"
                      height={{ default: "100%" }}
                      width={{ default: "100%" }}
                      top={{ default: "2px" }}
                      left={{ default: "0" }}
                      style={{ "-webkit-text-stroke": "2px white" }}
                    />
                  {/if}

                  {#if price.unit}
                    <Text
                      text={{ default: price.unit }}
                      {frame}
                      name="priceUnit"
                      class="text-adonis-red-medium justify-start"
                      height={{ default: "12px" }}
                      width={{ default: "100%" }}
                      top={{ default: "34px" }}
                      left={{ default: "0" }}
                    />
                  {/if}
                </Column>
              </Row>
            </Column>

            <!-- TAX -->
            {#if frame["item.0.tax"] === "excluded"}
              <Column width="16px" class="p-[2px]">
                <Text
                  text={{ default: "+TX" }}
                  {frame}
                  name="priceTax"
                  class="text-adonis-red-medium font-semibold"
                  height={{ default: "14px" }}
                  width={{ default: "100%" }}
                  top={{ default: "8px" }}
                  left={{ default: "0" }}
                />
              </Column>
            {/if}
          </Row>
        {/if}
      </Column>

      <!-- PRODUCT NAME AND DESCRIPTION -->
      <Column width="200px">
        {#if frame["item.0.name"]}
          <Row height="40px">
            <Text
              text={{ bind: "item.0.name" }}
              {frame}
              name="name"
              class="font-bold font-gotham-condensed text-adonis-blue-extralight text-leftttttttttttttttttttttttttttttttttttttttttttttttttt leading-none"
              height={{ default: "100%" }}
              width={{ default: "100%" }}
              top={{ default: "0" }}
              left={{ default: "0" }}
            />
          </Row>
        {/if}

        {#if frame["item.0.description"]}
          <Row height="14px">
            <Text
              text={{ bind: "item.0.description" }}
              {frame}
              name="productDescription"
              class="text-adonis-blue-extralight text-left font-gotham-condensed text-[14px] leading-none"
              height={{ default: "100%" }}
              width={{ default: "100%" }}
              top={{ default: "0" }}
              left={{ default: "0" }}
            />
          </Row>
        {/if}

        {#if frame["item.0.alternatePrice"]}
          <Row height="14px">
            <Text
              text={{ bind: "item.0.alternatePrice" }}
              {frame}
              name="alternatePrice"
              class="text-adonis-blue-extralight text-left font-gotham-condensed text-[14px] leading-none"
              height={{ default: "100%" }}
              width={{ default: "100%" }}
              top={{ default: "0" }}
              left={{ default: "0" }}
            />
          </Row>
        {/if}

        {#if frame["item.0.regularPrice"]}
          <Row height="14px">
            <Text
              text={{ bind: "item.0.regularPrice" }}
              {frame}
              name="regularPrice"
              class="text-adonis-blue-extralight text-left font-gotham-condensed text-[14px] leading-none"
              height={{ default: "100%" }}
              width={{ default: "100%" }}
              top={{ default: "0" }}
              left={{ default: "0" }}
            />
          </Row>
        {/if}
      </Column>

      <!-- CTA AND VALIDITY -->
      <Column width="148px">
        <!-- CTA BUTTON -->
        <Row height="20px" class="mt-[40px]">
          <Link
            href={{ bind: "item.0.link" }}
            {frame}
            name="ctaLink"
            text={{
              default: lang === "en" ? "SEE OUR FLYER" : "VOIR NOTRE FLYER",
            }}
            class="bg-adonis-sky-medium font-gotham hover:bg-adonis-sky-medium/90 rounded px-[12px] py-[4px] text-right font-bold text-white transition-colors duration-300 ease-in-out"
            height={{ default: "100%" }}
            width={{ default: "100%" }}
            top={{ default: "0" }}
            left={{ default: "0" }}
            align={{ default: "center" }}
            justify={{ default: "end" }}
          />
        </Row>

        <!-- VALIDITY -->
        <Row height="26px" class="p-[6px]">
          <Text
            {frame}
            name="validity"
            text={{ default: validity }}
            class="font-gotham-condensed text-adonis-blue-extralight text-right"
            height={{ default: "100%" }}
            width={{ default: "100%" }}
            top={{ default: "0" }}
            left={{ default: "0" }}
            align={{ default: "center" }}
            justify={{ default: "end" }}
          />
        </Row>
      </Column>
    </Row>
  </div>
{/if}
