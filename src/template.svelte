<script lang="ts" module>
  import { animation } from "./animation";
  import { Image, Link, Text } from "./editable";
  import type { RenderArgs } from "./template";

  export const ITEMS_PER_FRAME = 1 as const;
</script>

<script lang="ts">
  const { args }: { args: RenderArgs<typeof ITEMS_PER_FRAME> } = $props();
  const { animationController } = args;
  const frame = $derived(args.frame);
</script>

<div class="flex h-full flex-col border border-[gray] bg-white">
  <div class="relative flex w-full grow gap-2 overflow-hidden p-2">
    <div class="w-1/2">
      <div
        class="relative h-full w-full"
        use:animation={{
          controller: animationController,
          options: {
            name: "slideRight",
            normal: {
              duration: 250,
            },
            reverse: {
              delay: 2000,
              duration: 50,
            },
          },
        }}
      >
        <Image
          {frame}
          alt={{ default: "Product Image" }}
          src={{ bind: "item.0.imageUrl" }}
          class="object-contain object-center"
          height={{ default: "100%" }}
          left={{ default: "0" }}
          name="image"
          top={{ default: "0" }}
          width={{ default: "100%" }}
        />
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
          bottom={{ default: "0" }}
          class="object-contain object-[left_bottom]"
          {frame}
          height={{ default: "33%" }}
          left={{ default: "0" }}
          name="logo3"
          width={{ default: "33%" }}
        />
        <Image
          alt={{ default: "Logo 4" }}
          src={{ bind: "item.0.logo4" }}
          bottom={{ default: "0" }}
          class="object-contain object-[right_bottom]"
          {frame}
          height={{ default: "33%" }}
          name="logo4"
          right={{ default: "0" }}
          width={{ default: "33%" }}
        />
      </div>
    </div>

    <div
      class="flex w-1/2 flex-col justify-center gap-1"
      use:animation={{
        controller: animationController,
        options: {
          name: "slideLeft",
          normal: {
            duration: 250,
          },
          reverse: {
            delay: 2000,
            duration: 50,
          },
        },
      }}
    >
      <Text
        {frame}
        text={{ bind: "item.0.savings" }}
        class="text-base leading-tight font-bold text-[red]"
        height={{ default: "35px" }}
        width={{ default: "100%" }}
        top={{ default: "0" }}
        left={{ default: "0" }}
        name="savings"
      />

      <Text
        {frame}
        text={{ bind: "item.0.price" }}
        class="text-3xl leading-none font-black text-[red]"
        height={{ default: "45px" }}
        width={{ default: "100%" }}
        top={{ default: "35px" }}
        left={{ default: "0" }}
        name="price"
      />

      <Text
        {frame}
        text={{ bind: "item.0.regularPrice" }}
        class="text-base leading-tight text-[gray]"
        height={{ default: "20px" }}
        width={{ default: "100%" }}
        top={{ default: "80px" }}
        left={{ default: "0" }}
        name="regularPrice"
      />

      <Text
        {frame}
        text={{ bind: "item.0.name" }}
        class="leading-tight font-bold"
        height={{ default: "45px" }}
        width={{ default: "100%" }}
        top={{ default: "100px" }}
        left={{ default: "0" }}
        name="name"
      />

      <Text
        {frame}
        text={{ bind: "item.0.description" }}
        height={{ default: "35px" }}
        width={{ default: "100%" }}
        top={{ default: "145px" }}
        left={{ default: "0" }}
        name="description"
      />
    </div>
  </div>

  <div class="h-[56px] w-full justify-center gap-2 bg-[lightgray] p-2">
    <div class="relative h-full w-full">
      <Link
        href={{ bind: "item.0.link" }}
        class="rounded bg-black p-2 leading-tight font-bold text-white"
        {frame}
        height={{ default: "100%" }}
        left={{ default: "0" }}
        name="link"
        text={{ default: args.lang === "en" ? "SEE OUR FLYER" : "VOIR NOTRE FLYER" }}
        top={{ default: "0" }}
        width={{ default: "50%" }}
      />
      <Image
        {frame}
        alt={{ bind: "item.0.retailerName" }}
        src={{ bind: "item.0.retailerLogoUrl" }}
        class="object-contain object-center"
        height={{ default: "100%" }}
        name="retailerLogo"
        right={{ default: "0" }}
        top={{ default: "0" }}
        width={{ default: "50%" }}
      />
    </div>
  </div>
</div>
