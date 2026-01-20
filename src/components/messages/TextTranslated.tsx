import "./styles-messages.css"
import { useEffect, useRef, type FC } from "react";
import { Grid } from "@mui/material";

type Props = {
  value: string | undefined;
  height?: number;
};

export const OutPutTextArea: FC<Props> = ({ value, height }) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  useEffect(() => {
    if (textareaRef.current && height) {
      textareaRef.current.style.height = `${height}px`;
    }
  }, [height]);

  return (
    <Grid size={6} width={"100%"}>
      <textarea
        ref={textareaRef}
        className="output-base"
        value={value}
        readOnly
      />
    </Grid>
  )
};
