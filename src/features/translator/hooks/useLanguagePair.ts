import { useCallback, useEffect, useState } from "react";
import type { Language } from "../../../types/languages";
import { findLanguage, isLanguage, LANGUAGES } from "../../../consts/Languages";
import { readJSON, writeJSON } from "../../../shared/utils/storage";

type LanguagePair = { source: Language; target: Language };

const SOURCE_KEY = "sourceLang";
const TARGET_KEY = "targetLang";
const DEFAULT_PAIR: LanguagePair = { source: LANGUAGES[0], target: LANGUAGES[1] };

const readLanguage = (key: string, fallback: Language) =>
  findLanguage(readJSON(key, fallback, isLanguage).code) ?? fallback;

const readPair = (): LanguagePair => {
  const source = readLanguage(SOURCE_KEY, DEFAULT_PAIR.source);
  const target = readLanguage(TARGET_KEY, DEFAULT_PAIR.target);
  return source.code === target.code ? DEFAULT_PAIR : { source, target };
};

// Single source of truth for the language pair: it can never hold the same
// language on both sides, and both sides are always persisted together.
export const useLanguagePair = () => {
  const [pair, setPair] = useState(readPair);

  useEffect(() => {
    writeJSON(SOURCE_KEY, pair.source);
    writeJSON(TARGET_KEY, pair.target);
  }, [pair]);

  const swap = useCallback(() => {
    setPair(({ source, target }) => ({ source: target, target: source }));
  }, []);

  const setSource = useCallback((lang: Language) => {
    setPair((prev) => {
      if (lang.code === prev.source.code) return prev;
      if (lang.code === prev.target.code)
        return { source: prev.target, target: prev.source };
      return { ...prev, source: lang };
    });
  }, []);

  const setTarget = useCallback((lang: Language) => {
    setPair((prev) => {
      if (lang.code === prev.target.code) return prev;
      if (lang.code === prev.source.code)
        return { source: prev.target, target: prev.source };
      return { ...prev, target: lang };
    });
  }, []);

  return { ...pair, setSource, setTarget, swap };
};
