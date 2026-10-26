/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Optional contact email: raises MyMemory's free quota from 5k to 50k chars/day */
  readonly VITE_MYMEMORY_EMAIL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
