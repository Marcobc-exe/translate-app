import "./buttons.css";
import type { FC } from "react";
import type { Language } from "../../types/languages";

type Props = {
  source?: Language;
  target?: Language;
  handleLanguage: (lang: Language) => void;
};

export const BtnDefaultLanguage: FC<Props> = ({
  source,
  target,
  handleLanguage,
}) => {
  const handleOnClick = () => {
    if (source) return handleLanguage(source);
    if (target) handleLanguage(target);
  };

  return (
    <button
      className="btn-default-language"
      onClick={handleOnClick}
    >
      {source?.label ?? target?.label}
    </button>
  );
};
