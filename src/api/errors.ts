export type TranslationErrorCode =
  | "SAME_LANGUAGE"
  | "TOO_LONG"
  | "QUOTA_EXCEEDED"
  | "NETWORK"
  | "API";

const MESSAGES: Record<TranslationErrorCode, string> = {
  SAME_LANGUAGE: "Pick two different languages.",
  TOO_LONG: "The text is too long for the free translation API.",
  QUOTA_EXCEEDED: "Daily free translation quota reached. Try again tomorrow.",
  NETWORK: "Couldn't reach the translation service. Check your connection.",
  API: "The translation service returned an error.",
};

export class TranslationError extends Error {
  readonly code: TranslationErrorCode;

  constructor(code: TranslationErrorCode, message = MESSAGES[code]) {
    super(message);
    this.name = "TranslationError";
    this.code = code;
  }

  get retryable() {
    return this.code === "NETWORK" || this.code === "API";
  }
}

export const getErrorMessage = (error: unknown) =>
  error instanceof TranslationError ? error.message : MESSAGES.API;
