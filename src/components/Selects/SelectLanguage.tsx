import "./selects.css";
import type { FC } from "react";
import type { Language } from "../../types/languages";
import { LANGUAGES } from "../../consts/Languages";
import { Grid } from "@mui/material";
import { BtnDefaultLanguage } from "../buttons/BtnDefaultLanguage";

type Props = {
  source?: Language;
  target?: Language;
  handleLanguage: (lang: Language) => void;
};

export const SelectLanguage: FC<Props> = ({
  source,
  target,
  handleLanguage,
}) => {
  return (
    <Grid
      container
      spacing={2}
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
            onClick={() => handleLanguage(lang)}
          >
            {lang.label}
          </option>
        ))}
      </select>
      {source ? (
        <BtnDefaultLanguage source={source} handleLanguage={handleLanguage} />
      ) : (
        <BtnDefaultLanguage target={target} handleLanguage={handleLanguage} />
      )}
    </Grid>
  );
};
