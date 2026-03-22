import "./selects.css";
import type { FC } from "react";
import type { Language } from "../../types/languages";
import { ALLLANGUAGES } from "../../consts/Languages";

type Props = {
  mobile: boolean;
  lang: Language;
  onChangeLang: (lang: Language) => void;
};

export const SelectLanguage: FC<Props> = ({ onChangeLang, mobile, lang }) => {
  return (
    <select className="select-base">
      <option selected>{mobile ? lang.label : "Select Language"}</option>
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
