# Aryan Kusuma – Portfolio Website

A modern, elegant portfolio website built with React.js (TypeScript).

## Features

- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Light & Dark mode with toggle
- ✅ Multi-language: English & Indonesian (i18n)
- ✅ React Router v6 with lazy loading
- ✅ Framer Motion animations
- ✅ SEO-friendly (react-helmet-async)
- ✅ Accessibility support
- ✅ Scroll-to-top button
- ✅ Loading screen
- ✅ Portfolio data in JSON files
- ✅ Project gallery with search & filter
- ✅ Project detail page with image lightbox
- ✅ Contact form
- ✅ Download CV button

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home – Hero, stats, skills preview |
| `/about` | Bio, contact info, skills grid |
| `/experience` | Work timeline |
| `/education` | Education timeline |
| `/projects` | Project gallery with search/filter |
| `/projects/:id` | Project detail with screenshots |
| `/contact` | Contact form + social links |

## Project Structure

```
src/
├── components/
│   ├── common/         # AnimatedSection, LoadingScreen, ScrollToTop, SocialIcons
│   ├── hooks/          # useInView
│   ├── layout/         # Navbar, Footer
│   └── styles/         # Component CSS
├── context/            # ThemeContext
├── data/               # JSON data files (personal, experience, education, projects)
├── i18n/               # en.json, id.json, i18n config
├── pages/              # Home, About, Experience, Education, Projects, ProjectDetail, Contact, NotFound
│   └── styles/         # Page CSS
├── styles/             # globals.css (design tokens, utilities)
├── types/              # TypeScript interfaces
├── App.tsx             # Router + lazy loading
└── index.tsx
```

## Customization

1. **Personal data** → `src/data/personal.json`
2. **Work experience** → `src/data/experience.json`
3. **Education** → `src/data/education.json`
4. **Projects** → `src/data/projects.json`
5. **Translations** → `src/i18n/en.json` / `src/i18n/id.json`
6. **Colors & fonts** → `src/styles/globals.css` (CSS variables)

## Getting Started

```bash
npm install
npm start        # Development server
npm run build    # Production build
```

## Tech Stack

- React 18 + TypeScript
- React Router v6
- Framer Motion
- i18next + react-i18next
- react-helmet-async
- lucide-react
- CSS custom properties (no CSS framework)
