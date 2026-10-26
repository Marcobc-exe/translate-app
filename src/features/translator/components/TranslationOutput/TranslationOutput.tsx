import "./translationOutput.css";
import { memo } from "react";
import type { LanguageCode } from "../../../../types/languages";
import { getErrorMessage, TranslationError } from "../../../../api/errors";

type Props = {
  id: string;
  lang: LanguageCode;
  value: string | undefined;
  isLoading: boolean;
  error: Error | null;
  onRetry: () => void;
};

const Skeleton = () => (
  <div className="skeleton" aria-hidden="true">
    <span />
    <span />
    <span />
  </div>
);

export const TranslationOutput = memo(
  ({ id, lang, value, isLoading, error, onRetry }: Props) => {
    const renderContent = () => {
      if (error) {
        const retryable = !(error instanceof TranslationError) || error.retryable;
        return (
          <div className="output-error" role="alert">
            <span>{getErrorMessage(error)}</span>
            {retryable && (
              <button type="button" className="btn-retry" onClick={onRetry}>
                Retry
              </button>
            )}
          </div>
        );
      }
      // Keep the previous translation visible (dimmed) while the next one loads
      if (value) return <p className={isLoading ? "is-stale" : ""}>{value}</p>;
      if (isLoading) return <Skeleton />;
      return <p className="output-placeholder">Translation</p>;
    };

    return (
      <div
        id={id}
        className="output-base"
        lang={lang}
        aria-live="polite"
        aria-busy={isLoading}
      >
        {renderContent()}
      </div>
    );
  },
);
