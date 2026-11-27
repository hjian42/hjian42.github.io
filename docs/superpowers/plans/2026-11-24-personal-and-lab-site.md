# Personal Site and Human–AI Nexus Group Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign Hang Jiang’s GitHub Pages homepage and add a linked Human–AI Nexus Group page using only approved public content.

**Architecture:** Retain buildless static GitHub Pages hosting. Replace the single Bootstrap-dependent homepage with two semantic HTML pages that share one CSS visual system and one small progressive-enhancement script; protect public-content rules with dependency-free Node tests.

**Tech Stack:** HTML5, CSS3, vanilla JavaScript, Node.js built-in test runner, GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-11-24-personal-and-lab-site-design.md`

## Global Constraints

- Public URLs remain `https://hjian42.github.io/` and `https://hjian42.github.io/nexus/`.
- Do not publish anything from “Working Papers and Manuscripts Under Review” or “Research in Progress.”
- Do not publish unpublished or under-review projects, drafts, or titles.
- Do not list Jiawei Zhu.
- Do not retain recruiting copy tied to Spring or Fall 2026.
- Link both `https://www.khoury.northeastern.edu/` and `https://damore-mckim.northeastern.edu/`.
- Use the approved people roster and dates verbatim.
- Keep body text at least 16 px, expose visible keyboard focus, and respect `prefers-reduced-motion`.
- Keep both pages usable when JavaScript is unavailable.
- Use no package manager, framework, generated build output, or new runtime dependency.
- Work only on `codex/human-ai-nexus-redesign` until review and merge.

---

## Planned File Structure

- Modify `index.html`: personal academic homepage and primary source of personal-site content.
- Create `nexus/index.html`: Human–AI Nexus Group page.
- Create `assets/css/site.css`: shared tokens, typography, layout, components, responsive behavior, print rules, focus states, and reduced-motion handling.
- Create `assets/js/site.js`: mobile-navigation progressive enhancement only.
- Create `tests/site.test.mjs`: dependency-free content, structure, accessibility, cross-link, and asset regression tests.
- Create `files/Hang-Jiang-CV.pdf`: verified public CV copied from the tenure-case workspace.
- Preserve `.nojekyll`, `files/favicon.ico`, existing image assets, and existing downloadable research assets.
- Leave `files/hang.css` in place for rollback safety, but stop referencing it from the new pages.
- Leave `404.html` unchanged.

### Shared HTML contract

Both pages use:

- `<header class="site-header">`
- `<button class="nav-toggle" data-nav-toggle aria-controls="site-nav" aria-expanded="false">`
- `<nav class="site-nav" id="site-nav" data-site-nav>`
- `<main id="main-content">`
- `<footer class="site-footer">`
- `<link rel="stylesheet" href=".../assets/css/site.css">`
- `<script src=".../assets/js/site.js" defer></script>`

The personal page links to `nexus/`; the lab page links to `../`.

---

### Task 1: Add regression tests and the shared static-site foundation

**Files:**
- Create: `tests/site.test.mjs`
- Modify: `index.html`
- Create: `nexus/index.html`
- Create: `assets/css/site.css`
- Create: `assets/js/site.js`

**Interfaces:**
- Consumes: existing `files/hang-navy-tie.png` and `files/favicon.ico`.
- Produces: the shared HTML contract, CSS class names, navigation markup, and mobile-navigation data attributes used by every later task.

- [ ] **Step 1: Write the failing shared-foundation tests**

Create `tests/site.test.mjs` with:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const read = (path) => readFileSync(resolve(root, path), 'utf8');

test('shared site assets and lab page exist', () => {
  for (const path of [
    'index.html',
    'nexus/index.html',
    'assets/css/site.css',
    'assets/js/site.js',
  ]) {
    assert.equal(existsSync(resolve(root, path)), true, `${path} must exist`);
  }
});

