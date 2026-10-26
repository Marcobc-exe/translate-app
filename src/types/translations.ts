// MyMemory answers HTTP 200 even for failures; the real status lives in the
// body and is sometimes serialized as a string.
export type TranslationResponse = {
  responseData: {
    translatedText: string;
    match: number;
  };
  responseStatus: number | string;
  responseDetails: string;
  quotaFinished?: boolean | null;
};
