<script lang="ts">
  import { animation } from "./animation";
  import { autoSize } from "./auto-size";
  import { editable } from "./editable";
  import type { RenderArgs } from "./template";
  import { BLANK_IMAGE, imageSrc } from "./url";

  const LOGO_SIZE = [47, 59] as [number, number];

  const { args }: { args: RenderArgs } = $props();
  const animationController = $derived(args.animationController);
  const item = $derived(args.items[0]);
  const content = $derived(item.content);
  const lang = $derived(args.lang);
  const editController = $derived(args.editController);
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
        <img
          class="h-full w-full object-contain"
          src={content.imageUrl}
          alt="Product"
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
      <div
        class="max-h-[45px] max-w-full overflow-hidden text-base leading-tight font-bold text-[red]"
        use:editable={{
          controller: editController,
          content,
          itemIndex: 0,
          key: "savings",
          setValue(node, value) {
            node.innerText = value;
            autoSize(node);
          },
        }}
      ></div>
      <div
        class="max-h-[45px] max-w-full overflow-hidden text-3xl leading-none font-black text-[red]"
        use:editable={{
          controller: editController,
          content,
          itemIndex: 0,
          key: "price",
          setValue(node, value) {
            node.innerText = value;
            autoSize(node);
          },
        }}
      ></div>
      <div
        class="max-h-[45px] max-w-full overflow-hidden leading-tight font-bold"
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
      ></div>
      <div
        class="max-h-[45px] max-w-full overflow-hidden"
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
      ></div>
    </div>
  </div>
  <div class="flex h-[56px] w-full justify-center gap-2 bg-[lightgray] p-2">
    <a
      class="flex h-[40px] w-[124px] shrink-0 items-center justify-center rounded bg-black px-2 leading-tight font-bold text-white {lang ===
      'fr'
        ? 'text-[10px]'
        : 'text-xs'}"
      href={content.link}
      target="_blank"
    >
      {#if lang === "en"}
        SEE OUR FLYER
      {:else}
        VOIR NOTRE FLYER
      {/if}
    </a>

    <div class="grow">
      <img
        class="h-full w-full object-contain"
        src={content.retailerLogoUrl}
        alt={content.retailerName}
      />
    </div>
  </div>
</div>
