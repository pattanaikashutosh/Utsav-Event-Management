# Utsav – Event Management Website

Utsav is a responsive event management website that I designed and built from scratch for the **K Explore – Web Designing** task. It helps people discover upcoming events, find the ones they care about, and register in under a minute.

**Live website:** https://pattanaikashutosh.github.io/Utsav-Event-Management

**GitHub repository:** https://github.com/pattanaikashutosh/Utsav-Event-Management

**Built by:** Ashutosh Pattanaik

---

## Why I built it

Most event pages make people scroll through long lists, open several tabs and fill in confusing forms. I wanted to build one place where a visitor can see what is happening soon, narrow it down quickly, read the details and register without leaving the page. I focused on a clear layout, readable text, simple form feedback and a design that works well on a phone, as well as on a laptop.

## What the website can do

### 1. Introduce the platform
The homepage opens with a hero section that explains what Utsav is. Next to it, a **live countdown timer** shows the days, hours, minutes and seconds until the next event starts, with a button that opens its details straight away.

### 2. Show upcoming events
Every event appears as a card with its **image, name, category, date and time, venue, price, a short description and the number of seats left**. Events are sorted by date, so the soonest one is always first, and events that have already started are hidden automatically.

### 3. Search and filter
- **Search bar:** type a name, venue, category or keyword and the results update as you type.
- **Category filters:** switch between All, Tech, Music, Culture, Sports and Workshop with one click.
- Search and filters work together, and a live result count tells you how many events match.
- If nothing matches, an empty-state message explains what to do and offers a "Clear filters" button.

### 4. View event details
Clicking a card opens a popup with the full description, date, time, venue, entry fee and seat availability, so users can decide before registering.

### 5. Register for an event
The registration form collects:
- Full name
- Email address
- Phone number
- Selected event (pre-filled with the event you opened, and changeable)

### 6. Validate every entry
JavaScript checks the form before it is submitted and shows a clear message under the field that has a problem:
- Name must contain letters only and be at least 2 characters.
- Email must be in a valid format such as `name@example.com`.
- Phone must be a valid 10-digit Indian mobile number (spaces, dashes and +91 are accepted).
- An event must be selected.
- The same email cannot register twice for the same event.
- Sold-out events cannot be registered for.

Errors appear as the user leaves a field and clear as soon as it is corrected.

### 7. Confirm the registration
After a successful submission, the form is replaced by a **confirmation message** with the participant's name, the event and date, and a unique **reference number** (for example `UTS-4K9F2A`).

### 8. Manage registrations
Registrations are saved in the browser using **Local Storage**, so they are still there after a refresh. The **My registrations** button shows everything the user has registered for, and each one can be cancelled. Seat counts on the cards update automatically when someone registers or cancels.

### 9. Dark and light mode
A theme button switches the whole site between light and dark mode. The site follows the device's preference on the first visit and remembers the choice afterwards.

### 10. Work on any screen
The layout adapts to **mobile phones, tablets and desktops**: the event grid changes the number of columns, the hero stacks vertically on small screens, and the popups fit the screen height.

### 11. Be accessible
- Full keyboard navigation with visible focus outlines and a "Skip to events" link
- Labels linked to every form field and error messages that screen readers can announce
- Text and colours chosen for good contrast in both themes
- Animations are switched off for users who have "reduce motion" turned on

## Tech stack

| Area | Used |
|------|------|
| Structure | HTML5 (semantic elements, `<dialog>`) |
| Styling | CSS3 (Grid, Flexbox, custom properties, media queries, transitions) |
| Logic | Vanilla JavaScript (ES6) |
| Storage | Browser Local Storage |
| Fonts | Bricolage Grotesque and DM Sans (Google Fonts) |
| Version control and hosting | Git, GitHub and GitHub Pages |

## Project structure

```
utsav-events/
├── index.html    # page layout, event popup, registration form
├── style.css     # theme colours, layout, responsive rules, animations
├── script.js     # event data, search and filters, validation, countdown, storage
└── README.md     # project documentation
```

## How it works

1. **Event data:** all events are stored in an `EVENTS` array in `script.js`. Each has a title, category, date, venue, price, seat limit and descriptions.
2. **Rendering:** JavaScript builds the event cards from that array and re-renders them whenever the search text or category changes.
3. **Registration:** on submit, each field is validated, then the registration is saved to Local Storage and the seat count is recalculated.
4. **Countdown:** a timer runs every second and moves on to the next event automatically when one starts.
5. **Theme:** the theme is applied through a `data-theme` attribute and CSS variables, so every colour changes at once.

## Run it on your computer

```
git clone https://github.com/YOUR-USERNAME/utsav-events.git
cd utsav-events
```

Then open `index.html` in your browser. No installation or build step is needed.

## Add or edit events

Open `script.js` and change the `EVENTS` list at the top. To use your own picture for an event, add an image path:

```js
{ id: 10, title: "My Event", category: "Tech", date: "2027-03-01T10:00",
  venue: "My Venue", price: 0, seats: 100,
  short: "One-line summary.", long: "Full description.",
  image: "images/my-event.jpg" }
```

## Deployment

The site is hosted for free on **GitHub Pages** from the `main` branch.

## What I learned

- Planning a responsive layout that works from small phones to wide screens
- Writing form validation that gives helpful feedback instead of generic errors
- Keeping data in the browser with Local Storage and keeping the page in sync with it
- Building accessible, theme-aware interfaces with CSS variables
- Using Git and GitHub for version control and deployment

## Future improvements

- Connect to a backend and database so registrations are shared across devices
- Send real confirmation emails
- Add online payments for paid events
- Add an admin page for organisers to create events and download attendee lists

---

Made by YOUR NAME for the K Explore – Web Designing task.