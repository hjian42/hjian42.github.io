import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const read = (path) => readFileSync(resolve(root, path), 'utf8');
const occurrences = (text, needle) => text.split(needle).length - 1;

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
