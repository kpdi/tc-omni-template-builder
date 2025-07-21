export function parsePrice(price?: string) {
  if (!price) return;
  const [amount, unit] = price.split(" /").map((part) => part.trim());
  const [dollars, cents] = amount.replace("$", "").split(/[.,]/);
  return { dollars, cents, unit: unit ? `/${unit}` : undefined };
}
