import { useState, type FC } from "react";
import type { Language } from "../../../types/languages";
import { SelectLanguage } from "../../Selects/SelectLanguage";
import { MostLikedLangs } from "../../MostLikedLangs/MostLikedLangs";
import { isLanguageList, LANGUAGES } from "../../../consts/Languages";
import { readJSON, writeJSON } from "../../../utils/storage";

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
  const [languagesList, setLanguagesList] = useState<Language[]>(() =>
    readJSON("mostUsedLanguages", LANGUAGES, isLanguageList),
  );

  const mostUsedLanguages = (lang: Language) => {
    const exists = languagesList.some((item) => item.code === lang.code);

    if (!exists) {
      const next = [lang, ...languagesList.slice(0, -1)];
      writeJSON("mostUsedLanguages", next);
      setLanguagesList(next);
    }

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
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
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
        </div>
      )}
    </>
  );
};
