import "./input.css";
import { Grid } from "@mui/material";
import { useRef, type ChangeEvent, type FC } from "react";

type Props = {
  value: string;
  maxLength: number;
  onChange: (value: string) => void;
  onHeightChange?: (height: number) => void;
};

export const TextArea: FC<Props> = ({
  value,
  maxLength,
  onChange,
  onHeightChange,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    onChange(newValue);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      onHeightChange?.(textareaRef.current.scrollHeight);
    }
  };

  const handleClear = () => {
    onChange("");
    textareaRef.current?.focus();
  };

  return (
    <Grid size={6} width={"100%"}>
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

      <div className="char-counter">
        {value.length}/{maxLength}
      </div>
    </Grid>
  );
};
