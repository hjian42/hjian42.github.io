# Hang Jiang Personal Site and Human–AI Nexus Group — Design Specification

**Date:** 2026-11-24  
**Repository:** `hjian42/hjian42.github.io`  
**Target branch:** `master` via feature branch and pull request  
**Public URLs:** `https://hjian42.github.io/` and `https://hjian42.github.io/nexus/`

## 1. Objective

Refresh Hang Jiang’s personal academic website around his current, CS-facing research identity and launch a linked lab page for the Human–AI Nexus Group. Both pages must be fast, accessible, responsive, easy to maintain, and hosted from the existing GitHub Pages repository.

The redesign should combine the clarity and compact information architecture of Diyi Yang’s academic site with the research-theme storytelling and strong group navigation of Sherry Tongshuang Wu’s site, while retaining an original visual identity.

## 2. Public-content rules

The current CV is the authoritative source for appointments, education, teaching, awards, media coverage, and publication metadata.

The website must **not** publish:

- Anything in “Working Papers and Manuscripts Under Review.”
- Anything in “Research in Progress.”
- Unpublished or under-review projects, drafts, or titles.
- Jiawei Zhu in the lab roster.
- Expired recruiting language tied to Spring or Fall 2026.

The website may publish:

- Peer-reviewed and publicly available journal, conference, workshop, companion, case, and book-chapter outputs.
- Public code, data, project, paper, media, award, and institutional links.
- The approved student and alumni roster below.
- Evergreen recruiting guidance.

## 3. Information architecture

### 3.1 Personal homepage

Primary navigation:

1. About
2. Research
3. Publications
4. Teaching
5. Media
6. Human–AI Nexus Group
7. CV

Sections:

#### Hero and identity

- Portrait.
- Name and title: Assistant Professor.
- Joint appointment at Northeastern University.
- Explicit links to both:
  - Khoury College of Computer Sciences: `https://www.khoury.northeastern.edu/`
  - D’Amore-McKim School of Business: `https://damore-mckim.northeastern.edu/`
- Email, Google Scholar, GitHub, X, and current CV.
- Prominent call-to-action linking to the Human–AI Nexus Group.

#### About

A concise two-paragraph biography covering:

- Current Northeastern appointment.
- Harvard IQSS affiliation with the CV’s dates/wording.
- Prior MIT-IBM role.
- MIT Ph.D., Stanford M.S., and Emory undergraduate education.
- Interdisciplinary position spanning computer science, organizational research, and social science.

#### Research identity

Lead with this public research framing:

- Human–AI collaboration and AI-native organizations.
- AI-mediated communication, work, and organizational behavior.
- Evaluation and responsible design of socially interactive AI systems.
- Methods: computational social science, natural language processing, human–AI interaction, and AI agents.

Present the first three as concise thematic modules, followed by the methods line.

#### Selected publications

- Show a curated set of recent, public, peer-reviewed outputs.
- Prefer publications that establish the core research identity and span AI agents, human–AI interaction, NLP, and computational social science.
- Each item includes title, authors, venue/year, and only verified public links.
- Mark Hang Jiang consistently in the author list.
- Link to Google Scholar for the complete publication record.
- Do not create a placeholder or teaser for unpublished work.

#### Teaching

Include the current Northeastern course and selected MIT/Stanford teaching history from the CV.

#### Recognition and media

Include:

- AI Wars — Overall Award, The Case Centre Awards and Competitions 2026.
- Communications of the ACM, “Do You Think the Chatbot Likes Me?” — January 2024.
- Science Magazine, “Guinea pigbots: Doing research with human subjects is costly and cumbersome. Can AI chatbots replace them?” — July 2023.

All article and award titles should link to their public pages.

#### News

Keep a short, dated list focused on major appointments, awards, teaching, group, and publication milestones. Do not include minor or stale announcements.

#### Recruiting

Use evergreen language:

- Prospective Ph.D. applicants should apply through the appropriate Northeastern program and mention Hang Jiang when appropriate.
- Current Northeastern students and potential research collaborators may email with a CV and a short research-interest statement.
- Link to the lab’s “Join Us” section for details.
- Do not promise a position, funding, or a specific admissions cycle.

### 3.2 Human–AI Nexus Group page

Public path: `/nexus/`

Primary navigation:

1. Mission
2. Research
3. People
4. Publications
5. Join
6. Hang Jiang

#### Masthead and mission

Display the full name “Human–AI Nexus Group.” Avoid using an unexplained acronym as the primary identity.

Mission statement:

> We study how people and AI think, work, communicate, and organize together.

Supporting copy should explain that the group connects AI/NLP, human–AI interaction, computational social science, and organizational research to build and evaluate AI systems grounded in real human and institutional contexts.

#### Research themes

1. Human–AI collaboration and AI-native organizations.
2. AI-mediated communication and the future of work.
3. Socially interactive and responsible AI.
4. Computational social science, NLP, and AI agents.

Each theme receives a short, concrete description. Do not mention unpublished project names.

#### People

Use typographic initial avatars; do not invent photographs, biographies, personal websites, or research topics.

**Principal Investigator**

- Hang Jiang — Assistant Professor, Northeastern University. Link to the personal homepage and both college homepages.

**Ph.D. Student**

- Xinyi Liu — Ph.D. in Computer Science, Northeastern University; Fall 2026–present. Label prominently: “Ph.D. Student · Core Advisee.”

**Current Research Supervisees**

