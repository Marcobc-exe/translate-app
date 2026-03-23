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
  const uniqueLanguages = Array.from(
    new Map([lang, ...languagesList].map((l) => [l.code, l])).values()
  );

  return (
    <>
      {uniqueLanguages.map((language) => (
        <BtnDefaultLanguage
          key={language.code}
          lang={language}
          langSelected={lang}
          handleLanguage={handleLanguage}
        />
      ))}
    </>
  );
};
