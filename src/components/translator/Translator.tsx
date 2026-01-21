import { useEffect, useState } from "react";
import { useTranslate } from "../../hooks/useTranslate";
import { TextArea } from "../Inputs/Input";
import { OutPutTextArea } from "../messages/TextTranslated";
import { TranslateMessages } from "../messages/TranslateMessages";
import { SelectSourceLan, SelectTargetLan } from "../Selects/SelectLanguage";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import { useDebounce } from "../../hooks/useDebounce";

const MAX_LENGTH = 250;

export const Translator = () => {
  const [source, setSource] = useState("en");
  const [target, setTarget] = useState("es");
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
      source: source,
      target: target,
    });
  };

  useEffect(() => {
    if (!debounceInput.trim()) return reset();
    handleTranslate(debounceInput.trim());
  }, [debounceInput, source, target]);

  return (
    <Grid
      container
      spacing={mobile ? 1 : 2}
      columns={16}
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
          padding: "18px",
          border: "2px solid #4D5562",
        }}
      >
        <Grid spacing={2}>
          <SelectSourceLan source={source} handleSourceChange={setSource} />
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
          padding: "18px",
          border: "2px solid #4D5562",
        }}
      >
        <SelectTargetLan target={target} handleTargetChange={setTarget} />
        <TranslateMessages isError={isError} isPending={isPending} />
        <OutPutTextArea
          value={data?.responseData.translatedText}
          height={inputHeight}
        />
      </Grid>
    </Grid>
  );
};
