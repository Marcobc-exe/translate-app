import type { FC } from "react";
import type { Language } from "../../../types/languages";
import { SelectLanguage } from "../../Selects/SelectLanguage";
import { MostLikedLangs } from "../../MostLikedLangs/MostLikedLangs";

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
  return (
    <>
      {mobile ? (
        <SelectLanguage
          onChangeLang={onChangeLang}
          mobile={mobile}
          lang={lang}
        />
      ) : (
        <>
          <SelectLanguage
            onChangeLang={onChangeLang}
            mobile={mobile}
            lang={lang}
          />
          <MostLikedLangs lang={lang} handleLanguage={handleLanguage} />
        </>
      )}
    </>
  );
};
