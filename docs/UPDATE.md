# Psychology study update

## Added
- Advanced Cognitive Psychology: all five syllabus units, 32 topic groups.
- Quantitative Research Methods: all five syllabus units, 30 topic groups.
- 62 original concise explanations, simplified summaries, recognition checks, flashcards and indicative exam outlines integrated into existing study tools.
- Syllabus map with per-topic source suggestions and explicit course-specific gaps.
- Illustrated dashboard, accessible reduced-motion support, card and progress transitions, focus timer.
- Interactive Stroop demonstration, experimental-design explorer and mixed-method sequence explorer.
- Tutor retrieval across original content plus 574 bounded passages extracted from selected pages of supplied PDFs. Follow-up retrieval includes earlier user questions. Source cards distinguish file-page indices from printed textbook pages.
- Teaching, Socratic, quiz and exam styles; request validation and safe provider-error messages.

## Scope and limits
The new material is a concise study guide, NOT exhaustive textbook coverage. Recognition checks are a starting point; the same pool is used for checks and unit assessments, so results are not independent mastery estimates. Practice answers are indicative outlines, not official marking schemes. The course-outcome/program-outcome matrix had no numeric mappings; none were fabricated.

Source suggestions were located by keyword. They are reading leads, not manually verified claim-by-claim citations. Selected original PDF text is indexed server-side for the tutor; the complete books are not included in this ZIP. Uncited study notes use a zero sentinel internally, rendered as a study-note label rather than a fictitious page number.

DICE terminology/source, the intended Vedic five-level and Buddhist models and the APA edition require lecturer confirmation. Notes explicitly flag these ambiguities. Some other topic groups combine several syllabus phrases; consult the syllabus alongside the map.

Higgsfield generation was attempted but rejected: “Requires basic plan or higher.” The included conceptual SVG is custom code, not Higgsfield output. All motion is native CSS; no generated video is included.

## Run and deploy
Run `npm ci`, then `npm run dev`. Production check: `npm run build`. Content checks: `node tests/content.mjs`.

For Vercel choose **Next.js** as Framework Preset, set Build Command to `npm run build`, and leave Output Directory at its Next.js default (do not force `public`). If the repository contains the outer `psychology-study` folder, choose it as Root Directory.

Add server-side `ANTHROPIC_API_KEY` and `ANTHROPIC_MODEL` using a model available to your account, then redeploy. Never use a NEXT_PUBLIC prefix for the API key. Existing optional progress-sync configuration is unchanged. No Supabase schema changes were made.

Live tutor responses have not been verified without credentials; missing-key and invalid-request paths can be checked locally. In-memory keyword retrieval is intended for this course-sized corpus; it is not full-book semantic search. The focus timer is session-only and resets on navigation/reload.
