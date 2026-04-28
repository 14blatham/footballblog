import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const rootDir = process.cwd();
const themeDir = join(rootDir, "ghost-theme");
const cssDir = join(themeDir, "assets", "css");
const jsDir = join(themeDir, "assets", "js");

const teamSlugs = [
  "arsenal",
  "aston-villa",
  "bournemouth",
  "brentford",
  "brighton",
  "chelsea",
  "crystal-palace",
  "everton",
  "fulham",
  "ipswich",
  "leicester",
  "liverpool",
  "man-city",
  "man-utd",
  "newcastle",
  "nottm-forest",
  "southampton",
  "spurs",
  "west-ham",
  "wolves"
];

const teamRouteMap = Object.fromEntries(teamSlugs.map((slug) => [`${slug}.html`, `/${slug}/`]));

const read = (fileName) => readFileSync(join(rootDir, fileName), "utf8");
const write = (targetPath, contents) => writeFileSync(targetPath, `${contents.trim()}\n`);

const extract = (source, regex, label) => {
  const match = source.match(regex);
  if (!match) {
    throw new Error(`Could not extract ${label}`);
  }

  return match[1];
};

const convertLinks = (markup) =>
  markup
    .replace(/href="index\.html"/g, 'href="/"')
    .replace(/href="([a-z0-9-]+)\.html"/gi, (_, slug) => `href="${teamRouteMap[`${slug}.html`] ?? `/${slug}/`}"`);

const convertTeamNav = (markup) =>
  markup
    .replace(/href="index\.html"/g, 'href="/"')
    .replace(/href="([a-z0-9-]+)\.html"/gi, (_, slug) => `href="${teamRouteMap[`${slug}.html`] ?? `/${slug}/`}"`);

const appendThemeContentStyles = (css) => `
${css.trim()}

.theme-listing {
  padding-top: 8px;
}

.theme-post-shell {
  max-width: 840px;
}

.theme-post-card {
  background:
    linear-gradient(180deg, rgba(229, 226, 225, 0.015), transparent 22%),
    var(--surface-container-low);
  border: 1px solid var(--outline-variant);
  border-radius: var(--radius-xl);
  overflow: hidden;
  position: relative;
}

.theme-post-card::before {
  content: "";
  position: absolute;
  inset: 0 0 auto 0;
  height: 1px;
  background: linear-gradient(90deg, rgba(255, 179, 173, 0.55), transparent 48%);
  pointer-events: none;
}

.theme-post-head {
  padding: 28px 28px 18px;
  border-bottom: 1px solid var(--outline-variant);
}

.theme-post-title {
  margin-bottom: 14px;
  color: var(--on-surface);
  font-family: var(--font-editorial);
  font-size: clamp(2.1rem, 4vw, 3.2rem);
  font-weight: 700;
  line-height: 1.08;
  letter-spacing: -0.04em;
  text-wrap: balance;
}

.theme-post-excerpt {
  max-width: 56ch;
  color: var(--on-surface-variant);
  font-family: var(--font-editorial);
  font-size: 18px;
  line-height: 1.65;
}

.theme-post-body {
  padding: 26px 28px 30px;
}

.gh-content {
  color: var(--on-surface);
  font-family: var(--font-editorial);
  font-size: 18px;
  line-height: 1.75;
}

.gh-content > * + * {
  margin-top: 24px;
}

.gh-content h2,
.gh-content h3,
.gh-content h4 {
  color: var(--on-surface);
  font-family: var(--font-editorial);
  letter-spacing: -0.03em;
  line-height: 1.15;
}

.gh-content h2 {
  font-size: 30px;
}

.gh-content h3 {
  font-size: 24px;
}

.gh-content a {
  color: var(--secondary);
}

.gh-content ul,
.gh-content ol {
  padding-left: 1.4em;
}

.gh-content blockquote {
  padding-left: 18px;
  border-left: 2px solid var(--secondary-container);
  color: var(--on-surface-variant);
}

.theme-pagination {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-top: 28px;
  padding-top: 20px;
  border-top: 1px solid var(--outline-variant);
  font-family: var(--font-ui);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.theme-pagination a {
  color: var(--secondary);
  text-decoration: none;
}
`;

