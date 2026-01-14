import type { FC } from "react";
import type { TranslationResponse } from "../../types/translations";

type Props = {
  data: TranslationResponse | undefined;
};

export const TextTranslated: FC<Props> = ({ data }) => {
  return <>{data && <p>Result: {data.responseData.translatedText}</p>}</>;
};
