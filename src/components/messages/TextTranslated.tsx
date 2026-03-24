import "./styles-messages.css";
import { useEffect, useRef, type FC } from "react";
import { Grid } from "@mui/material";

type Props = {
  value: string | undefined;
  height?: number;
  isPending: boolean;
  isError: boolean;
};

export const TextTranslated: FC<Props> = ({
  value,
  height,
  isPending,
  isError,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (textareaRef.current && height) {
      textareaRef.current.style.height = `${height}px`;
    }
  }, [height]);

  let displayText = value ?? "";

  if (isPending) displayText = "Translating...";
  if (isError) displayText = "Error translating text";

  return (
    <Grid width={"100%"}>
      <textarea
        ref={textareaRef}
        className="output-base"
        value={displayText}
        readOnly
      />
    </Grid>
  );
};