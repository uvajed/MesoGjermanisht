# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Mëso Gjermanisht** is a static German learning platform for Albanian speakers. It's a single-page application hosted on GitHub Pages with no build process or dependencies.

**Live site:** https://uvajed.github.io/MesoGjermanisht/

## Development

No build tools required. Open `index.html` directly in a browser or use any local server:

```bash
# Python
python -m http.server 8000

# Node.js (if npx available)
npx serve .
```

## Architecture

### File Structure
- `index.html` - All content and structure (vocabulary, grammar, examples, quizzes for A1/A2/B1 levels)
- `styles.css` - Styling with CSS variables, animations, and responsive design
- `script.js` - Tab navigation, section switching, and quiz game logic

### Key Patterns

**Level System:** Three CEFR levels (A1, A2, B1) controlled by `data-level` attributes on `.tab-btn` elements. Content sections use `.level-content` with matching IDs.

**Section Navigation:** Each level has four sections (vocabulary, grammar, examples, quiz) controlled by `data-section` attributes on `.section-btn` elements. Content uses `.section-content` with matching IDs.

**Quiz System:** Quiz questions defined in `quizData` object in `script.js`. State tracked per level in `quizState`. Each quiz has 10 multiple-choice questions with explanations.

**CSS Variables:** All colors, spacing, and design tokens defined in `:root`. Level-specific colors use `--a1-color`, `--a2-color`, `--b1-color` naming.

### Content Structure (in HTML)
- `.vocabulary-category` → `.word-cards` → `.word-card` (German word, Albanian translation, pronunciation, example)
- `.grammar-topic` → tables, `.conjugation-box`, `.tip-box`
- `.example-category` → `.dialogue-box` → `.dialogue-line`, `.explanation-box`
- `.quiz-container` → dynamically populated by JavaScript

## Adding Content

**New vocabulary:** Add `.word-card` inside a `.vocabulary-category` following existing structure.

**New quiz questions:** Add to appropriate level array in `quizData` object with `question`, `options` (array of 4), `correct` (0-indexed), and `explanation`.

**New grammar topic:** Add `.grammar-topic` div with explanation, tables, and tip boxes as needed.
