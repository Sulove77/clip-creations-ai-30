# Effective Personalization Prompts (Minimal-Change)

Use this prefix in every prompt for best results:

Only edit `src/content/portfolio.config.ts`. Keep schema shape unchanged. Do not modify component files unless absolutely required.

## Identity

1. Update my name to <NAME>, role to <ROLE>, location to <LOCATION>, and email to <EMAIL>. Keep all other fields unchanged.
2. Replace only LinkedIn and GitHub URLs in socialLinks with <LINKEDIN_URL> and <GITHUB_URL>. Do not touch labels or section structure.
3. Change site title, seo.author, and person.name to <NAME>. Keep descriptions untouched.

## Hero Section

1. In hero block only: set heading to "<HEADING>", headingHighlight to "<HIGHLIGHT>", subheading to "<SUBHEADING>", and description to "<DESC>".
2. Update hero CTAs only: primary button text "<TEXT1>" link "<URL1>", secondary button text "<TEXT2>" link "<URL2>".
3. Replace hero image URL with <IMAGE_URL> and alt text with <ALT>. Do not change layout fields.

## About Section

1. In about block only: replace the two paragraph texts with: 1) "<PARA1>" 2) "<PARA2>".
2. Update about stats only to these label/value pairs: <STAT1>, <STAT2>, <STAT3>, <STAT4>. Keep same number of cards.
3. Change only profile image and short bio sentence in about section. Keep all other content intact.

## Skills

1. Replace skills list with exactly these items and percentages: <SKILLS_JSON>. Preserve existing field names.
2. Only update top 5 skills and leave all others unchanged.
3. Reorder skills to: <ORDER_LIST>, without changing values.

## Services

1. Replace service card titles/descriptions only with: <SERVICES_JSON>. Keep same icons and card count.
2. Update only service section heading and intro text. Leave cards untouched.
3. Remove one service card titled "<TITLE>" and keep remaining order.

## Experience

1. In experience block, replace timeline entries with: <EXPERIENCE_JSON>. Preserve date/title/company/description schema.
2. Update only the current role entry (first item) with this content: <ENTRY_JSON>.
3. Keep dates as-is, but rewrite descriptions to be outcome-focused and concise.

## Contact + Footer

1. Update contact items only: email "<EMAIL>", location "<LOCATION>", LinkedIn "<URL>". Keep labels and icons unchanged.
2. Change footer copyright to "<TEXT>" and update only footer social links.
3. Make contact form heading and helper text more professional, without changing API fields.

## Theme / Colors (Minimal-risk)

1. Update themeColors tokens only in `src/content/portfolio.config.ts` to this palette: <TOKENS_JSON>. Do not edit CSS files.
2. Apply a teal-and-slate palette using existing token keys only; do not add new keys.
3. Adjust only primary, accent, and background tokens for better contrast; keep all other tokens unchanged.

## Structural Safety Prompts

1. Personalize content but do not change block ids, block types, or schema keys.
2. Keep the blocks array order exactly the same; text/link updates only.
3. Validate config compatibility and avoid any edits outside `src/content/portfolio.config.ts`.

## Batch Prompt (Most Effective)

1. Personalize this portfolio in one pass with minimal edits:

Name: <NAME>  
Role: <ROLE>  
Location: <LOCATION>  
Email: <EMAIL>  
LinkedIn: <URL>  
GitHub: <URL>  
Hero heading: <TEXT>  
Hero subheading: <TEXT>  
About paragraphs: <P1>, <P2>  
Skills: <SKILLS_JSON>  
Services: <SERVICES_JSON>  
Experience: <EXPERIENCE_JSON>  
Theme tokens: <TOKENS_JSON>  
Constraints: edit only `src/content/portfolio.config.ts`, keep block ids/types unchanged, no component refactors.
