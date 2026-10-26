import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { translateText } from "../api/translate.api";
import { TranslationError } from "../api/errors";
import type { LanguageCode } from "../types/languages";

type Params = {
  text: string;
  source: LanguageCode;
  target: LanguageCode;
};

const MAX_RETRIES = 1;

// useQuery instead of useMutation: results are cached per (pair, text),
// identical requests are deduplicated, and the AbortSignal cancels
// in-flight requests as soon as the text or languages change.
export const useTranslate = ({ text, source, target }: Params) =>
  useQuery({
    queryKey: ["translate", source, target, text],
    queryFn: ({ signal }) => translateText({ text, source, target, signal }),
    enabled: text.length > 0 && source !== target,
    staleTime: Infinity,
    gcTime: 30 * 60 * 1000,
    placeholderData: keepPreviousData,
    // Never hammer the free API: only retry transient failures, once
    retry: (failureCount, error) =>
      error instanceof TranslationError &&
      error.retryable &&
      failureCount < MAX_RETRIES,
  });
