import { Grid } from "@mui/material";
import type { FC } from "react";

type Props = {
  isPending: boolean;
  isError: boolean;
};

export const TranslateMessages: FC<Props> = ({ isError, isPending }) => {
  return (
    <Grid size={6} width={"100%"}>
      {isPending && <textarea className="output-base">Translating...</textarea>}
      {isError && (
        <textarea className="output-base">Error translating text</textarea>
      )}
    </Grid>
  );
};
