export interface Product {
  alternateImages: {
    url: string;
    size: [number, number];
  }[];
  alternatePrices: { text: { en: string; fr: string }; quantity: number }[];
  bannerId: string;
  category: {
    en: string;
    fr: string;
  };
  dealId: string;
  description: {
    en: string;
    fr: string;
  };
  id: string;
  image: {
    url: string;
  };
  logos: string[];
  name: {
    en: string;
    fr: string;
  };
  page: number;
  path: string;
  price: {
    quantity: number;
    savings: {
      text: {
        en: string;
        fr: string;
      };
    };
    text: {
      en: string;
      fr: string;
    };
  };
  publicationId: string;
  sku: string;
}
