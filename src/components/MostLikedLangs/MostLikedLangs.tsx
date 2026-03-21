import type { FC } from "react";
import { LANGUAGES } from "../../consts/Languages";
import type { Language } from "../../types/languages";
import { BtnDefaultLanguage } from "../buttons/BtnDefaultLanguage";

type Props = {
  lang: Language;
  handleLanguage: (lang: Language) => void;
};

export const MostLikedLangs: FC<Props> = ({
  lang,
  handleLanguage,
}) => {
  return (
    <>
      {LANGUAGES.map((language) => (
        <BtnDefaultLanguage
          lang={language}
          langSelected={lang}
          handleLanguage={handleLanguage}
        />
      ))}
    </>
  );
};
