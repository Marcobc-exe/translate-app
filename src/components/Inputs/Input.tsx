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

  return (
    <Grid size={6} width={"100%"}>
      <textarea
        ref={textareaRef}
        className="input-base"
        placeholder="Translate something..."
        autoFocus
        maxLength={maxLength}
        value={value}
        onChange={handleChange}
      />
      <div className="char-counter">
        {value.length}/{maxLength}
      </div>
    </Grid>
  );
};
