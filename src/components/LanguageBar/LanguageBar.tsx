import "./langbar.css"
import type { FC } from "react";
import { Grid } from "@mui/material";
import type { Language } from "../../types/languages";
import { SelectLang } from "../ResponsiveDesigns/SelectLangs/SelectLangs";

type Props = {
  mobile: boolean;
  lang: Language;
  handleLanguage: (lang: Language) => void;
  onChangeLang: (lang: Language) => void;
};

export const LanguageBar: FC<Props> = ({
  mobile,
  lang,
  handleLanguage,
  onChangeLang,
}) => {
  return (
    <Grid
      className="language-bar"
      container
      alignItems={"center"}
      justifyContent={"center"}
    >
      <SelectLang
        lang={lang}
        mobile={mobile}
        handleLanguage={handleLanguage}
        onChangeLang={onChangeLang}
      />
    </Grid>
  );
};
