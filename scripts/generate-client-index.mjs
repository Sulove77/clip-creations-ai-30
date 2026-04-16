import { copyFileSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const clientDir = join(process.cwd(), "dist", "client");
const assetsDir = join(clientDir, "assets");

function normalizeBasePath(basePath) {
  const trimmed = (basePath || "/").trim();
  const withLeadingSlash = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  return withLeadingSlash.endsWith("/") ? withLeadingSlash : `${withLeadingSlash}/`;
}

const basePath = normalizeBasePath(process.env.SITE_BASE_PATH);

const assetFiles = readdirSync(assetsDir);
const cssFile = assetFiles.find((name) => /^styles-.*\.css$/.test(name));

const jsCandidates = assetFiles.filter((name) => /^index-.*\.js$/.test(name));

function isRouteComponentChunk(source) {
  return /export\{[^}]*as\s*component\}/.test(source);
}

function isBootstrapEntryChunk(source) {
  return (
    source.includes("hydrateRoot(document") ||
    source.includes("createRoot(document") ||
    source.includes("startTransition(()=>{Mb.hydrateRoot")
  );
}

function scoreJsCandidate(name) {
  const fullPath = join(assetsDir, name);
  const source = readFileSync(fullPath, "utf8");
  let score = source.length;

  // Strongly prefer the runtime bootstrap entry for hydration.
  if (isBootstrapEntryChunk(source)) {
    score += 100_000;
  }

  // Heavily de-prioritize split route chunks exported as `component`.
  if (isRouteComponentChunk(source)) {
    score -= 100_000;
  }

  // Router bootstrap chunks usually instantiate routeTree + router startup.
  if (source.includes("routeTree") && source.includes("basepath")) {
    score += 5_000;
  }

  return score;
}

const jsFile = jsCandidates
  .map((name) => ({ name, score: scoreJsCandidate(name) }))
  .sort((a, b) => b.score - a.score)[0]?.name;

if (!cssFile || !jsFile) {
  throw new Error("Could not find generated CSS/JS entry in dist/client/assets");
}

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <base href="${basePath}" />
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
    <meta http-equiv="Pragma" content="no-cache" />
    <meta http-equiv="Expires" content="0" />
    <title>Portfolio</title>
    <link rel="icon" href="${basePath}placeholder.svg" />
    <link rel="stylesheet" href="${basePath}assets/${cssFile}" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="${basePath}assets/${jsFile}"></script>
  </body>
</html>
`;

const indexHtml = join(clientDir, "index.html");
const notFoundHtml = join(clientDir, "404.html");

writeFileSync(indexHtml, html, "utf8");
copyFileSync(indexHtml, notFoundHtml);

console.log(`Generated dist/client/index.html using ${cssFile} and ${jsFile}`);
