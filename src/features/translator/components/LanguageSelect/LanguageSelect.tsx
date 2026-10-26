import "./languageSelect.css";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type FC,
  type KeyboardEvent,
} from "react";
import type { Language } from "../../../../types/languages";
import { ALLLANGUAGES } from "../../../../consts/Languages";

type Props = {
  label: string;
  value: Language;
  onChange: (lang: Language) => void;
};

const LAST = ALLLANGUAGES.length - 1;

// Select-only combobox (WAI-ARIA listbox pattern): a single tab stop, focus
// moves into the list while open and returns to the button on close.
export const LanguageSelect: FC<Props> = ({ label, value, onChange }) => {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const id = useId();
  const listId = `${id}-list`;
  const optionId = (index: number) => `${id}-option-${index}`;

  const openList = () => {
    const selected = ALLLANGUAGES.findIndex((lang) => lang.code === value.code);
    setActiveIndex(Math.max(selected, 0));
    setOpen(true);
  };

  const close = (returnFocus = true) => {
    setOpen(false);
    if (returnFocus) buttonRef.current?.focus();
  };

  const select = (lang: Language) => {
    onChange(lang);
    close();
  };

  useEffect(() => {
    if (open) listRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    document
      .getElementById(optionId(activeIndex))
      ?.scrollIntoView({ block: "nearest" });
  });

  // Close when interacting outside; only listens while open
  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open]);

  const handleButtonKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      openList();
    }
  };

  const handleListKeyDown = (e: KeyboardEvent<HTMLUListElement>) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        return setActiveIndex((prev) => (prev === LAST ? 0 : prev + 1));
      case "ArrowUp":
        e.preventDefault();
        return setActiveIndex((prev) => (prev === 0 ? LAST : prev - 1));
      case "Home":
        e.preventDefault();
        return setActiveIndex(0);
      case "End":
        e.preventDefault();
        return setActiveIndex(LAST);
      case "Enter":
      case " ":
        e.preventDefault();
        return select(ALLLANGUAGES[activeIndex]);
      case "Escape":
        e.preventDefault();
        return close();
      case "Tab":
        return close(false);
    }
  };

  return (
    <div className="language-select" ref={rootRef}>
      <button
        ref={buttonRef}
        type="button"
        className="select-button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-label={`${label}: ${value.label}. All languages`}
        onClick={() => (open ? close(false) : openList())}
        onKeyDown={handleButtonKeyDown}
      >
        <span className="select-label">{value.label}</span>
        <span className={`arrow ${open ? "rotate" : ""}`} aria-hidden="true">
          ▼
        </span>
      </button>

      {open && (
        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          tabIndex={-1}
          aria-label={label}
          aria-activedescendant={optionId(activeIndex)}
          className="dropdown"
          onKeyDown={handleListKeyDown}
        >
          {ALLLANGUAGES.map((lang, index) => {
            const selected = lang.code === value.code;
            return (
              <li
                key={lang.code}
                id={optionId(index)}
                role="option"
                aria-selected={selected}
                className={`option ${selected ? "active" : ""} ${
                  index === activeIndex ? "focused" : ""
                }`}
                onClick={() => select(lang)}
                onMouseMove={() => setActiveIndex(index)}
              >
                {lang.label}
                {selected && <span aria-hidden="true">✓</span>}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
