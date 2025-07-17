import type { AnimationController } from "./animation-controller";
import type { Indices } from "./types/indices";

// TYPES

export type Language = "en" | "fr";

/**
 * An object that is created by the Renderer from a RenderSpec. This is passed to the controller
 * and should contain everything required to render for preview, editing or generation.
 */
export type RenderArgs<ItemCount extends number> = {
  animationController: AnimationController;
  frame: RenderFrameVars<ItemCount>;
  frameIndex: number;
  lang: Language;
  size: RenderSize;
  templateId: number;
};

/**
 * Content used to actually populate a template.
 */
export type RenderItem = {
  alternatePrice: string;
  category: string;
  description: string;
  imageUrl: string;
  link: string;
  logo1: string;
  logo2: string;
  logo3: string;
  logo4: string;
  name: string;
  path: string;
  price: string;
  regularPrice: string;
  retailerLogoUrl: string;
  retailerName: string;
  savings: string;
  tax: "excluded" | "free" | "included" | undefined;
  validFrom: string;
  validTo: string;
};

/**
 * Mode to render the asset in. `auto` is for preview or `html5`,
 * `manual` is for images or videos.
 */
export type RenderMode = "auto" | "manual";

/**
 * The size to render the template in, as a tuple of width and height.
 */
export type RenderSize = [number, number];

/**
 * A specification created by the App and injected into the Renderer.
 */
export type RenderSpec<Frames extends number = number> = {
  data: RenderVars<Frames>;
  editable: boolean;
  frames: Frames;
  lang: Language;
  mode: RenderMode;
  size: RenderSize;
  templateId: number;
};

/**
 * Represents the name of an item binding in a template (e.g., item.0.name)
 */
export type ItemBindingName<Item extends number = number> =
  `item.${Item}.${keyof RenderItem}`;

/**
 * Identifier for an editable context. Used to generate unique ids for variables defined in the
 * context.
 */
export type ContextId<
  TemplateId extends number = number,
  ContextName extends string = string
> = `template.${TemplateId}.${ContextName}`;

/**
 * Represents the name of a template binding in a template (e.g., template.0.name)
 */
export type TemplateBindingName<
  TemplateId extends number = number,
  ContextName extends string = string,
  FieldName extends string = string
> = `template.${TemplateId}.${ContextName}.${FieldName}`;

/**
 * Represents either an item binding name or a template binding name. Binding names are used
 * within the template.
 */
export type BindingName = ItemBindingName | TemplateBindingName;

/**
 * Represents the ID of an item binding in a template (e.g., frame.0.item.0.name)
 */
export type ItemBindingId<
  Frame extends number = number,
  Item extends number = number
> = `frame.${Frame}.${ItemBindingName<Item>}`;

/**
 * Represents the ID of a template binding in a template (e.g., frame.0.template.0.logo1.height)
 */
export type TemplateBindingId<Frame extends number = number> =
  `frame.${Frame}.${TemplateBindingName}`;

/**
 * Represents either an item binding ID or a template binding ID. Binding IDs are used to store
 * data for rendering.
 */
export type BindingId<Frame extends number = number> =
  | ItemBindingId<Frame>
  | TemplateBindingId<Frame>;

/**
 * A record of all item variables for a specific frame and item count. Item variables apply
 * across all templates. The keys are IDs (i.e. scoped by frame and item).
 */
export type ItemVars<
  FrameCount extends number,
  ItemCount extends number
> = Record<ItemBindingId<Indices<FrameCount>, Indices<ItemCount>>, string>;

/**
 * A record of all template variables for a specific frame. Template variables apply only to
 * specific components in a specific template. The keys are IDs (i.e. scoped by frame).
 */
export type TemplateVars<Frames extends number> = Record<
  TemplateBindingId<Indices<Frames>>,
  string
>;

/**
 * All of the variables used in a template, including both item and template variables.
 */
export type RenderVars<
  FrameCount extends number = number,
  ItemCount extends number = number
> = ItemVars<FrameCount, ItemCount> & TemplateVars<FrameCount>;

export type ItemFrameVars<ItemCount extends number> = Record<
  ItemBindingName<Indices<ItemCount>>,
  string
>;
export type TemplateFrameVars = Record<TemplateBindingName, string>;

/**
 * A subset of RenderVars for one frame. The keys are names (i.e. `frame.${number}.` has been
 * stripped off).
 */
export type RenderFrameVars<Items extends number = number> =
  ItemFrameVars<Items> & TemplateFrameVars;

/**
 * Find the subset of RenderVars for a specific frame index, then return a new object containing
 * only those variables with the `frame.${frameIndex}.` prefix stripped off.
 */
export function getRenderFrameVars<
  FrameCount extends number = number,
  ItemCount extends number = number
>(
  renderVars: RenderVars<FrameCount, ItemCount>,
  frameIndex: number
): RenderFrameVars<ItemCount> {
  const prefix = `frame.${frameIndex}.`;
  return Object.fromEntries(
    Object.entries(renderVars)
      .filter(([key]) => key.startsWith(prefix))
      .map(([key, value]) => {
        key = key.replace(prefix, "");
        return [key, value];
      })
  ) as RenderFrameVars<ItemCount>;
}
