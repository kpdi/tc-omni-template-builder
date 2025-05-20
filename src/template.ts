import type { AnimationController } from "./animation-controller";
import type { EditController } from "./edit-controller";
import type { Product } from "./product";

// TYPES

export type Language = "en" | "fr";

/**
 * An object that is created by the Renderer from a RenderSpec. This is passed to the controller
 * and should contain everything required to render for preview, editing or generation.
 */
export type RenderArgs = {
  animationController: AnimationController;
  editController: EditController;
  items: RenderItem[];
  lang: Language;
  size: RenderSize;
};

/**
 * The content used to populate a template for a single item. Includes the user-specified content
 * and the original product data from the API (required to revert user changes and for selecting
 * from product logos aka slugs).
 */
export type RenderItem = {
  /**
   * User specified content to populate the template.
   */
  content: RenderContent;
  /**
   * The original product data from the API. This is only required for editing.
   */
  product?: Product;
};

/**
 * Content used to actually populate a template.
 */
export type RenderContent = {
  alternatePrice: string;
  category: string;
  description: string;
  imageUrl: string;
  link: string;
  name: string;
  path: string;
  price: string;
  retailerName: string;
  retailerLogoUrl: string;
  savings: string;
  logo1: string;
  logo2: string;
  logo3: string;
  logo4: string;
  validFrom: string;
  validTo: string;
};

/**
 * Mode to render the asset in. `auto` is for preview or `html5`,
 * `manual` is for images or videos.
 */
export type RenderMode = "auto" | "manual";

/**
 *
 */
export type RenderSize = [number, number];

/**
 * A specification created by the App and passed to the Renderer as a compressed URL hash.
 */
export type RenderSpec = {
  data: {
    frames: {
      items: RenderItem[];
    }[];
  };
  editable: boolean;
  lang: Language;
  mode: RenderMode;
  size: RenderSize;
};
