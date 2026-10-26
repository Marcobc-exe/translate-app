import "./translator.css";
import { useCallback, useState } from "react";
import type { Language } from "../../types/languages";
import { Panel } from "../../shared/components/Panel/Panel";
import { useDebounce } from "../../shared/hooks/useDebounce";
import { normalizeText } from "../../shared/utils/text";
import { LanguageBar } from "./components/LanguageBar/LanguageBar";
import { SourceInput } from "./components/SourceInput/SourceInput";
import { TranslationOutput } from "./components/TranslationOutput/TranslationOutput";
import { useLanguagePair } from "./hooks/useLanguagePair";
import { useRecentLanguages } from "./hooks/useRecentLanguages";
import { useTranslate } from "./hooks/useTranslate";

const MAX_LENGTH = 250;
const DEBOUNCE_MS = 500;

export const Translator = () => {
  const { source, target, setSource, setTarget } = useLanguagePair();
  const { recent, remember } = useRecentLanguages();
  const [input, setInput] = useState("");

  const text = normalizeText(input);
  const query = useDebounce(text, DEBOUNCE_MS);
  const { data, error, isFetching } = useTranslate({
    text: query,
    source: source.code,
    target: target.code,
  });

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

  return (
    <main className="translator">
      <Panel
        label="Source text"
        header={
          <LanguageBar value={source} recent={recent} onChange={handleSource} />
        }
      >
        <SourceInput value={input} maxLength={MAX_LENGTH} onChange={setInput} />
      </Panel>

      <Panel
        label="Translation"
        header={
          <LanguageBar value={target} recent={recent} onChange={handleTarget} />
        }
      >
        <TranslationOutput
          value={text ? data : undefined}
          isLoading={!!text && isFetching}
          error={text ? error : null}
        />
      </Panel>
    </main>
  );
};
