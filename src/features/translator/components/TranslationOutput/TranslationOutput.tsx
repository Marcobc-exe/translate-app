import "./translationOutput.css";
import { memo } from "react";
import { getErrorMessage } from "../../../../api/errors";

type Props = {
  value: string | undefined;
  isLoading: boolean;
  error: Error | null;
};

export const TranslationOutput = memo(({ value, isLoading, error }: Props) => {
  let displayText = value ?? "";

  if (isLoading) displayText = "Translating...";
  if (error) displayText = getErrorMessage(error);

  return (
    <div className="output-base">{displayText}</div>
  );
});
