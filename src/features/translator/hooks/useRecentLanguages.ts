import { useCallback, useEffect, useState } from "react";
import type { Language } from "../../../types/languages";
import { findLanguage, isLanguageList, LANGUAGES } from "../../../consts/Languages";
import { readJSON, writeJSON } from "../../../shared/utils/storage";

const STORAGE_KEY = "mostUsedLanguages";
const MAX_RECENT = 3;

const readRecent = () =>
  readJSON(STORAGE_KEY, LANGUAGES, isLanguageList)
    .map((lang) => findLanguage(lang.code) ?? lang)
    .slice(0, MAX_RECENT);

// One list shared by both panels, so they never overwrite each other
export const useRecentLanguages = () => {
  const [recent, setRecent] = useState<Language[]>(readRecent);

  useEffect(() => {
    writeJSON(STORAGE_KEY, recent);
  }, [recent]);

  const remember = useCallback((lang: Language) => {
    setRecent((prev) =>
      prev.some((item) => item.code === lang.code)
        ? prev
        : [lang, ...prev].slice(0, MAX_RECENT),
    );
  }, []);

  return { recent, remember };
};