const buildDefaultTemplate = () => `<!DOCTYPE html>
<html lang="{{@site.locale}}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{{meta_title}}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@400;500;600;700&family=Newsreader:opsz,wght@6..72,400;6..72,600;6..72,700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="{{asset "css/screen.css"}}">
  <link rel="stylesheet" href="{{asset "css/team-page.css"}}">
  {{ghost_head}}
</head>
<body class="{{body_class}}">
  {{{body}}}
  <script src="{{asset "js/site.js"}}"></script>
  {{ghost_foot}}
</body>
</html>`;

const buildIndexTemplate = () => `{{!< default}}
<main class="main-wrap fade-in">
  <section class="theme-post-shell">
    <div class="section-header">
      <h1 class="section-title">
        {{#is "tag"}}{{tag.name}}{{else if "author"}}{{author.name}}{{else}}Latest{{/is}}
      </h1>
    </div>

    <div class="theme-listing">
      {{#foreach posts}}
        <article class="article-card">
          <div class="article-body">
            {{#primary_tag}}
              <div class="tag-pill">{{name}}</div>
            {{/primary_tag}}
            <a class="card-title team-link" href="{{url}}">{{title}}</a>
            {{#if excerpt}}
              <p class="article-dek">{{excerpt words="32"}}</p>
            {{/if}}
            <div class="article-meta">
              {{#primary_author}}<span class="author">{{name}}</span>{{/primary_author}}
              <span class="dot">·</span>
              <time datetime="{{date format="YYYY-MM-DD"}}">{{date format="D MMM YYYY"}}</time>
            </div>
          </div>
        </article>
      {{/foreach}}

      <div class="theme-pagination">
        {{pagination}}
      </div>
    </div>
  </section>
</main>`;

const buildPostTemplate = () => `{{!< default}}
{{#post}}
<main class="main-wrap fade-in">
  <article class="theme-post-shell theme-post-card {{post_class}}">
    <header class="theme-post-head">
      {{#primary_tag}}
        <div class="tag-pill">{{name}}</div>
      {{/primary_tag}}
      <h1 class="theme-post-title">{{title}}</h1>
      {{#if excerpt}}
        <p class="theme-post-excerpt">{{excerpt}}</p>
      {{/if}}
      <div class="article-meta">
        {{#primary_author}}<span class="author">{{name}}</span>{{/primary_author}}
        <span class="dot">·</span>
        <time datetime="{{date format="YYYY-MM-DD"}}">{{date format="D MMM YYYY"}}</time>
      </div>
    </header>

    <div class="theme-post-body">
      {{#if feature_image}}
        <img src="{{img_url feature_image size="l"}}" alt="{{feature_image_alt}}" style="width:100%;height:auto;border-radius:var(--radius-lg);margin-bottom:24px;">
      {{/if}}
      <section class="gh-content">
        {{content}}
      </section>
    </div>
  </article>
</main>
{{/post}}`;

const buildPageTemplate = () => `{{!< default}}
{{#post}}
<main class="main-wrap fade-in">
  <article class="theme-post-shell theme-post-card {{post_class}}">
    <header class="theme-post-head">
      <h1 class="theme-post-title">{{title}}</h1>
      {{#if excerpt}}
        <p class="theme-post-excerpt">{{excerpt}}</p>
      {{/if}}
    </header>

    <div class="theme-post-body">
      <section class="gh-content">
        {{content}}
      </section>
    </div>
  </article>
</main>
{{/post}}`;

