import { type FC } from "react";
import type { Language } from "../../types/languages";
import { BtnDefaultLanguage } from "../buttons/BtnDefaultLanguage";

type Props = {
  languagesList: Language[];
  lang: Language;
  handleLanguage: (lang: Language) => void;
};

export const MostLikedLangs: FC<Props> = ({
  languagesList,
  lang,
  handleLanguage,
}) => {
  return (
    <>
      {languagesList.map((language) => (
        <BtnDefaultLanguage
          lang={language}
          langSelected={lang}
          handleLanguage={handleLanguage}
        />
      ))}
    </>
  );
};
