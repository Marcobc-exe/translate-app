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
  const ref = useRef<HTMLDivElement>(null);

  const handleSelect = (language: Language) => {
    onChangeLang(language);
    setOpen(false);
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
    <div className="custom-select" ref={ref}>
      <button className="select-button" onClick={() => setOpen(!open)}>
        {mobile && lang.label}
        <span className={`arrow ${open ? "rotate" : ""}`}>▼</span>
      </button>

      {open && (
        <div className="dropdown">
          {ALLLANGUAGES.map((language) => (
            <div
              key={language.code}
              className={`option ${
                language.code === lang.code ? "active" : ""
              }`}
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
