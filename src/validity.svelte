<script lang="ts">
  import type { Language, RenderItem } from "./template";

  type ValidityStrings = {
    validFromStr: string;
    validToStr: string;
  };

  const { item, lang }: { item: RenderItem; lang: Language } = $props();

  const { validFromStr, validToStr } = $derived(
    getValidityStrings(item.validFrom, item.validTo, lang)
  );

  function nexusToJsDate(date: string): Date {
    const [year, month, day] = date.split("-").map(Number);
    return new Date(year, month - 1, day);
  }

  function getValidityStrings(
    nexusValidFrom: string,
    nexusValidTo: string,
    lang: Language,
    monthFormat: Intl.DateTimeFormatOptions["month"] = "long"
  ): ValidityStrings {
    const locale = lang === "en" ? "en-CA" : "fr-CA";

    const validFrom = nexusToJsDate(nexusValidFrom);
    const validTo = nexusToJsDate(nexusValidTo);

    const validFromStr = validFrom.toLocaleDateString(locale, {
      month: monthFormat,
      day: "numeric",
    });
    const validToStr =
      validFrom.getMonth() === validTo.getMonth()
        ? validTo.toLocaleDateString(locale, { day: "numeric" })
        : validTo.toLocaleDateString(locale, {
            month: monthFormat,
            day: "numeric",
          });

    return {
      validFromStr,
      validToStr,
    };
  }
</script>

{#if lang === "en"}
  Valid from {validFromStr} to {validToStr}
{:else}
  Valide du {validFromStr} au {validToStr}
{/if}
