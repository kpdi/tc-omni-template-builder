export function parseSavings(savings?: string) {
  if (!savings) return;
  const match = savings.match(/^(.*?)(\d+)(%?)(.*)$/);
  const [, prefix, number, percent, suffix] = match ?? ["", "", "", "", ""];
  const prefixRatio = prefix.length / (prefix.length + suffix.length);
  const suffixRatio = 1 - prefixRatio;
  return { prefix, number, percent, suffix, prefixRatio, suffixRatio };
}
