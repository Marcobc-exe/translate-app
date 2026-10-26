import "./styles-messages.css";
import type { FC } from "react";
import { Grid } from "@mui/material";

type Props = {
  value: string | undefined;
  isPending: boolean;
  isError: boolean;
};

export const TextTranslated: FC<Props> = ({ value, isPending, isError }) => {
  let displayText = value ?? "";

  if (isPending) displayText = "Translating...";
  if (isError) displayText = "Error translating text";

  return (
    <Grid width={"100%"}>
      <div className="output-base">{displayText}</div>
    </Grid>
  );
};
