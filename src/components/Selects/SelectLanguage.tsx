import "./selects.css";
import type { FC } from "react";
import type { Language } from "../../types/languages";
import { LANGUAGES } from "../../consts/Languages";
import { Grid } from "@mui/material";
import { BtnDefaultLanguage } from "../buttons/BtnDefaultLanguage";

type Props = {
  lang: Language;
  handleLanguage: (lang: Language) => void;
  onChangeLang: (lang: Language) => void;
};

/**
 * Todo about most used language by user
 */
export const SelectLanguage: FC<Props> = ({ lang, handleLanguage, onChangeLang }) => {
  return (
    <Grid
      container
      spacing={1}
      height={"50px"}
      borderBottom={"1px solid #4D5562"}
      alignItems={"center"}
    >
      <select className="select-base">
        <option selected>Select Language</option>
        {LANGUAGES.map((lang) => (
          <option
            key={lang.code}
            className="langOption"
            onClick={() => onChangeLang(lang)}
          >
            {lang.label}
          </option>
        ))}
      </select>
      <BtnDefaultLanguage
        lang={LANGUAGES[0]}
        langSelected={lang}
        handleLanguage={handleLanguage}
      />
      <BtnDefaultLanguage
        lang={LANGUAGES[1]}
        langSelected={lang}
        handleLanguage={handleLanguage}
      />
      <BtnDefaultLanguage
        lang={LANGUAGES[2]}
        langSelected={lang}
        handleLanguage={handleLanguage}
      />
    </Grid>
  );
};
