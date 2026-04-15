# AGENTS.md

Guidance for Codex agents and contributors working in this repository.

## Read First
- Read this file before making any change.
- Keep changes minimal and task-focused.
- Do not refactor unrelated code.
- Do not rename, reformat, or reorder files unless required by the user request.

## Project Intent
- This is a beginner-friendly portfolio template.
- Students are expected to mainly edit: `src/content/portfolio.config.ts`.
- Preserve that learning flow unless the task explicitly asks for structural changes.

## Targeted Edit Playbook
- Default to targeted edits in `src/content/portfolio.config.ts` before touching component files.
- Use the quick-edit constants near the top of `src/content/portfolio.config.ts` first:
	- `profile`: name, role, location, email, linkedin, social handle.
	- `socialLinks`: public profile URLs.
	- `themeColors`: global palette tokens.
- Edit sections by request type:
	- Personal info updates: `profile`, `site`, `person`, `seo.author`, hero `headingHighlight`.
	- Contact/social updates: `profile.email`, `profile.linkedin`, `socialLinks`, contact block `contactItems`, footer `socialLinks`.
	- Color/theme updates: `themeColors` first, then `src/styles.css` only if utility gradients/glows need hue alignment.
	- Section text/content updates: only the matching object in `blocks` (keep each block `id` and `type` unchanged).
- Avoid broad rewrites of all blocks when the user asks for a narrow change.
- If uncertain, prefer a small, reversible config diff and report assumptions.

## Safe Change Rules
- Edit only files needed to complete the request.
- Prefer the smallest diff that solves the problem.
- Keep existing behavior intact unless a behavior change is explicitly requested.
- Avoid introducing new dependencies unless required.
- Avoid broad style-only edits.

## Contact/SMTP Rules
- Contact API route: `src/routes/api/contact.ts`.
- Keep SMTP credentials and destination values environment-driven.
- Do not hard-code brand/person names when config values already exist.
- Prefer config-driven values from `src/content/portfolio.config.ts` when composing user-facing messages.

## Validation Before Finish
- Run targeted checks when possible (typecheck/tests relevant to touched files).
- If existing unrelated errors block full verification, report them clearly and do not modify unrelated code just to make checks pass.

## Communication Expectations
- State assumptions briefly when requirements are ambiguous.
- If a requested change could affect unrelated areas, pause and ask before expanding scope.

## Out of Scope (Unless Asked)
- Full redesigns
- Large refactors
- Dependency migrations
- Renaming public content schema fields

When in doubt: choose the smaller, reversible change.
