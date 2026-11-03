# Utsav – Event Management Website

A responsive event management website where users can explore upcoming events, search and filter them, view details and register. Built for the **K Explore – Web Designing** task with plain HTML5, CSS3 and JavaScript (no frameworks).

**Live site:** https://YOUR-USERNAME.github.io/utsav-events/
**Repository:** https://github.com/YOUR-USERNAME/utsav-events

## Features

- Hero section with a live countdown to the next event
- Event cards with image, date, venue, price, seats left and short description
- Search by name, venue or keyword, plus category filter chips
- Event details dialog with a registration form (name, email, phone, selected event)
- JavaScript validation with inline error messages (valid email, 10-digit Indian mobile number, name rules, duplicate-registration check)
- Confirmation message with a reference number after a successful submission
- **Bonus:** dark/light mode (remembers your choice), countdown timer, animations, and Local Storage registration management (view and cancel registrations)
- Fully responsive for mobile, tablet and desktop; keyboard accessible; respects reduced-motion settings

## Project structure

```
utsav-events/
├── index.html   # page structure, dialogs and form
├── style.css    # theme variables, layout, responsive rules
├── script.js    # event data, search/filter, validation, storage, countdown
└── README.md
```

## How it works

- Events live in the `EVENTS` array at the top of `script.js`. Add, remove or edit objects to change the site. Add `image: "images/photo.jpg"` to use your own picture; otherwise a cover is generated per category.
- Filtering combines the search text and the selected category on every keystroke or click.
- Registrations are saved to `localStorage` under `utsav_registrations`, and seat counts update from that data.
- The theme is switched with a `data-theme` attribute and CSS variables.

## Run locally

Open `index.html` in a browser, or run `npx serve .` in this folder.

## Deploy to GitHub Pages

1. Create a new public repository named `utsav-events` on GitHub.
2. In this folder run:
   ```
   git init
   git add .
   git commit -m "Add Utsav event management website"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/utsav-events.git
   git push -u origin main
   ```
3. On GitHub open **Settings → Pages**, set **Source** to *Deploy from a branch*, choose `main` and `/ (root)`, then save.
4. After about a minute the site is live at `https://YOUR-USERNAME.github.io/utsav-events/`.

## Tech

HTML5 · CSS3 (Grid, Flexbox, custom properties) · JavaScript (ES6) · Git and GitHub
