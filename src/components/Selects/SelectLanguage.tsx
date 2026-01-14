import type { ChangeEvent, FC } from "react";
import { LANGUAGES } from "../../consts/Languages";

type PropsSource = {
  source: string;
  handleSourceChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};

export const SelectSourceLan: FC<PropsSource> = ({
  source,
  handleSourceChange,
}) => {
  return (
    <select value={source} onChange={handleSourceChange}>
      {LANGUAGES.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.label}
        </option>
      ))}
    </select>
  );
};

type PropsTarget = {
  target: string;
  handleTargetChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};

export const SelectTargetLan: FC<PropsTarget> = ({
  target,
  handleTargetChange,
}) => {
  return (
    <select value={target} onChange={handleTargetChange}>
      {LANGUAGES.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.label}
        </option>
      ))}
    </select>
  );
};
