import "./sourceInput.css";
import { useLayoutEffect, useRef, type ChangeEvent, type FC } from "react";

type Props = {
  value: string;
  maxLength: number;
  onChange: (value: string) => void;
};

export const SourceInput: FC<Props> = ({
  value,
  maxLength,
  onChange,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Auto-grow on every value change (typing, clearing, programmatic updates)
  useLayoutEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [value]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const handleClear = () => {
    onChange("");
    textareaRef.current?.focus();
  };

  return (
    <>
      <div className="input-wrapper">
        <textarea
          ref={textareaRef}
          className="input-base"
          placeholder="Translate something..."
          autoFocus
          maxLength={maxLength}
          value={value}
          onChange={handleChange}
        />
        <button
          className={`btn-clearinput ${value ? "visible" : ""}`}
          onClick={handleClear}
        >
          ✕
        </button>
      </div>

      <div
        className={`char-counter ${value ? "visible" : ""} ${maxLength == value.length ? "max-char" : ""}`}
      >
        {value.length}/{maxLength}
      </div>
    </>
  );
};
