// Trim and collapse inline whitespace so "hello" and "hello  " share a cache
// entry and never trigger a second request. Line breaks are preserved.
export const normalizeText = (text: string) =>
  text.trim().replace(/[ \t]+/g, " ");
