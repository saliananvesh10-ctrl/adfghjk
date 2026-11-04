# Updated psychology study website

The November syllabus additions and question-paper workspace are ready. Use **Past-paper preparation** in the sidebar and read [the preparation guide](docs/EXAM-PREPARATION.md). New personality material is under **Theories of Personality → Additional syllabus theorists**.

Read [the update guide](docs/UPDATE.md) for added papers, coverage limits, tutor setup and Vercel settings. Set both `ANTHROPIC_API_KEY` and `ANTHROPIC_MODEL`; no default model is assumed. New notes are concise syllabus guides with separately labelled source suggestions.

# Psychology Study

Exam-prep platform for PG psychology theory papers, written from the prescribed textbooks with page references.
Next.js 15 + TypeScript + Tailwind, Supabase for auth and progress sync, Claude for the AI tutor.

## What's in it

| Section | What it does |
|---|---|
| Dashboard | Continue where you left off, progress at a glance, chapter grid |
| Subjects | Chapters grouped by approach (ready / pending) |
| Study reader | Detailed, simplified, practice and revision modes per chapter; section checks, bookmarks, highlights, page refs |
| Psychology lab | Freud's iceberg, psychosexual stages, defense-mechanism game, Jung's type builder and archetypes, research-method sorter |
| AI tutor | Answers from the written chapters with page citations (BM25 retrieval + Claude) |
| Practice & quizzes | Chapter tests (best score saved) and mixed practice |
| Flashcards | Leitner spaced repetition |
| Exam preparation | 2/5/10-mark questions, model answers, AI marking of your answer |
| Revision | One-page recap per chapter with your bookmarks and highlights; printable |
| Progress | Per-chapter analytics, sections to reread, cross-device sync |
| Source library | Source inventory, coverage matrix, copyright note |

## Content

Each chapter is one JSON file in `src/content/personality/` matching `src/content/types.ts`.
Check a chapter with:

```bash
node scripts/validate.mjs src/content/personality/ch01.json
```

To add a subject, copy the `src/content/egan/` folder pattern and list it in `src/content/index.ts`.

**Status (1 Nov 2026):**

| Paper | Textbook | Chapters written |
|---|---|---|
| Theories of Personality | Schultz & Schultz, 11th ed. | 15 / 15 |
| Introduction to Counselling | Egan, The Skilled Helper, 10th ed. | 14 / 14 |
| Introduction to Counselling | Gladding, 8th ed. | waiting for a text upload |
| Quantitative Research | Creswell, 3rd ed.; A. K. Singh | waiting for text uploads |
| Advanced Cognitive Psychology | — | no books in the course folder |

Calvin Hall's book is not used (no text layer). The new cognitive and research papers use the supplied syllabi; see docs/UPDATE.md for coverage limits.

Add a chapter: write `src/content/<subject>/chNN.json`, run `node scripts/validate.mjs <file>`, then `node scripts/register.mjs`.

## Run locally

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev
```

## Environment variables

| Name | Where to get it |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project → Settings → API |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Same page (publishable key) |
| `ANTHROPIC_API_KEY` | console.anthropic.com. Without it the tutor and answer-marking show a "not switched on" message; everything else works. |
| `ANTHROPIC_MODEL` | Required: an exact model ID available to your Anthropic account |

## Database

One table, `public.user_state` (user_id, state jsonb, updated_at), row-level security so each user reads and writes only their own row. Progress is saved in the browser first and synced when signed in (email magic link on the Progress page).

In Supabase → Authentication → URL Configuration, set the Site URL to your Vercel URL so magic links redirect correctly.

## Deploy (Vercel)

1. Push this folder to a **private** GitHub repo.
2. Vercel → Add New → Project → import the repo (framework auto-detects as Next.js).
3. Add the environment variables above, then Deploy.

## Copyright

The app contains original summaries and questions with page references, not the textbook's text. Keep the repo and deployment private.
