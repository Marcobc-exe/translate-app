import "./buttons.css";
import type { FC } from "react";
import type { Language } from "../../types/languages";

type Props = {
  lang: Language;
  handleLanguage: (lang: Language) => void;
};

export const BtnDefaultLanguage: FC<Props> = ({ lang, handleLanguage }) => {
  return (
    <button className="btnTranslate" onClick={() => handleLanguage(lang)}>
      {lang.label}
    </button>
  );
};
