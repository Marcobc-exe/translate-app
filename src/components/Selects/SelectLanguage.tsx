import "./selects.css";
import type { FC } from "react";
import type { Language } from "../../types/languages";
import { ALLLANGUAGES } from "../../consts/Languages";

type Props = {
  onChangeLang: (lang: Language) => void;
};

/**
 * Todo about most used language by user
 */
export const SelectLanguage: FC<Props> = ({ onChangeLang }) => {
  return (
    <select className="select-base">
      <option selected>Select Language</option>
      {ALLLANGUAGES.map((lang) => (
        <option
          key={lang.code}
          className="langOption"
          onClick={() => onChangeLang(lang)}
        >
          {lang.label}
        </option>
      ))}
    </select>
  );
};
