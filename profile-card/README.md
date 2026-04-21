# Profile Card — Stage 1B

A fully accessible, responsive React Profile Card component built for the Frontend Wizards Stage 1B challenge.

## Features

- ✅ All required `data-testid` attributes present
- ✅ Semantic HTML (`article`, `figure`, `nav`, `section`, `header`, `ul`)
- ✅ Live epoch time in milliseconds (updates every second via `setInterval`)
- ✅ Accessible avatar with `alt` text + click-to-upload
- ✅ Social links open in new tab with `rel="noopener noreferrer"`
- ✅ Keyboard-navigable with visible focus styles
- ✅ WCAG AA color contrast
- ✅ `aria-live` on the clock for screen reader announcements
- ✅ Responsive: stacks vertically on mobile, side-by-side on tablet/desktop

## data-testid reference

| Element            | `data-testid`                     |
|--------------------|-----------------------------------|
| Card root          | `test-profile-card`               |
| Name               | `test-user-name`                  |
| Bio                | `test-user-bio`                   |
| Epoch time (ms)    | `test-user-time`                  |
| Avatar image       | `test-user-avatar`                |
| Social links list  | `test-user-social-links`          |
| Twitter link       | `test-user-social-twitter`        |
| GitHub link        | `test-user-social-github`         |
| LinkedIn link      | `test-user-social-linkedin`       |
| Dribbble link      | `test-user-social-dribbble`       |
| Hobbies list       | `test-user-hobbies`               |
| Dislikes list      | `test-user-dislikes`              |

## Run locally

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000)

## Build for production

```bash
npm run build
```

## Deploy to Vercel

Push to GitHub, then import the repo on [vercel.com](https://vercel.com). The included `vercel.json` handles configuration automatically.

## Project structure

```
profile-card/
├── public/
│   └── index.html
├── src/
│   ├── index.js          # React entry point
│   ├── App.js            # Root component
│   └── ProfileCard.jsx   # Main component (all logic + styles)
├── .gitignore
├── package.json
├── vercel.json
└── README.md
```
