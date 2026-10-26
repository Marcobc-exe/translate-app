export type LanguageCode =
  | "en"
  | "es"
  | "fr"
  | "de"
  | "pt"
  | "it"
  | "nl"
  | "ru"
  | "ja"
  | "ko"
  | "zh-CN";

export type Language = {
  code: LanguageCode;
  label: string;
};
