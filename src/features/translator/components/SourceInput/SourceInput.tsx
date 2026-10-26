import "./sourceInput.css";
import {
  useLayoutEffect,
  useRef,
  type ChangeEvent,
  type FC,
  type KeyboardEvent,
} from "react";
import type { LanguageCode } from "../../../../types/languages";

type Props = {
  id: string;
  lang: LanguageCode;
  value: string;
  maxLength: number;
  describedBy?: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
};

export const SourceInput: FC<Props> = ({
  id,
  lang,
  value,
  maxLength,
  describedBy,
  onChange,
  onSubmit,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Auto-grow on every value change (typing, clearing, programmatic updates)
  // and whenever its width changes (the text re-wraps)
  useLayoutEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    let width = textarea.clientWidth;
    const fit = () => {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    };
    fit();

    const observer = new ResizeObserver(() => {
      if (textarea.clientWidth === width) return;
      width = textarea.clientWidth;
      fit();
    });
    observer.observe(textarea);
    return () => observer.disconnect();
  }, [value]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  // Ctrl/Cmd + Enter translates immediately, skipping the debounce
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      onSubmit();
    }
  };

  const handleClear = () => {
    onChange("");
    textareaRef.current?.focus();
  };

  return (
    <div className="input-wrapper">
      <textarea
        id={id}
        ref={textareaRef}
        lang={lang}
        className="input-base"
        placeholder="Translate something..."
        aria-label="Text to translate"
        aria-describedby={describedBy}
        autoFocus
        maxLength={maxLength}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <button
        type="button"
        className={`btn-clearinput ${value ? "visible" : ""}`}
        aria-label="Clear text"
        onClick={handleClear}
      >
        <span aria-hidden="true">✕</span>
      </button>
    </div>
  );
};

type CounterProps = {
  id: string;
  length: number;
  maxLength: number;
};

export const CharCounter: FC<CounterProps> = ({ id, length, maxLength }) => (
  <div
    id={id}
    className={`char-counter ${length ? "visible" : ""} ${
      length >= maxLength ? "max-char" : ""
    }`}
  >
    {length}/{maxLength}
    <span className="sr-only"> characters</span>
  </div>
);
