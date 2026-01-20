import "./buttons.css"
import { Grid } from "@mui/material";
import type { FC } from "react";

type Props = {
  isPending: boolean;
  onClickTranslate: () => void;
};

export const BtnTranslate: FC<Props> = ({ isPending, onClickTranslate }) => {
  return (
    <Grid size={3} height={"40px"}>
      <button className="btnTranslate" onClick={onClickTranslate} disabled={isPending}>
        Translate
      </button>
    </Grid>
  );
};
