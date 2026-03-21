import "./buttons.css";
import type { FC } from "react";
import type { Language } from "../../types/languages";

type Props = {
  lang: Language;
  langSelected: Language;
  handleLanguage: (lang: Language) => void;
};

export const BtnDefaultLanguage: FC<Props> = ({
  lang,
  langSelected,
  handleLanguage,
}) => {
  const selected = lang.code === langSelected.code;
  return (
    <button
      className={`btnTranslate-${selected}`}
      onClick={() => handleLanguage(lang)}
    >
      {lang.label}
    </button>
  );
};
