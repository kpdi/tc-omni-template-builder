type Banner = {
  bannerId: string;
  createdAt: string;
  id: number;
  logoUrlEn: string;
  logoUrlFr: string;
  nameEn: string;
  nameFr: string;
};

// FUNCTIONS

/**
 * Translate a banner to the specified language
 */
export function translateBanner(banner: Banner, lang: "en" | "fr") {
  return {
    bannerId: banner.bannerId,
    id: banner.id,
    logoUrl: lang === "en" ? banner.logoUrlEn : banner.logoUrlFr,
    name: lang === "en" ? banner.nameEn : banner.nameFr,
  };
}
