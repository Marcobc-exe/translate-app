import "./languageBar.css";
import { memo, type KeyboardEvent } from "react";
import type { Language } from "../../../../types/languages";
import { LanguageSelect } from "../LanguageSelect/LanguageSelect";

type Props = {
  label: string;
  controls: string;
  value: Language;
  recent: Language[];
  onChange: (lang: Language) => void;
};

// Memoized: typing in the textarea doesn't re-render the language bars
export const LanguageBar = memo(
  ({ label, controls, value, recent, onChange }: Props) => {
    // Keep the order stable; only append the active language if it isn't listed
    const tabs = recent.some((lang) => lang.code === value.code)
      ? recent
      : [...recent, value];

    // Roving focus (WAI-ARIA tabs, manual activation): arrows move focus,
    // Enter/Space select, so browsing tabs doesn't fire translations.
    const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
      const last = tabs.length - 1;
      const next = {
        ArrowRight: index === last ? 0 : index + 1,
        ArrowLeft: index === 0 ? last : index - 1,
        Home: 0,
        End: last,
      }[e.key];
      if (next === undefined) return;

      e.preventDefault();
      const buttons =
        e.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>(
          '[role="tab"]',
        );
      buttons?.[next]?.focus();
    };

    return (
      <div className="language-bar">
        <div className="language-tabs" role="tablist" aria-label={label}>
          {tabs.map((lang, index) => {
            const selected = lang.code === value.code;
            return (
              <button
                key={lang.code}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={controls}
                tabIndex={selected ? 0 : -1}
                className="language-tab"
                onClick={() => onChange(lang)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              >
                {lang.label}
              </button>
            );
          })}
        </div>
        <LanguageSelect label={label} value={value} onChange={onChange} />
      </div>
    );
  },
);
