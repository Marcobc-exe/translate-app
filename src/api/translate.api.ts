import { isAxiosError, isCancel } from "axios";
import type { LanguageCode } from "../types/languages";
import type { TranslationResponse } from "../types/translations";
import { api } from "./config";
import { TranslationError } from "./errors";

// MyMemory rejects queries above 500 bytes (UTF-8), not 500 characters
export const MAX_QUERY_BYTES = 500;
const QUOTA_WARNING = "MYMEMORY WARNING";

type TranslateParams = {
  text: string;
  source: LanguageCode;
  target: LanguageCode;
  signal?: AbortSignal;
};

export const byteLength = (text: string) => new TextEncoder().encode(text).length;

export const translateText = async ({
  text,
  source,
  target,
  signal,
}: TranslateParams): Promise<string> => {
  if (source === target) throw new TranslationError("SAME_LANGUAGE");
  if (byteLength(text) > MAX_QUERY_BYTES) throw new TranslationError("TOO_LONG");

  let data: TranslationResponse;
  try {
    const response = await api.get<TranslationResponse>("get", {
      params: {
        q: text,
        langpair: `${source}|${target}`,
        de: import.meta.env.VITE_MYMEMORY_EMAIL || undefined,
      },
      signal,
    });
    data = response.data;
  } catch (error) {
    // Let TanStack Query recognise its own cancellations
    if (isCancel(error)) throw error;
    if (isAxiosError(error) && error.response?.status === 429)
      throw new TranslationError("QUOTA_EXCEEDED");
    throw new TranslationError("NETWORK");
  }

  const status = Number(data.responseStatus);
  const translated = data.responseData?.translatedText ?? "";

  if (
    status === 429 ||
    data.quotaFinished ||
    translated.startsWith(QUOTA_WARNING)
  )
    throw new TranslationError("QUOTA_EXCEEDED");

  if (status !== 200 || !translated)
    throw new TranslationError("API", data.responseDetails || undefined);

  return translated;
};
