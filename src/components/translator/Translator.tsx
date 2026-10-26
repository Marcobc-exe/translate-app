import "./translator.css";
import { useEffect, useState } from "react";
import { useTranslate } from "../../hooks/useTranslate";
import { TextArea } from "../Inputs/Input";
import { TextTranslated } from "../messages/TextTranslated";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import { useDebounce } from "../../hooks/useDebounce";
import { LanguageBar } from "../LanguageBar/LanguageBar";
import { useLanguagePair } from "../../hooks/useLanguagePair";

const MAX_LENGTH = 250;

export const Translator = () => {
  const { source, target, setSource, setTarget } = useLanguagePair();
  const [input, setInput] = useState("");

  const { mutate, data, isError, isPending, reset } = useTranslate();
  const debounceInput = useDebounce(input, 500);

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

  const translateText = (text: string) => {
    mutate({
      text: text,
      source: source.code,
      target: target.code,
    });
  };

  useEffect(() => {
    const text = debounceInput.trim();
    if (!text) return reset();
    translateText(text);
  }, [debounceInput, source, target]);

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
          isError={isError}
          isPending={isPending}
          value={data?.responseData.translatedText}
        />
      </Grid>
    </Grid>
  );
};
