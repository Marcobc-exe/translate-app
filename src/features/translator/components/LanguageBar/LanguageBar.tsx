import "./languageBar.css";
import { memo } from "react";
import type { Language } from "../../../../types/languages";
import { LanguageSelect } from "../LanguageSelect/LanguageSelect";

type Props = {
  value: Language;
  recent: Language[];
  onChange: (lang: Language) => void;
};

// Memoized: typing in the textarea doesn't re-render the language bars
export const LanguageBar = memo(({ value, recent, onChange }: Props) => {
  // Keep the order stable; only append the active language if it isn't listed
  const tabs = recent.some((lang) => lang.code === value.code)
    ? recent
    : [...recent, value];

  return (
    <div className="language-bar">
      <div className="language-tabs">
        {tabs.map((lang) => (
          <button
            key={lang.code}
            type="button"
            className={`language-tab ${lang.code === value.code ? "is-active" : ""}`}
            onClick={() => onChange(lang)}
          >
            {lang.label}
          </button>
        ))}
      </div>
      <LanguageSelect value={value} onChange={onChange} />
    </div>
  );
});
