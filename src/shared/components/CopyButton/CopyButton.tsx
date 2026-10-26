import "./copyButton.css";
import { useEffect, useState, type FC } from "react";

type Props = {
  text: string;
  label?: string;
};

const FEEDBACK_MS = 1500;

export const CopyButton: FC<Props> = ({ text, label = "Copy" }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), FEEDBACK_MS);
    return () => clearTimeout(timer);
  }, [copied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      // Clipboard denied (insecure context or permissions): nothing to copy to
    }
  };

  return (
    <>
      <button
        type="button"
        className={`btn-copy ${copied ? "is-copied" : ""}`}
        disabled={!text}
        onClick={handleCopy}
      >
        <span aria-hidden="true">{copied ? "✓" : "⧉"}</span>
        {copied ? "Copied!" : label}
      </button>
      <span className="sr-only" role="status">
        {copied ? "Copied to clipboard" : ""}
      </span>
    </>
  );
};
