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

export const LanguagePanel: FC<Props> = ({
  mobile,
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
      justifyContent={mobile ? "center" : "normal"}
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
