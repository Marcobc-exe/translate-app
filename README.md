<div align="center">

<img src="public/translate.svg" alt="Translate App logo" width="72" height="72" />

# Translate App

**A fast, accessible text translator built with React 19, TypeScript and TanStack Query.**

Debounced, cached and cancellable requests keep a free translation API well within its quota, while a keyboard-friendly, WAI-ARIA compliant UI keeps it usable for everyone.

<a href="https://Marcobc-exe.github.io/translate-app">
  <img src="https://img.shields.io/badge/Live_Demo-Open_App-2563eb?style=for-the-badge&logo=githubpages&logoColor=white" alt="Live Demo" />
</a>

<br /><br />

![React](https://img.shields.io/badge/React-19-149eca?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646cff?logo=vite&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-5-ff4154?logo=reactquery&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-1.13-5a29e4?logo=axios&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-9-4b32c3?logo=eslint&logoColor=white)

</div>

---

## Table of Contents

- [Screenshots](#screenshots)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Engineering Highlights](#engineering-highlights)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Deployment](#deployment)
- [Roadmap](#roadmap)
- [Author](#author)

---

## Screenshots

<!--
  Add your captures to docs/screenshots/ and replace the placeholders below, e.g.:
  <img src="docs/screenshots/desktop.png" alt="Translate App on desktop" />
-->

| Desktop | Mobile |
| :---: | :---: |
| _Screenshot coming soon_<br />`docs/screenshots/desktop.png` | _Screenshot coming soon_<br />`docs/screenshots/mobile.png` |

---

## Features

- **Live translation as you type**: requests are debounced (500 ms), and <kbd>Ctrl</kbd>/<kbd>⌘</kbd> + <kbd>Enter</kbd> translates instantly.
- **11 languages**: English, Spanish, French, German, Portuguese, Italian, Dutch, Russian, Japanese, Korean and Chinese.
- **Quick-access language tabs**: your most recently used languages stay one click away, with the full list in a dropdown.
- **One-click swap (⇄)**: swaps the languages and moves the translation into the input.
- **Copy to clipboard** with visual and screen-reader feedback.
- **Loading skeleton**: while a new translation loads, the previous one stays visible but dimmed.
- **Clear error states** for quota limits, network failures and oversized text, with a **Retry** action where it makes sense.
- **Character counter** with a 250-character limit and visual feedback when the limit is reached.
- **Saved preferences**: the language pair and recent languages are stored in `localStorage` and survive page reloads.
- **Responsive layout**: side-by-side panels on desktop, stacked panels with a compact language picker on mobile.

---

## Tech Stack

| Category | Technology |
| --- | --- |
| UI library | [React 19](https://react.dev/) |
| Language | [TypeScript 5.9](https://www.typescriptlang.org/) (strict mode) |
| Build tool | [Vite 7](https://vite.dev/) |
| Server state & caching | [TanStack Query 5](https://tanstack.com/query/latest) |
| HTTP client | [Axios](https://axios-http.com/) |
| Translation API | [MyMemory](https://mymemory.translated.net/doc/spec.php) (free tier) |
| Styling | Plain CSS (CSS Grid, media queries, no UI framework) |
| Linting | ESLint 9 + `typescript-eslint` + `eslint-plugin-react-hooks` |
| Hosting | GitHub Pages via [`gh-pages`](https://github.com/tschaub/gh-pages) |

---

## Engineering Highlights

### Using a free API without burning the quota

| Technique | Implementation |
| --- | --- |
| **Debouncing** | `useDebounce` waits 500 ms after the last keystroke before requesting. |
| **Input normalization** | Text is trimmed and runs of spaces are collapsed *before* debouncing, so a trailing space never triggers a new request. |
| **Caching & deduplication** | `useQuery` keyed by `[source, target, text]`: translating the same text into the same language pair again returns the cached result instantly. |
| **Request cancellation** | TanStack Query's `AbortSignal` is passed to Axios, so outdated requests are cancelled as soon as the text or languages change. This prevents race conditions where a slow response overwrites a newer one. |
| **Pre-flight validation** | Empty text, identical source/target languages and queries above MyMemory's 500-byte (UTF-8) limit are rejected before any network call. |
| **Smart retries** | Only failures that may be temporary (network or API errors) are retried, at most once. Quota errors are never retried. |

### Robust error handling

MyMemory returns **HTTP 200 even for failures** and puts the real status in the response body. The API layer (`src/api/translate.api.ts`) checks `responseStatus`, detects quota exhaustion and throws a typed `TranslationError` with a code (`QUOTA_EXCEEDED`, `NETWORK`, `TOO_LONG`, …). This way users see a clear message instead of an error string displayed as if it were the translation.

### State management

- **`useLanguagePair`**: a single source of truth for the language pair. Selecting the same language on both sides swaps them instead of sending an invalid request, and both sides are always saved together.
- **`useRecentLanguages`**: one immutable list of recently used languages shared by both panels.
- **Safe storage helpers**: every `localStorage` read is guarded and validated, so corrupted data falls back to defaults instead of crashing the app.

### Performance

- Language bars and the output panel are wrapped in `React.memo` and receive stable callbacks, so typing doesn't re-render them.
- Removing the component library cut the JS bundle from **112 kB to ~89 kB gzipped**.

### Accessibility (a11y)

- Language tabs implement the **WAI-ARIA Tabs pattern**: `role="tablist"`, `aria-selected`, focus that moves with the arrow keys, and <kbd>←</kbd> <kbd>→</kbd> <kbd>Home</kbd> <kbd>End</kbd> navigation.
- The language dropdown is a **select-only combobox / listbox**: a single <kbd>Tab</kbd> stop, `aria-expanded` and `aria-activedescendant`, focus that moves into the list and returns to the button on <kbd>Esc</kbd>.
- The output is a polite **live region** (`aria-live="polite"`), and errors use `role="alert"`.
- Visible `:focus-visible` outlines, WCAG AA contrast, correct `lang` attributes on input and output, and `prefers-reduced-motion` support.

---

## Project Structure

```text
src/
├── api/
│   ├── config.ts                 # Axios instance (base URL, timeout)
│   ├── errors.ts                 # TranslationError + user-facing messages
│   └── translate.api.ts          # MyMemory request, validation & error mapping
├── consts/
│   └── Languages.ts              # Supported languages + type guards
├── features/
│   └── translator/
│       ├── Translator.tsx        # Feature container
│       ├── components/
│       │   ├── LanguageBar/      # Accessible language tabs
│       │   ├── LanguageSelect/   # Accessible listbox dropdown
│       │   ├── SourceInput/      # Auto-growing textarea + char counter
│       │   └── TranslationOutput/# Live region, skeleton, error + retry
│       └── hooks/
│           ├── useLanguagePair.ts
│           ├── useRecentLanguages.ts
│           └── useTranslate.ts   # useQuery: cache, abort, retry policy
├── shared/
│   ├── components/               # Panel, CopyButton, Title
│   ├── hooks/useDebounce.ts
│   └── utils/                    # storage.ts, text.ts
├── types/                        # Language & API response types
├── App.tsx
└── main.tsx                      # QueryClientProvider + root
```

---

## Getting Started

### Prerequisites

- **Node.js** `^20.19.0` or `>=22.12.0` (required by Vite 7)
- **npm** (comes with Node.js)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Marcobc-exe/translate-app.git
cd translate-app

# 2. Install dependencies
npm install

# 3. (Optional) Configure environment variables
cp .env.example .env.local

# 4. Start the development server
npm run dev
```

The app will be available at **http://localhost:5173/translate-app/**. The `/translate-app/` path comes from the `base` setting in `vite.config.ts`, which GitHub Pages needs.

---

## Environment Variables

The app works out of the box **without any configuration**.

| Variable | Required | Description |
| --- | :---: | --- |
| `VITE_MYMEMORY_EMAIL` | No | A valid contact email sent as MyMemory's `de` parameter. It raises the free daily quota from **5,000 to 50,000 characters**. |

Put it in `.env.local`, which git ignores via the `*.local` pattern:

```bash
VITE_MYMEMORY_EMAIL=you@example.com
```

---

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Vite development server with hot module replacement. |
| `npm run build` | Type-checks the project (`tsc -b`) and builds an optimized production bundle in `dist/`. |
| `npm run preview` | Serves the production build locally for a final check. |
| `npm run lint` | Runs ESLint across the project. |
| `npm run deploy` | Builds the app (via `predeploy`) and publishes `dist/` to the `gh-pages` branch. |

---

## Deployment

The app is deployed to **GitHub Pages**:

👉 **https://Marcobc-exe.github.io/translate-app**

To publish a new version:

```bash
npm run deploy
```

> [!NOTE]
> If you fork the project, update `homepage` in `package.json` and `base` in `vite.config.ts` to match your repository name.

---

## Roadmap

- [ ] Automatic source-language detection
- [ ] Unit and component tests (Vitest + React Testing Library)
- [ ] Text-to-speech playback for the source and the translation
- [ ] Translation history
- [ ] Right-to-left language support (e.g. Arabic, Hebrew)

---

## Author

**Marcobc-exe**: [GitHub profile](https://github.com/Marcobc-exe)

If you find this project useful, consider giving it a ⭐ on GitHub!
