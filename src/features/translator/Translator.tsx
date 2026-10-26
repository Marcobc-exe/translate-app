import "./translator.css";
import { useCallback, useState } from "react";
import type { Language } from "../../types/languages";
import { CopyButton } from "../../shared/components/CopyButton/CopyButton";
import { Panel } from "../../shared/components/Panel/Panel";
import { useDebounce } from "../../shared/hooks/useDebounce";
import { normalizeText } from "../../shared/utils/text";
import { LanguageBar } from "./components/LanguageBar/LanguageBar";
import { CharCounter, SourceInput } from "./components/SourceInput/SourceInput";
import { TranslationOutput } from "./components/TranslationOutput/TranslationOutput";
import { useLanguagePair } from "./hooks/useLanguagePair";
import { useRecentLanguages } from "./hooks/useRecentLanguages";
import { useTranslate } from "./hooks/useTranslate";

const MAX_LENGTH = 250;
const DEBOUNCE_MS = 500;
const INPUT_ID = "source-text";
const OUTPUT_ID = "translated-text";
const COUNTER_ID = "source-counter";

export const Translator = () => {
  const { source, target, setSource, setTarget, swap } = useLanguagePair();
  const { recent, remember } = useRecentLanguages();
  const [input, setInput] = useState("");
  const [submitted, setSubmitted] = useState("");

  const text = normalizeText(input);
  const debounced = useDebounce(text, DEBOUNCE_MS);
  // Ctrl+Enter submits the current text right away instead of waiting
  const query = submitted === text ? text : debounced;

  const { data, error, isFetching, refetch } = useTranslate({
    text: query,
    source: source.code,
    target: target.code,
  });

  // While debouncing, the shown translation belongs to older text
  const isLoading = !!text && (isFetching || query !== text);
  const translation = text && !error ? data : undefined;

  const handleSource = useCallback(
    (lang: Language) => {
      remember(lang);
      setSource(lang);
    },
    [remember, setSource],
  );

  const handleTarget = useCallback(
    (lang: Language) => {
      remember(lang);
      setTarget(lang);
    },
    [remember, setTarget],
  );

  const handleRetry = useCallback(() => {
    refetch();
  }, [refetch]);

  const handleSwap = () => {
    swap();
    if (translation && !isLoading) setInput(translation.slice(0, MAX_LENGTH));
  };

  return (
    <main className="translator">
      <Panel
        label="Source text"
        header={
          <LanguageBar
            label="Source language"
            controls={INPUT_ID}
            value={source}
            recent={recent}
            onChange={handleSource}
          />
        }
        footer={
          <CharCounter
            id={COUNTER_ID}
            length={input.length}
            maxLength={MAX_LENGTH}
          />
        }
      >
        <SourceInput
          id={INPUT_ID}
          lang={source.code}
          value={input}
          maxLength={MAX_LENGTH}
          describedBy={COUNTER_ID}
          onChange={setInput}
          onSubmit={() => setSubmitted(text)}
        />
      </Panel>

      <button
        type="button"
        className="btn-swap"
        aria-label={`Swap languages (${source.label} and ${target.label})`}
        title="Swap languages"
        onClick={handleSwap}
      >
        <span aria-hidden="true">⇄</span>
      </button>

      <Panel
        label="Translation"
        header={
          <LanguageBar
            label="Target language"
            controls={OUTPUT_ID}
            value={target}
            recent={recent}
            onChange={handleTarget}
          />
        }
        footer={<CopyButton text={translation ?? ""} />}
      >
        <TranslationOutput
          id={OUTPUT_ID}
          lang={target.code}
          value={translation}
          isLoading={isLoading}
          error={text ? error : null}
          onRetry={handleRetry}
        />
      </Panel>
    </main>
  );
};
