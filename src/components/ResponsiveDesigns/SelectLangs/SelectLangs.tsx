import { useState, type FC } from "react";
import type { Language } from "../../../types/languages";
import { SelectLanguage } from "../../Selects/SelectLanguage";
import { MostLikedLangs } from "../../MostLikedLangs/MostLikedLangs";
import { LANGUAGES } from "../../../consts/Languages";

type Props = {
  mobile: boolean;
  lang: Language;
  handleLanguage: (lang: Language) => void;
  onChangeLang: (lang: Language) => void;
};

export const SelectLang: FC<Props> = ({
  mobile,
  lang,
  handleLanguage,
  onChangeLang,
}) => {
  const [languagesList, setLanguagesList] = useState<Language[]>(() => {
    const list = localStorage.getItem("mostUsedLanguages");
    if (list) return JSON.parse(list);
    return LANGUAGES;
  });

  const mostUsedLanguages = (lang: Language) => {
    const exists = languagesList.find(
      (langlist) => langlist.code === lang.code,
    );

    if (exists) return onChangeLang(lang);

    languagesList.pop();
    languagesList.unshift(lang);

    localStorage.setItem("mostUsedLanguages", JSON.stringify(languagesList));

    setLanguagesList(languagesList);
    onChangeLang(lang);
  };

  return (
    <>
      {mobile ? (
        <SelectLanguage
          onChangeLang={mostUsedLanguages}
          mobile={mobile}
          lang={lang}
        />
      ) : (
        <>
          <MostLikedLangs
            languagesList={languagesList}
            lang={lang}
            handleLanguage={handleLanguage}
          />
          <SelectLanguage
            onChangeLang={mostUsedLanguages}
            mobile={mobile}
            lang={lang}
          />
        </>
      )}
    </>
  );
};
