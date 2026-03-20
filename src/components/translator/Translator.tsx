import { useEffect, useState } from "react";
import { useTranslate } from "../../hooks/useTranslate";
import { TextArea } from "../Inputs/Input";
import { OutPutTextArea } from "../messages/TextTranslated";
import { TranslateMessages } from "../messages/TranslateMessages";
import { SelectLanguage } from "../Selects/SelectLanguage";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import { useDebounce } from "../../hooks/useDebounce";
import type { Language } from "../../types/languages";
import { LANGUAGES } from "../../consts/Languages";
import { BtnDefaultLanguage } from "../buttons/BtnDefaultLanguage";

const MAX_LENGTH = 250;

export const Translator = () => {
  const [source, setSource] = useState<Language>(LANGUAGES[0]);
  const [target, setTarget] = useState<Language>(LANGUAGES[1]);
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

  const handleTranslate = (text?: string) => {
    mutate({
      text: text ?? "",
      source: source.code,
      target: target.code,
    });
  };

  /**
   * Todo functions and behaviors list about the button language:
   *
   * [x] if both sides have same language switch them - Done
   * [x] Highligth current lang btn - Doing
   * [] if click on button open select language modal
   */
  const handleLanguage = (lang: Language) => {
    if (lang.label === target.label || lang.label === source.label) {
      setSource(target);
      setTarget(source);
      return;
    }

    setSource(lang);
  };

  const handleLangRightSide = (lang: Language) => {
    if (lang.label === source.label) {
      setSource(target);
      setTarget(lang);
      return;
    }

    setTarget(lang);
  }

  /**
   * Chagne language from the language modal
   * @param lang 
   */
  const handleChangeLang = (lang: Language) => {
    if (target.code === lang.code) {
      setSource(lang)
      setTarget(source)
    } else {
      setSource(lang);
    }
  }

  useEffect(() => {
    if (!debounceInput.trim()) return reset();
    handleTranslate(debounceInput.trim());
  }, [debounceInput, source, target]);

  return (
    <Grid
      container
      spacing={mobile ? 1 : 2}
      columns={14}
      columnGap={mobile ? 1 : 2}
      sx={{
        justifyContent: "center",
      }}
    >
      {/* INPUT */}
      <Grid
        size={(tablet ?? mobile) ? 12 : 6}
        bgcolor={"#212936CC"}
        sx={{
          borderRadius: "20px",
          padding: "12px 18px",
          border: "2px solid #4D5562",
          height: "30vh"

        }}
      >
        <Grid spacing={2}>
          <SelectLanguage
            lang={source}
            handleLanguage={handleLanguage}
            onChangeLang={handleChangeLang}
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
      <Grid
        size={(tablet ?? mobile) ? 12 : 6}
        bgcolor={"#212936CC"}
        sx={{
          borderRadius: "20px",
          padding: "12px 18px",
          border: "2px solid #4D5562",
          height: "30vh"
        }}
      >
        <BtnDefaultLanguage
          lang={LANGUAGES[1]}
          langSelected={target}
          handleLanguage={handleLangRightSide}
        />
        <BtnDefaultLanguage
          lang={LANGUAGES[0]}
          langSelected={target}
          handleLanguage={handleLangRightSide}
        />
        <BtnDefaultLanguage
          lang={LANGUAGES[2]}
          langSelected={target}
          handleLanguage={handleLangRightSide}
        />
        <TranslateMessages isError={isError} isPending={isPending} />
        <OutPutTextArea
          value={data?.responseData.translatedText}
          height={inputHeight}
        />
      </Grid>
    </Grid>
  );
};
