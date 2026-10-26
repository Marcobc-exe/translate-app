import "./translator.css";
import { useState } from "react";
import { useTranslate } from "../../hooks/useTranslate";
import { TextArea } from "../Inputs/Input";
import { TextTranslated } from "../messages/TextTranslated";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import { useDebounce } from "../../hooks/useDebounce";
import { LanguageBar } from "../LanguageBar/LanguageBar";
import { useLanguagePair } from "../../hooks/useLanguagePair";
import { normalizeText } from "../../utils/text";

const MAX_LENGTH = 250;

export const Translator = () => {
  const { source, target, setSource, setTarget } = useLanguagePair();
  const [input, setInput] = useState("");

  const text = normalizeText(input);
  const query = useDebounce(text, 500);
  const { data, error, isFetching } = useTranslate({
    text: query,
    source: source.code,
    target: target.code,
  });

  /* 
    xs 0px
    sm 600px
    md 900px
    lg 1200px
    xl 1536px
  */
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const tablet = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Grid
      container
      spacing={3}
      justifyContent={"center"}
      sx={{
        maxWidth: "1350px",
        margin: "0 auto",
        padding: "30px 16px"
      }}
    >
      {/* INPUT */}
      <Grid size={(tablet ?? mobile) ? 12 : 6} className="translate-box">
        <Grid spacing={2}>
          <LanguageBar
            mobile={mobile}
            lang={source}
            handleLanguage={setSource}
            onChangeLang={setSource}
          />
          <TextArea
            value={input}
            maxLength={MAX_LENGTH}
            onChange={setInput}
          />
        </Grid>
      </Grid>

      {/* OUTPUT */}
      <Grid size={(tablet ?? mobile) ? 12 : 6} className="translate-box">
        <LanguageBar
          mobile={mobile}
          lang={target}
          handleLanguage={setTarget}
          onChangeLang={setTarget}
        />
        <TextTranslated
          value={text ? data : undefined}
          isLoading={!!text && isFetching}
          error={text ? error : null}
        />
      </Grid>
    </Grid>
  );
};
