import "./styles-messages.css";
import type { FC } from "react";
import { Grid } from "@mui/material";
import { getErrorMessage } from "../../api/errors";

type Props = {
  value: string | undefined;
  isLoading: boolean;
  error: Error | null;
};

export const TextTranslated: FC<Props> = ({ value, isLoading, error }) => {
  let displayText = value ?? "";

  if (isLoading) displayText = "Translating...";
  if (error) displayText = getErrorMessage(error);

  return (
    <Grid width={"100%"}>
      <div className="output-base">{displayText}</div>
    </Grid>
  );
};
