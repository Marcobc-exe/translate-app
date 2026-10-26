// localStorage can throw (private mode, quota, disabled) and hold corrupted
// values, so every access is guarded and validated before use.
export const readJSON = <T>(
  key: string,
  fallback: T,
  isValid: (value: unknown) => value is T,
): T => {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    const parsed: unknown = JSON.parse(raw);
    return isValid(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
};

export const writeJSON = (key: string, value: unknown) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage unavailable: preferences simply won't persist.
  }
};
