import type { Language } from "../template";

type ValidityStrings = {
  validFromStr: string;
  validToStr: string;
};

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

function nexusToJsDate(date: string): Date {
  const [year, month, day] = date.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function getValidity(
  from: string | undefined,
  to: string | undefined,
  lang: Language
) {
  if (!from || !to) {
    return "";
  }
  const { validFromStr, validToStr } = getValidityStrings(from, to, lang);
  return lang === "en"
    ? `Valid from ${validFromStr} to ${validToStr}`
    : `Valide du ${validFromStr} au ${validToStr}`;
}