- Yuxin Li — M.S. in Computer Science, Northeastern University; Spring 2026–present.
- Minglu Sun — M.S. in Computer Science, Northeastern University; Spring 2026–present.
- Zhenze Mo — M.S. in Computer Science, Northeastern University; Fall 2025–present.
- Gao Jian — M.S. in Computer Science, Northeastern University; Spring 2026–present.
- Mengxiang — M.S. in Game and Interactive Media Design, Northeastern University; Spring 2026–present.
- Tiantian Wang — M.S. in Computer Science, Northeastern University; Spring 2026–present.
- Jinbo Hu — M.S. in Computer Science, Northeastern University; Summer 2026–present.
- Paul Zhuohan Deng — M.S. in Electrical Engineering, Tufts University; Spring 2026–present.
- Agatha Hengle Yang — B.S. in Computer Science, Northeastern University; Fall 2026–present.
- Zihan Wu — B.S. in Computer Science, Northeastern University; Fall 2026–present.

**Alumni**

- Xi Zhao — M.S. in Computer Science, Northeastern University; Spring 2026–Summer 2026.
- Yu Ye — M.S. in Computer Science, Northeastern University; Spring 2026–Summer 2026.
- Nanxi Liu — Summer 2023–Summer 2026.
- Yannis Zhu — Fall 2024–Summer 2026.

#### Publications

Show only public, peer-reviewed publications that are meaningfully connected to the PI or listed group members. Items use the same publication component and metadata rules as the personal site. The section should remain compact and link to the personal site or Google Scholar for the broader record.

#### Join Us

Provide evergreen guidance for:

- Prospective Ph.D. applicants.
- Current Northeastern undergraduate and master’s students.
- External collaborators.

Explain desired alignment with the group’s research themes, ask for a CV and short statement of interests when emailing, and link to the appropriate Northeastern admissions pages. Avoid fixed deadlines and expired semester references.

#### Footer

Link back to Hang Jiang’s personal homepage, both Northeastern college homepages, and the contact email.

## 4. Visual system

### Direction

A modern academic editorial style: clear, calm, research-forward, and distinctive without appearing like a startup landing page.

### Palette

- Warm white background.
- Deep navy primary text and headings.
- Restrained burgundy accent referencing Northeastern without reproducing its branding.
- Cool slate secondary text.
- High-contrast link and focus colors.

### Typography

- Serif display face for major headings and editorial emphasis.
- Clean sans-serif body face for long-form reading, navigation, metadata, and cards.
- Minimum 16 px body text.
- Comfortable line length and generous vertical rhythm.

### Components

- Sticky but compact responsive navigation.
- Editorial hero rather than a full-screen banner.
- Research-theme modules with subtle rules or color blocks.
- Publication rows rather than dense cards.
- People cards with initials, role, program, institution, and dates.
- Clear call-to-action links with descriptive text; no decorative arrow buttons.
- Shared footer and navigation system across both pages.

### Responsive behavior

- Desktop content width approximately 1080–1160 px.
- Tablet layouts collapse gracefully without horizontal scrolling.
- Mobile navigation uses a keyboard-accessible toggle.
- People grid becomes one column on narrow screens.
- Publications retain readable metadata order.
- Respect `prefers-reduced-motion`.

## 5. Technical architecture

Retain static GitHub Pages hosting with no framework or build process.

Planned structure:

- `index.html` — redesigned personal homepage.
- `nexus/index.html` — lab page.
- `assets/css/site.css` — shared visual system and responsive styles.
- `assets/js/site.js` — minimal progressive enhancement for mobile navigation and current-year footer.
- `files/hang-navy-tie.png` — existing portrait, unless another existing repository portrait is visually superior during implementation.
- `files/Hang-Jiang-CV.pdf` — current public CV supplied from the verified CV build.
- Existing `.nojekyll`, favicon, and required legacy downloadable assets remain.

Both HTML pages must remain useful if JavaScript fails. All internal links use paths that work on GitHub Pages.

## 6. Accessibility and quality

- Semantic landmarks: header, nav, main, section, and footer.
- Logical heading order.
- Visible keyboard focus.
- Descriptive alt text.
- Sufficient color contrast.
- Navigation toggle exposes `aria-expanded` and an accessible label.
- External links opening new tabs use safe `rel` attributes.
- No content rendered only through icons.
- No automatic animation.
- Metadata includes title, description, canonical URL, Open Graph tags, and social preview information.

## 7. Verification

Before publishing:

1. Validate both pages at desktop and mobile widths.
2. Confirm the personal/lab cross-links in both directions.
3. Confirm the CV download works.
4. Check every publication, institutional, award, and media link used in the new pages.
5. Search generated HTML for prohibited headings and phrases:
   - “Working Papers”
   - “Research in Progress”
   - “Under review”
   - Jiawei Zhu
6. Confirm no stale Spring/Fall 2026 recruiting claims remain.
7. Confirm the approved roster and alumni dates appear exactly once in the correct categories.
8. Confirm keyboard navigation and mobile-menu behavior.
9. Run an HTML/link smoke test and ensure no console errors.
10. Review screenshots at approximately 1440 px desktop and 390 px mobile widths.

## 8. Delivery

Implementation will occur on `codex/human-ai-nexus-redesign`. After verification, open a pull request against `master` with screenshots and a concise content summary. Publishing occurs when the approved changes merge into `master`, which is the current GitHub Pages source branch.
