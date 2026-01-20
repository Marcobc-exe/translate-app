import "./selects.css";
import type { ChangeEvent, FC } from "react";
import { LANGUAGES } from "../../consts/Languages";
import { Grid } from "@mui/material";

type PropsSource = {
  source: string;
  handleSourceChange: (langCode: string) => void;
};

export const SelectSourceLan: FC<PropsSource> = ({
  source,
  handleSourceChange,
}) => {
  return (
    <Grid
      container
      spacing={2}
      height={"40px"}
      marginBottom={"10px"}
      borderBottom={"1px solid #4D5562"}
    >
      <select value={source} className="select-base">
        {LANGUAGES.map((lang) => (
          <option
            key={lang.code}
            className="langOption"
            value={lang.code}
            onClick={() => handleSourceChange(lang.code)}
          >
            {lang.label}
          </option>
        ))}
      </select>
    </Grid>
  );
};

type PropsTarget = {
  target: string;
  handleTargetChange: (e: string) => void;
};

export const SelectTargetLan: FC<PropsTarget> = ({
  target,
  handleTargetChange,
}) => {
  return (
    <Grid
      container
      spacing={2}
      height={"40px"}
      marginBottom={"10px"}
      borderBottom={"1px solid #4D5562"}
    >
      <select
        value={target}
        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
          handleTargetChange(e.target.value)
        }
        className="select-base"
      >
        {LANGUAGES.map((lang) => (
          <option key={lang.code} value={lang.code} className="langOption">
            {lang.label}
          </option>
        ))}
      </select>
    </Grid>
  );
};
