import "./translator.css";
import { useEffect, useState } from "react";
import { useTranslate } from "../../hooks/useTranslate";
import { TextArea } from "../Inputs/Input";
import { TextTranslated } from "../messages/TextTranslated";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import { useDebounce } from "../../hooks/useDebounce";
import type { Language } from "../../types/languages";
import { LANGUAGES } from "../../consts/Languages";
import { LanguageBar } from "../LanguageBar/LanguageBar";

const MAX_LENGTH = 250;

const getStoredLanguage = (key: string, fallback: Language) => {
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : fallback;
};

export const Translator = () => {
  const [source, setSource] = useState<Language>(() =>
    getStoredLanguage("sourceLang", LANGUAGES[0]),
  );
  const [target, setTarget] = useState<Language>(() =>
    getStoredLanguage("targetLang", LANGUAGES[1]),
  );
  const [input, setInput] = useState("");
  const [inputHeight, setInputHeight] = useState<number>();

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

  const switchLanguages = () => {
    setSource(target);
    setTarget(source);
  };

  const handleSourceLang = (lang: Language) => {
    localStorage.setItem("sourceLang", JSON.stringify(lang));

    if (lang.code === target.code) return switchLanguages();
    setSource(lang);
  };

  const handleTargetLang = (lang: Language) => {
    localStorage.setItem("targetLang", JSON.stringify(lang));

    if (lang.code === target.code) return switchLanguages();
    setTarget(lang);
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
            handleLanguage={handleSourceLang}
            onChangeLang={handleSourceLang}
          />
          <TextArea
            value={input}
            maxLength={MAX_LENGTH}
            onChange={setInput}
            onHeightChange={setInputHeight}
          />
        </Grid>
      </Grid>

      {/* OUTPUT */}
      <Grid size={(tablet ?? mobile) ? 12 : 6} className="translate-box">
        <LanguageBar
          mobile={mobile}
          lang={target}
          handleLanguage={handleTargetLang}
          onChangeLang={handleTargetLang}
        />
        <TextTranslated
          isError={isError}
          isPending={isPending}
          value={data?.responseData.translatedText}
          height={inputHeight}
        />
      </Grid>
    </Grid>
  );
};
