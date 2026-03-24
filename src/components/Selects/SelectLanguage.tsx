import "./selects.css";
import { useEffect, useRef, useState, type FC } from "react";
import type { Language } from "../../types/languages";
import { ALLLANGUAGES } from "../../consts/Languages";

type Props = {
  mobile: boolean;
  lang: Language;
  onChangeLang: (lang: Language) => void;
};

export const SelectLanguage: FC<Props> = ({ onChangeLang, mobile, lang }) => {
  const [open, setOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const handleSelect = (language: Language) => {
    onChangeLang(language);
    setOpen(false);
  };

  // Navigation with arrows keys function
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!open && e.key === "Enter") {
      e.preventDefault();
      return setOpen(true);
    }
    if (e.key === "Escape") return setOpen(false);

    if (e.key === "Enter") {
      e.preventDefault();
      handleSelect(ALLLANGUAGES[focusedIndex]);
      setOpen(false);
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      return setFocusedIndex((prev) =>
        prev === ALLLANGUAGES.length - 1 ? 0 : prev + 1,
      );
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      return setFocusedIndex((prev) =>
        prev === 0 - 1 ? ALLLANGUAGES.length : prev - 1,
      );
    }
  };

  // Close if clicked out
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <div
      className="custom-select"
      ref={ref}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <button className="select-button" onClick={() => setOpen(!open)}>
        {mobile && lang.label}
        <span
          className={`arrow ${open ? "rotate" : ""} ${mobile ? "mobile" : ""}`}
        >
          ▼
        </span>
      </button>

      {open && (
        <div className="dropdown">
          {ALLLANGUAGES.map((language, index) => (
            <div
              key={language.code}
              className={`option ${
                language.code === lang.code ? "active" : ""
              } ${index === focusedIndex ? "focused" : ""}`}
              onClick={() => handleSelect(language)}
            >
              {language.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
