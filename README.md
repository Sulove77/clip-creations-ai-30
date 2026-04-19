# Modular No-Code Portfolio Template

This project is set up for teaching beginners. Students should mostly edit one file: `src/content/portfolio.config.ts`.

## Student Workflow (Edit Only Here)
1. Open `src/content/portfolio.config.ts`.
2. Update text, links, and images.
3. Reorder or remove sections by editing the `blocks` array.
4. Keep each block `id` and `type` stable.
5. Save and refresh the app.

If the app shows a config error table, fix the listed field path in `portfolio.config.ts`.

## Block Catalog
- `hero`: Intro heading, CTAs, hero image
- `about`: Profile image, paragraphs, stat cards
- `skills`: Skill list with progress bars
- `services`: Service cards (icon, title, description)
- `experience`: Timeline entries
- `contact`: Contact details + contact form
- `footer`: Social links + copyright

## Contact Form (Google SMTP)
The contact form posts to `POST /api/contact`.

Note for GitHub Pages: GitHub Pages is static hosting, so `POST /api/contact` will not run there.
To make the contact form work on a GitHub Pages frontend, point it to a deployed API endpoint
(for example on Vercel) by setting:
- `VITE_CONTACT_ENDPOINT=https://your-vercel-app.vercel.app/api/contact`

Set environment variables before running:
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`

The confirmation email recipient is read from the submitted contact form email field.

For Vercel deployments, set these env vars for both Preview and Production environments,
then redeploy after any change.

You can start by copying `.env.example` into your local `.env`.

Recommended Gmail setup:
- Use `smtp.gmail.com`
- Use port `465` (SSL) or `587` (TLS)
- Use a Gmail App Password, not your normal account password
- If copied with spaces (example format: `abcd efgh ijkl mnop`), it is accepted.

## Troubleshooting
| Problem | Likely Cause | Fix |
| --- | --- | --- |
| Config error panel appears | Schema validation failed | Correct the field shown in the error table |
| Contact form returns error | Missing/invalid SMTP env vars | Set all required SMTP variables |
| Contact form sends but no email received | Submitted email is wrong or filtered | Verify the entered email address and spam folder |
| Too many requests error | Rate limiter triggered | Wait 10 minutes and retry |
| A section is missing | Block removed from `blocks` array | Add the block back with a valid `type` |

## Reference Template
See `src/content/portfolio.example.ts` for a clean starter dataset.
