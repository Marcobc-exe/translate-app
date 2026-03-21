import { Grid } from "@mui/material";
import { SelectLanguage } from "../Selects/SelectLanguage";
import { MostLikedLangs } from "../MostLikedLangs/MostLikedLangs";
import type { Language } from "../../types/languages";
import type { FC } from "react";

type Props = {
  lang: Language;
  handleLanguage: (lang: Language) => void;
  onChangeLang: (lang: Language) => void;
};

export const LanguagePanel: FC<Props> = ({
  lang,
  handleLanguage,
  onChangeLang,
}) => {
  return (
    <Grid
      container
      spacing={1}
      height={"50px"}
      borderBottom={"1px solid #4D5562"}
      alignItems={"center"}
    >
      <SelectLanguage onChangeLang={onChangeLang} />
      <MostLikedLangs lang={lang} handleLanguage={handleLanguage} />
    </Grid>
  );
};
