import "./input.css"
import { Grid } from "@mui/material";
import type { ChangeEvent, FC } from "react";

type Props = {
  handleOnChangeInput: (value: ChangeEvent<HTMLInputElement>) => void;
};

export const Input: FC<Props> = ({ handleOnChangeInput }) => {
  return (
    <Grid size={6} width={'100%'}>
      <input
        type="text"
        className="input-base"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleOnChangeInput(e)
        }
      />
    </Grid>
  );
};