const buildPackageJson = () => JSON.stringify({
  name: "footballblog-theme",
  description: "Custom Ghost theme for The Athletic-style football tactics publication.",
  version: "1.0.0",
  license: "MIT",
  author: {
    name: "14blatham"
  },
  config: {
    posts_per_page: 10,
    card_assets: true
  }
}, null, 2);

const buildRoutesYaml = () => {
  const routes = teamSlugs.map((slug) => `  /${slug}/: ${slug}`).join("\n");

  return `routes:
${routes}

collections:
  /:
    permalink: /{slug}/
    template: index

taxonomies:
  tag: /tag/{slug}/
  author: /author/{slug}/`;
};

const buildWorkflow = () => `name: Deploy Ghost Theme

on:
  push:
    branches:
      - main
      - master

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Deploy Ghost Theme
        uses: TryGhost/action-deploy-theme@v1
        with:
          api-url: \${{ secrets.GHOST_ADMIN_API_URL }}
          api-key: \${{ secrets.GHOST_ADMIN_API_KEY }}
          working-directory: ghost-theme`;

const buildSetupGuide = () => `# Ghost Setup

This repo now contains a deployable Ghost theme in \`ghost-theme/\`.

## 1. Create a Ghost custom integration

In Ghost Admin, go to **Settings -> Integrations** and create a custom integration.

Copy:

- \`Admin API URL\`
- \`Admin API Key\`

## 2. Add GitHub Actions secrets

In your GitHub repo:

**Settings -> Secrets and variables -> Actions**

Create:

- \`GHOST_ADMIN_API_URL\`
- \`GHOST_ADMIN_API_KEY\`

## 3. Upload routes once in Ghost

This theme uses custom static routes for the 20 team pages.

In Ghost Admin, go to **Settings -> Labs** and upload [ghost-routes.yaml](ghost-routes.yaml).

That will create routes like:

- \`/arsenal/\`
- \`/man-utd/\`
- \`/spurs/\`

## 4. Push to deploy

The workflow file at \`.github/workflows/deploy-theme.yml\` will deploy the theme from \`ghost-theme/\` automatically on every push to \`main\`.
`;

mkdirSync(cssDir, { recursive: true });
mkdirSync(jsDir, { recursive: true });

const indexSource = read("index.html");
const screenCss = extract(indexSource, /<style>([\s\S]*?)<\/style>/, "homepage CSS");
const siteJs = extract(indexSource, /<script>([\s\S]*?)<\/script>/, "homepage JS");
let homeBody = extract(indexSource, /<body>([\s\S]*?)<\/body>/, "homepage body");
homeBody = homeBody.replace(/<script[\s\S]*?<\/script>\s*$/i, "");
homeBody = convertLinks(homeBody);

write(join(themeDir, "default.hbs"), buildDefaultTemplate());
write(join(themeDir, "home.hbs"), `{{!< default}}\n${homeBody}`);
write(join(themeDir, "index.hbs"), buildIndexTemplate());
write(join(themeDir, "post.hbs"), buildPostTemplate());
write(join(themeDir, "page.hbs"), buildPageTemplate());
write(join(themeDir, "package.json"), buildPackageJson());
write(join(cssDir, "screen.css"), appendThemeContentStyles(screenCss));
write(join(cssDir, "team-page.css"), read("team-page.css"));
write(join(jsDir, "site.js"), siteJs);

for (const slug of teamSlugs) {
  const source = read(`${slug}.html`);
  const body = convertTeamNav(extract(source, /<body>([\s\S]*?)<\/body>/, `${slug} body`));
  write(join(themeDir, `${slug}.hbs`), `{{!< default}}\n${body}`);
}

write(join(rootDir, "ghost-routes.yaml"), buildRoutesYaml());
write(join(rootDir, ".github", "workflows", "deploy-theme.yml"), buildWorkflow());
write(join(rootDir, "GHOST_SETUP.md"), buildSetupGuide());

console.log(`Generated Ghost theme in ${themeDir}`);
