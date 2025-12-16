# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal academic website for Hang Jiang, Assistant Professor at Northeastern University (D'Amore-McKim School of Business & Khoury College of Computer Sciences). Hosted on GitHub Pages at https://hjian42.github.io/. Focused on PhD/RA recruitment.

## Architecture

- **index.html**: Single-page website with sections: Bio, Open Positions callout, Research Areas, Prospective Students, News, Publications, Teaching
- **files/hang.css**: Custom styles including Northeastern branding, callout boxes, research cards, dark mode support
- **files/**: Static assets (PDFs, images, favicon)
- **404.html**: Redirects to main page

## Development

No build or test commands - edit HTML/CSS directly and push to deploy via GitHub Pages.

## Key Technical Details

- Bootstrap 4 for layout/responsive design
- Font Awesome and Academicons for icons
- Google Analytics tracking (UA-160999328-1)
- Northeastern brand color: #C8102E (navbar, headings, accents)
- Inter + Lato fonts via Google Fonts

## Site Sections

1. **Bio**: Introduction, affiliations, contact info
2. **Open Positions**: Prominent callout box for PhD/RA recruitment (`.callout-box` class)
3. **Research Areas**: 4-card grid layout (`.research-areas`, `.research-card` classes)
4. **Prospective Students**: What I'm looking for, advising philosophy, how to apply
5. **News**: Recent updates
6. **Publications**: Academic papers
7. **Teaching**: Courses taught
