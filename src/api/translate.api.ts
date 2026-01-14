import type { TranslationResponse } from "../types/translations";
import { api } from "./config";

type TranslateProps = {
  text: string;
  source: string;
  target: string;
};

export const translateText = async ({
  text,
  source,
  target,
}: TranslateProps): Promise<TranslationResponse> => {
  const response = await api.get<TranslationResponse>("get", {
    params: {
      q: text,
      langpair: `${source}|${target}`,
    },
  });

  return response.data;
};
