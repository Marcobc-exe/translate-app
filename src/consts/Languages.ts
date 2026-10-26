import type { Language } from "../types/languages";

export const ALLLANGUAGES: Language[] = [
  { code: "en", label: "English" },
  { code: "es", label: "Spanish" },
  { code: "fr", label: "French" },
  { code: "de", label: "German" },
  { code: "pt", label: "Portuguese" },
  { code: "it", label: "Italian" },
  { code: "nl", label: "Dutch" },
  { code: "ru", label: "Russian" },
  { code: "ja", label: "Japanese" },
  { code: "ko", label: "Korean" },
  { code: "zh-CN", label: "Chinese" },
];

export const LANGUAGES: Language[] = ALLLANGUAGES.slice(0, 3);

export const findLanguage = (code: unknown) =>
  ALLLANGUAGES.find((lang) => lang.code === code);

export const isLanguage = (value: unknown): value is Language =>
  typeof value === "object" &&
  value !== null &&
  findLanguage((value as Language).code) !== undefined;

export const isLanguageList = (value: unknown): value is Language[] =>
  Array.isArray(value) && value.length > 0 && value.every(isLanguage);