test('both pages implement the shared semantic shell', () => {
  for (const path of ['index.html', 'nexus/index.html']) {
    const html = read(path);
    assert.match(html, /<header class="site-header">/);
    assert.match(html, /<button[^>]+data-nav-toggle[^>]+aria-expanded="false"/);
    assert.match(html, /<nav class="site-nav"[^>]+id="site-nav"[^>]+data-site-nav/);
    assert.match(html, /<main id="main-content">/);
    assert.match(html, /<footer class="site-footer">/);
    assert.match(html, /assets\/css\/site\.css/);
    assert.match(html, /assets\/js\/site\.js/);
  }
});

test('personal and lab pages link to each other', () => {
  assert.match(read('index.html'), /href="nexus\//);
  assert.match(read('nexus/index.html'), /href="\.\.\//);
});

test('mobile navigation exposes the required state contract', () => {
  const script = read('assets/js/site.js');
  assert.match(script, /\[data-nav-toggle\]/);
  assert.match(script, /\[data-site-nav\]/);
  assert.match(script, /aria-expanded/);
  assert.match(script, /classList\.toggle\('is-open'/);
});
```

- [ ] **Step 2: Run the tests and verify the expected failure**

Run:

```bash
node --test tests/site.test.mjs
```

Expected: FAIL because `nexus/index.html`, `assets/css/site.css`, and `assets/js/site.js` do not exist and the old homepage does not implement the shared shell.

- [ ] **Step 3: Replace the old Bootstrap shell with the minimal shared shell**

Create semantic personal and lab page shells with:

- Skip link to `#main-content`.
- Shared header and mobile-toggle contract.
- Correct relative CSS/JS paths.
- Canonical URLs for each page.
- Empty semantic section containers that later tasks populate.
- Personal-to-lab and lab-to-personal navigation links.
- No Bootstrap, jQuery, Popper, or Font Awesome dependencies.

Create `assets/js/site.js` with the exact progressive enhancement:

```js
(() => {
  const toggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-site-nav]');

  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.addEventListener('click', (event) => {
    if (!event.target.closest('a')) return;
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  });
})();
```

Create `assets/css/site.css` with the approved tokens and base component contract:

```css
:root {
  --canvas: #fbfaf7;
  --surface: #ffffff;
  --ink: #172033;
  --muted: #5d6676;
  --navy: #17324d;
  --burgundy: #8f2437;
  --line: #d8d9dc;
  --focus: #0b65c2;
  --max-width: 70rem;
  --radius: 0.75rem;
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  color: var(--ink);
  background: var(--canvas);
  font: 1rem/1.65 "Inter", "Helvetica Neue", Arial, sans-serif;
}
img { max-width: 100%; height: auto; }
a { color: var(--navy); text-underline-offset: 0.2em; }
a:hover { color: var(--burgundy); }
a:focus-visible,
button:focus-visible { outline: 3px solid var(--focus); outline-offset: 3px; }
.skip-link { position: absolute; left: -9999px; }
.skip-link:focus { left: 1rem; top: 1rem; z-index: 100; }
.site-shell { width: min(calc(100% - 2rem), var(--max-width)); margin-inline: auto; }
.site-nav { display: flex; gap: 1.25rem; }
.nav-toggle { display: none; }

@media (max-width: 48rem) {
  .nav-toggle { display: inline-flex; }
  .site-nav { display: none; }
  .site-nav.is-open { display: grid; }
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { transition-duration: 0.01ms !important; }
}
```

Expand this file in the same step with the approved hero, section, research-grid, publication-list, people-grid, person-card, button-link, meta-list, footer, mobile, and print components. Keep each class focused on one component.

- [ ] **Step 4: Run the foundation tests**

Run:

```bash
node --test tests/site.test.mjs
```

Expected: all Task 1 tests PASS.

- [ ] **Step 5: Commit the shared foundation**

```bash
git add index.html nexus/index.html assets/css/site.css assets/js/site.js tests/site.test.mjs
git commit -m "feat: add shared personal and lab site foundation"
```

---

### Task 2: Build the personal homepage identity and research narrative

**Files:**
- Modify: `index.html`
- Modify: `tests/site.test.mjs`

**Interfaces:**
- Consumes: Task 1 shared shell and CSS component classes.
- Produces: `#about`, `#research`, `#news`, and `#join` anchors used by the personal navigation and lab cross-links.

- [ ] **Step 1: Add failing personal-identity tests**

Append:

```js
test('personal page presents the current joint appointment and research identity', () => {
  const html = read('index.html');
  assert.match(html, /Hang Jiang/);
  assert.match(html, /Assistant Professor/);
  assert.match(html, /Human.AI collaboration and AI-native organizations/i);
  assert.match(html, /AI-mediated communication, work, and organizational behavior/i);
  assert.match(html, /socially interactive AI systems/i);
  assert.match(html, /computational social science/i);
  assert.match(html, /natural language processing/i);
  assert.match(html, /AI agents/i);
});

test('personal page links both Northeastern college homepages', () => {
  const html = read('index.html');
  assert.match(html, /https:\/\/www\.khoury\.northeastern\.edu\//);
  assert.match(html, /https:\/\/damore-mckim\.northeastern\.edu\//);
});

test('personal page exposes contact, scholar, social, CV, and lab links', () => {
  const html = read('index.html');
  for (const fragment of [
    'mailto:hang.jiang@northeastern.edu',
    'scholar.google.com/citations?user=9qvTNQ4AAAAJ',
    'github.com/hjian42',
    'x.com/hjian42',
    'files/Hang-Jiang-CV.pdf',
    'nexus/',
  ]) {
    assert.ok(html.includes(fragment), `missing ${fragment}`);
  }
});
```

- [ ] **Step 2: Run the focused tests and verify failure**

Run:

```bash
node --test --test-name-pattern="personal page" tests/site.test.mjs
```

Expected: FAIL because the minimal shell lacks the approved biography, research themes, and public links.

- [ ] **Step 3: Implement the personal hero, biography, research themes, and evergreen recruiting block**

Use the approved copy from the spec. Include:

- Existing `files/hang-navy-tie.png` portrait with alt text “Hang Jiang.”
- Joint appointment and both college homepages.
- Email, Scholar, GitHub, X, CV, and lab links as text-backed controls.
- Current biography including Harvard IQSS, MIT-IBM, MIT, Stanford, and Emory.
- Three research-theme modules plus the methodological line.
- A short news list limited to meaningful appointment, award, group, teaching, or publication milestones.
- Evergreen recruiting copy that links to `nexus/#join`.

Do not include a Fall 2026 or Spring 2026 recruiting call.

- [ ] **Step 4: Run all tests**

Run:

```bash
node --test tests/site.test.mjs
```

Expected: PASS.

- [ ] **Step 5: Commit the personal identity sections**

```bash
git add index.html tests/site.test.mjs
git commit -m "feat: refresh personal research identity"
```

---

### Task 3: Add approved publications, teaching, recognition, and media

**Files:**
- Modify: `index.html`
- Modify: `tests/site.test.mjs`

**Interfaces:**
- Consumes: Task 1 `.publication-list`, `.publication-item`, `.meta-list`, and section styles.
- Produces: `#publications`, `#teaching`, and `#media` anchors.

- [ ] **Step 1: Add failing public-output and exclusion tests**

Append:

```js
test('personal page contains approved public scholarship and recognition', () => {
  const html = read('index.html');
  for (const text of [
    'Leveraging Large Language Models for Learning Complex Legal Concepts through Storytelling',
    'PersonaLLM',
    'CommunityLM',
    'LNN-EL',
    'AI Wars',
    'Overall Award',
    'Do You Think the Chatbot Likes Me?',
    'Guinea pigbots',
    'MISM 2510 Fundamentals of Information Analytics',
  ]) {
    assert.ok(html.includes(text), `missing approved public content: ${text}`);
  }
});

test('public pages exclude non-public research and stale recruiting language', () => {
  const publicHtml = [read('index.html'), read('nexus/index.html')].join('\n');
  for (const prohibited of [
    'Working Papers and Manuscripts Under Review',
    'Research in Progress',
    'Under review',
    'Jiawei Zhu',
    'starting Fall 2026',
    'starting Spring 2026',
  ]) {
    assert.equal(publicHtml.includes(prohibited), false, `prohibited content: ${prohibited}`);
  }
});
```

- [ ] **Step 2: Run the focused tests and verify failure**

Run:

```bash
node --test --test-name-pattern="approved public scholarship|exclude non-public" tests/site.test.mjs
```

Expected: FAIL because the selected publications, recognition, media, and teaching content are absent.

- [ ] **Step 3: Implement the public-output sections**

Populate the personal page with:

- A curated publication list drawn only from public peer-reviewed CV sections.
- Title, authors, venue/year, and verified public paper/code/data/demo links.
- Hang Jiang emphasized consistently in author lists.
- Teaching entries led by Northeastern MISM 2510, followed by selected MIT and Stanford teaching.
- AI Wars and the 2026 Overall Award with HBSP and award links.
- Communications of the ACM media coverage dated January 2024.
- Science Magazine media coverage dated July 2023.
- Google Scholar link after the curated publication list.

Use only titles and URLs already present in the CV or current site. Do not infer links for entries without verified public URLs.

- [ ] **Step 4: Run all tests**

Run:

```bash
node --test tests/site.test.mjs
```

Expected: PASS.

- [ ] **Step 5: Commit the public-output sections**

```bash
git add index.html tests/site.test.mjs
git commit -m "feat: add public scholarship and recognition"
```

---

### Task 4: Build the Human–AI Nexus Group mission and approved people roster

**Files:**
- Modify: `nexus/index.html`
- Modify: `tests/site.test.mjs`

**Interfaces:**
- Consumes: Task 1 people-grid and person-card styles.
- Produces: `#mission`, `#research`, and `#people` anchors plus `data-roster-group` and `data-person` attributes used by tests.

- [ ] **Step 1: Add failing mission and exact-roster tests**

Append:

```js
const occurrences = (text, needle) => text.split(needle).length - 1;

test('lab page states the approved name, mission, and themes', () => {
  const html = read('nexus/index.html');
  assert.match(html, /Human.AI Nexus Group/);
  assert.match(html, /We study how people and AI think, work, communicate, and organize together\./);
  for (const theme of [
    'Human–AI collaboration and AI-native organizations',
    'AI-mediated communication and the future of work',
    'Socially interactive and responsible AI',
    'Computational social science, NLP, and AI agents',
  ]) {
    assert.ok(html.includes(theme), `missing lab theme: ${theme}`);
  }
});

test('lab page lists the approved current roster exactly once', () => {
  const html = read('nexus/index.html');
  for (const name of [
    'Xinyi Liu',
    'Yuxin Li',
    'Minglu Sun',
    'Zhenze Mo',
    'Gao Jian',
    'Mengxiang',
    'Tiantian Wang',
    'Jinbo Hu',
    'Paul Zhuohan Deng',
    'Agatha Hengle Yang',
    'Zihan Wu',
  ]) {
    assert.equal(occurrences(html, `data-person="${name}"`), 1, `${name} roster count`);
  }
  assert.match(html, /Xinyi Liu[\s\S]*Ph\.D\. Student[\s\S]*Core Advisee/);
});

test('lab page lists the approved alumni and dates exactly once', () => {
  const html = read('nexus/index.html');
  const alumni = new Map([
    ['Xi Zhao', 'Spring 2026–Summer 2026'],
    ['Yu Ye', 'Spring 2026–Summer 2026'],
    ['Nanxi Liu', 'Summer 2023–Summer 2026'],
    ['Yannis Zhu', 'Fall 2024–Summer 2026'],
  ]);
  for (const [name, dates] of alumni) {
    assert.equal(occurrences(html, `data-person="${name}"`), 1, `${name} alumni count`);
    assert.ok(html.includes(dates), `missing dates for ${name}`);
  }
});
```

- [ ] **Step 2: Run the focused tests and verify failure**

Run:

```bash
node --test --test-name-pattern="lab page" tests/site.test.mjs
```

Expected: FAIL because the lab shell lacks mission, research, and roster content.

- [ ] **Step 3: Implement the lab mission, themes, and people sections**

Populate:

- Lab masthead and approved mission sentence.
- Supporting copy connecting AI/NLP, human–AI interaction, computational social science, and organizational research.
- Four approved research themes without unpublished project names.
- PI card linking to `../`, Khoury, and D’Amore-McKim.
- Xinyi Liu card labeled “Ph.D. Student · Core Advisee,” Fall 2026–present.
- Ten current research-supervisee cards using the exact names, programs, institutions, and dates from the spec.
- Four alumni cards using exact names and dates from the spec.
- Typographic initials marked `aria-hidden="true"`; full names remain visible text.
- `data-roster-group` on group containers and `data-person` on each card.

- [ ] **Step 4: Run all tests**

Run:

```bash
node --test tests/site.test.mjs
```

Expected: PASS.

- [ ] **Step 5: Commit the lab mission and roster**

```bash
git add nexus/index.html tests/site.test.mjs
git commit -m "feat: add nexus group mission and roster"
```

---

### Task 5: Add lab publications, evergreen joining guidance, and cross-site metadata

**Files:**
- Modify: `nexus/index.html`
- Modify: `index.html`
- Modify: `tests/site.test.mjs`

**Interfaces:**
- Consumes: public publication metadata from Task 3 and shared publication components from Task 1.
- Produces: `#publications` and `#join` lab anchors, complete metadata, and final bidirectional cross-links.

- [ ] **Step 1: Add failing lab-content and metadata tests**

Append:

```js
test('lab page has public publications and evergreen joining guidance', () => {
  const html = read('nexus/index.html');
  assert.match(html, /id="publications"/);
  assert.match(html, /id="join"/);
  assert.match(html, /Prospective Ph\.D\. applicants/);
  assert.match(html, /Current Northeastern students/);
  assert.match(html, /External collaborators/);
  assert.match(html, /mailto:hang\.jiang@northeastern\.edu/);
});

test('both pages provide canonical and social metadata', () => {
  const pages = new Map([
    ['index.html', 'https://hjian42.github.io/'],
    ['nexus/index.html', 'https://hjian42.github.io/nexus/'],
  ]);
  for (const [path, canonical] of pages) {
    const html = read(path);
    assert.ok(html.includes(`rel="canonical" href="${canonical}"`));
    assert.match(html, /property="og:title"/);
    assert.match(html, /property="og:description"/);
    assert.match(html, /property="og:url"/);
    assert.match(html, /name="twitter:card"/);
  }
});
```

- [ ] **Step 2: Run the focused tests and verify failure**

Run:

```bash
node --test --test-name-pattern="evergreen joining|canonical and social" tests/site.test.mjs
```

Expected: FAIL because the lab page lacks completed publication/join sections and one or both pages lack final metadata.

- [ ] **Step 3: Implement the lab publication and join sections**

- Select a compact subset of public peer-reviewed publications already used on the personal page and relevant to the group’s themes.
- Use the same title, authors, venue, year, and verified links as the personal page.
- Link to the personal publication section and Google Scholar for the broader record.
- Add separate evergreen paragraphs for Ph.D. applicants, current Northeastern students, and external collaborators.
- Ask email applicants to provide a CV and short statement of research alignment without promising funding or admission.
- Link the Ph.D. paragraph to the official Khoury graduate application page.
- Complete canonical, Open Graph, description, and Twitter metadata for both pages.

- [ ] **Step 4: Run all tests**

Run:

```bash
node --test tests/site.test.mjs
```

Expected: PASS.

- [ ] **Step 5: Commit the completed lab content**

```bash
git add index.html nexus/index.html tests/site.test.mjs
git commit -m "feat: complete nexus group research and joining content"
```

---

### Task 6: Add the verified CV and validate local assets and links

**Files:**
- Create: `files/Hang-Jiang-CV.pdf`
- Modify: `tests/site.test.mjs`

**Interfaces:**
- Consumes: `/Users/hjian42/Documents/ChatGPT/tenure-case/output/pdf/hang_cv_2026_styled.pdf`.
- Produces: public CV path `files/Hang-Jiang-CV.pdf` referenced by the personal page.

- [ ] **Step 1: Add failing CV and local-link tests**

Append:

```js
test('CV asset is a non-empty PDF', () => {
  const path = resolve(root, 'files/Hang-Jiang-CV.pdf');
  assert.equal(existsSync(path), true);
  const bytes = readFileSync(path);
  assert.equal(bytes.subarray(0, 4).toString('ascii'), '%PDF');
  assert.ok(bytes.length > 100_000, 'CV should contain the complete rendered document');
});

test('all local href and src targets exist', () => {
  for (const page of ['index.html', 'nexus/index.html']) {
    const html = read(page);
    const base = resolve(root, page === 'index.html' ? '.' : 'nexus');
    const matches = html.matchAll(/(?:href|src)="([^"#?]+)"/g);
    for (const [, target] of matches) {
      if (/^(?:https?:|mailto:|tel:)/.test(target)) continue;
      const resolved = resolve(base, target);
      assert.equal(existsSync(resolved), true, `${page}: missing ${target}`);
    }
  }
});
```

- [ ] **Step 2: Run the focused tests and verify failure**

Run:

```bash
node --test --test-name-pattern="CV asset|local href" tests/site.test.mjs
```

Expected: FAIL because `files/Hang-Jiang-CV.pdf` is absent.

- [ ] **Step 3: Copy the verified CV into the website repository**

Run:

```bash
cp /Users/hjian42/Documents/ChatGPT/tenure-case/output/pdf/hang_cv_2026_styled.pdf files/Hang-Jiang-CV.pdf
```

Confirm the source PDF is the six-page verified CV before copying:

```bash
pdfinfo /Users/hjian42/Documents/ChatGPT/tenure-case/output/pdf/hang_cv_2026_styled.pdf | grep '^Pages:'
```

Expected: `Pages:           6`.

- [ ] **Step 4: Run all tests**

Run:

```bash
node --test tests/site.test.mjs
```

Expected: PASS.

- [ ] **Step 5: Commit the CV asset**

```bash
git add files/Hang-Jiang-CV.pdf tests/site.test.mjs
git commit -m "docs: publish current academic CV"
```

---

### Task 7: Perform responsive and accessibility QA

**Files:**
- Modify if required by observed defects: `index.html`
- Modify if required by observed defects: `nexus/index.html`
- Modify if required by observed defects: `assets/css/site.css`
- Modify if required by observed defects: `assets/js/site.js`
- Modify if a regression is discovered: `tests/site.test.mjs`

**Interfaces:**
- Consumes: the complete two-page site.
- Produces: verified desktop/mobile layouts and a stable navigation interaction.

- [ ] **Step 1: Start a local static server**

Run from the repository root:

```bash
python3 -m http.server 4173
```

Expected: both `http://127.0.0.1:4173/` and `http://127.0.0.1:4173/nexus/` return HTTP 200.

- [ ] **Step 2: Test desktop layouts**

Inspect both pages at approximately 1440 × 1000 and verify:

- Header does not obscure anchor targets.
- Hero portrait and copy remain balanced.
- Publication titles and author lines do not overflow.
- People cards align without uneven clipped content.
- Both college links and cross-site links are visible.
- No section contains an orphaned heading or excessive empty space.

Save screenshots for the eventual pull-request description.

- [ ] **Step 3: Test mobile layouts**

Inspect both pages at approximately 390 × 844 and verify:

- Toggle is visible and works with keyboard and pointer input.
- `aria-expanded` changes from `false` to `true` and back.
- Selecting a navigation link closes the mobile menu.
- No horizontal scrolling.
- People cards use one column.
- Publication metadata wraps in reading order.
- CV and lab calls to action remain visible and tappable.

- [ ] **Step 4: Test progressive enhancement and accessibility**

- Disable JavaScript and confirm all navigation links remain visible or reachable through the document flow.
- Tab through all interactive elements and confirm visible focus.
- Confirm the portrait has meaningful alt text.
- Confirm typographic initials are hidden from assistive technology.
- Emulate reduced motion and confirm smooth scrolling is removed.
- Check the browser console on both pages; expected: no errors.

- [ ] **Step 5: Convert every observed defect into a failing regression test before fixing it**

For example, if an accidental stale recruiting phrase appears, first extend the prohibited-content array in `tests/site.test.mjs`, run the focused test to observe failure, then correct the HTML and rerun all tests.

- [ ] **Step 6: Run the final automated test suite**

```bash
node --test tests/site.test.mjs
```

Expected: all tests PASS.

- [ ] **Step 7: Commit QA fixes if any files changed**

```bash
git add index.html nexus/index.html assets/css/site.css assets/js/site.js tests/site.test.mjs
git diff --cached --quiet || git commit -m "fix: polish responsive and accessible layouts"
```

---

### Task 8: Review the branch and open the delivery pull request

**Files:**
- Review all files changed from `master`.
- Do not change public source files unless review finds a defect.

**Interfaces:**
- Consumes: verified commits from Tasks 1–7 and saved desktop/mobile screenshots.
- Produces: a reviewable pull request against `master`; merging it publishes through the existing GitHub Pages configuration.

- [ ] **Step 1: Inspect the complete branch diff**

Run:

```bash
git diff --stat master...HEAD
git diff --check master...HEAD
git log --oneline master..HEAD
```

Expected:

- No whitespace errors.
- Only planned HTML, CSS, JS, tests, CV, and design/plan documentation changes.
- No deletion of existing research downloads or image assets.

- [ ] **Step 2: Run the release checks**

```bash
node --test tests/site.test.mjs
grep -RniE 'Working Papers and Manuscripts Under Review|Research in Progress|Under review|Jiawei Zhu|starting (Spring|Fall) 2026' index.html nexus/index.html && exit 1 || true
```

Expected: tests PASS and grep produces no prohibited public content.

- [ ] **Step 3: Push the completed feature branch**

```bash
git push -u origin codex/human-ai-nexus-redesign
```

Expected: remote branch points to the verified local HEAD.

- [ ] **Step 4: Open the pull request**

Create a PR titled:

```text
Redesign personal site and launch Human–AI Nexus Group
```

The description must include:

- Personal-site information architecture summary.
- Lab-site mission and roster summary.
- Explicit statement that working papers, under-review work, and research-in-progress items are excluded.
- Links to both local verification targets.
- Automated test result.
- Desktop and mobile screenshots for both pages.
- Publication note: merge to `master` triggers the existing GitHub Pages deployment.

- [ ] **Step 5: Inspect the PR diff and checks**

Confirm the PR targets `master`, all intended files appear, no prohibited content is present, and any repository checks pass. Do not merge until the user has reviewed the PR or explicitly asks for immediate publication.

