/* Utsav – event management site. Plain JavaScript, no dependencies. */

/* ---------- Data (edit these to add your own events) ---------- */
const EVENTS = [
  { id: 1, title: "DevFest Cuttack 2026", category: "Tech", date: "2026-12-12T10:00", venue: "Innovation Hall, Cuttack", price: 0, seats: 150,
    short: "A full day of talks on web, AI and cloud from local developers.",
    long: "Join developers, students and founders for keynotes, lightning talks and a project showcase. Lunch and swag are included. Bring a laptop for the afternoon build session." },
  { id: 2, title: "Monsoon Raga Night", category: "Music", date: "2026-12-05T18:30", venue: "Open Air Theatre, Bhubaneswar", price: 499, seats: 300,
    short: "An evening of classical and fusion music under the open sky.",
    long: "Five artists, one stage. The evening opens with Odissi-inspired instrumental sets and closes with a fusion jam. Gates open at 5:30 PM; seating is first come, first served." },
  { id: 3, title: "Hack the Campus", category: "Tech", date: "2027-01-09T09:00", venue: "Engineering College Auditorium, Rourkela", price: 100, seats: 120,
    short: "A 24-hour student hackathon with mentors and cash prizes.",
    long: "Teams of up to four build a working prototype in 24 hours around a campus problem statement. Mentors from industry review projects, and the top three teams win prizes." },
  { id: 4, title: "Pattachitra Art Workshop", category: "Workshop", date: "2026-11-22T11:00", venue: "Heritage Craft Centre, Puri", price: 350, seats: 30,
    short: "Learn traditional palm-leaf and cloth painting from master artisans.",
    long: "A hands-on session covering natural pigments, brush control and classic motifs. All materials are provided, and you take your finished piece home." },
  { id: 5, title: "Konark Dance Festival Preview", category: "Culture", date: "2026-12-19T17:00", venue: "Sun Temple Grounds, Konark", price: 250, seats: 400,
    short: "Classical dance performances set against the Sun Temple.",
    long: "A curated preview of the annual festival featuring Odissi, Kathak and Bharatanatyam troupes. Includes a short heritage walk before the performances." },
  { id: 6, title: "City 10K Run", category: "Sports", date: "2027-01-24T05:30", venue: "Marine Drive, Bhubaneswar", price: 300, seats: 500,
    short: "A scenic 10K and 5K fun run open to all fitness levels.",
    long: "Chip-timed 10K and a relaxed 5K fun run. Finisher medals, hydration points and a post-run breakfast are included. Collect your bib the evening before." },
  { id: 7, title: "UI/UX Design Sprint", category: "Workshop", date: "2026-12-28T10:00", venue: "Design Studio, Cuttack", price: 600, seats: 40,
    short: "Go from problem to clickable prototype in one day.",
    long: "Work in small teams through research, sketching, wireframing and prototyping in Figma. Ideal for beginners; no prior design experience is required." },
  { id: 8, title: "Indie Band Battle", category: "Music", date: "2027-02-06T19:00", venue: "Riverfront Arena, Cuttack", price: 200, seats: 250,
    short: "Eight college bands compete live. The crowd votes for the winner.",
    long: "Eight original-music bands, 20 minutes each. Audience votes decide the finalists and the winner takes home the studio-recording prize." },
  { id: 9, title: "Cricket Premier Finals", category: "Sports", date: "2027-02-14T14:00", venue: "District Sports Complex, Sambalpur", price: 150, seats: 800,
    short: "The final match of the inter-district T20 tournament.",
    long: "Watch the two best district teams battle for the trophy. Food stalls and fan zones open two hours before the first ball." }
];

const CATEGORY_STYLE = {
  Tech:     { hue: 200, icon: "💻" },
  Music:    { hue: 275, icon: "🎶" },
  Culture:  { hue: 20,  icon: "🪔" },
  Sports:   { hue: 145, icon: "🏏" },
  Workshop: { hue: 40,  icon: "🎨" }
};

/* ---------- Helpers ---------- */
const $ = (sel) => document.querySelector(sel);
const fmtDate = (iso) => new Date(iso).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
const fmtTime = (iso) => new Date(iso).toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" });
const priceLabel = (p) => (p === 0 ? "Free" : "₹" + p);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const pad = (n) => String(n).padStart(2, "0");

/* Generated cover art, so every event has an image without needing files.
   To use real photos, add an `image: "images/your-file.jpg"` field to an event. */
function coverArt(ev) {
  const { hue, icon } = CATEGORY_STYLE[ev.category];
  const r = (n) => ((ev.id * 9301 + n * 49297) % 233280) / 233280;
  const blobs = [1, 2, 3].map((n) =>
    `<circle cx="${Math.round(r(n) * 400)}" cy="${Math.round(r(n + 5) * 240)}" r="${40 + Math.round(r(n + 9) * 80)}" fill="hsl(${hue + n * 18},80%,65%)" opacity=".25"/>`
  ).join("");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 240"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="hsl(${hue},70%,42%)"/><stop offset="1" stop-color="hsl(${hue + 45},75%,22%)"/></linearGradient></defs><rect width="400" height="240" fill="url(#g)"/>${blobs}<text x="200" y="145" font-size="84" text-anchor="middle">${icon}</text></svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}
const imageFor = (ev) => ev.image || coverArt(ev);

/* ---------- Storage (registrations) ---------- */
const STORE_KEY = "utsav_registrations";
const loadRegs = () => { try { return JSON.parse(localStorage.getItem(STORE_KEY)) || []; } catch { return []; } };
const saveRegs = (list) => { try { localStorage.setItem(STORE_KEY, JSON.stringify(list)); } catch { /* storage unavailable */ } };
let registrations = loadRegs();

const seatsLeft = (ev) => Math.max(0, ev.seats - registrations.filter((r) => r.eventId === ev.id).length);

/* ---------- Theme ---------- */
const root = document.documentElement;
function setTheme(t) {
  root.dataset.theme = t;
  $("#themeIcon").textContent = t === "dark" ? "☀️" : "🌙";
  $("#themeBtn").setAttribute("aria-label", t === "dark" ? "Switch to light mode" : "Switch to dark mode");
  try { localStorage.setItem("utsav_theme", t); } catch {}
}
let savedTheme = null;
try { savedTheme = localStorage.getItem("utsav_theme"); } catch {}
setTheme(savedTheme || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
$("#themeBtn").addEventListener("click", () => setTheme(root.dataset.theme === "dark" ? "light" : "dark"));

/* ---------- Browse: search + filter ---------- */
let activeCategory = "All";
const categories = ["All", ...new Set(EVENTS.map((e) => e.category))];

function renderChips() {
  $("#chips").innerHTML = categories.map((c) =>
    `<button class="chip" type="button" data-cat="${c}" aria-pressed="${c === activeCategory}">${c}</button>`).join("");
}

function renderGrid() {
  const q = $("#search").value.trim().toLowerCase();
  const list = EVENTS
    .filter((e) => new Date(e.date) > new Date())
    .filter((e) => activeCategory === "All" || e.category === activeCategory)
    .filter((e) => !q || [e.title, e.venue, e.category, e.short].join(" ").toLowerCase().includes(q))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  $("#grid").innerHTML = list.map((e) => {
    const d = new Date(e.date);
    const left = seatsLeft(e);
    return `<button class="card" type="button" data-id="${e.id}" aria-label="${esc(e.title)}, view details">
      <div class="art">
        <img src="${imageFor(e)}" alt="" loading="lazy">
        <div class="date-badge"><small>${d.toLocaleDateString("en-IN", { month: "short" })}</small><b>${d.getDate()}</b></div>
      </div>
      <div class="card-body">
        <p class="tag">${e.category}</p>
        <h3>${esc(e.title)}</h3>
        <p class="meta">${fmtDate(e.date)}, ${fmtTime(e.date)}<br>${esc(e.venue)}</p>
        <p class="desc">${esc(e.short)}</p>
        <div class="card-foot"><span>${priceLabel(e.price)}</span><span>${left ? left + " seats left" : "Sold out"}</span></div>
      </div>
    </button>`;
  }).join("");

  $("#empty").hidden = list.length > 0;
  $("#resultCount").textContent = `${list.length} event${list.length === 1 ? "" : "s"} found`;
}

$("#chips").addEventListener("click", (e) => {
  const b = e.target.closest(".chip"); if (!b) return;
  activeCategory = b.dataset.cat; renderChips(); renderGrid();
});
$("#search").addEventListener("input", renderGrid);
$("#clearBtn").addEventListener("click", () => { $("#search").value = ""; activeCategory = "All"; renderChips(); renderGrid(); });
$("#grid").addEventListener("click", (e) => {
  const c = e.target.closest(".card"); if (c) openEvent(Number(c.dataset.id));
});

/* ---------- Hero countdown ---------- */
let nextEvent = null;
function pickNext() {
  nextEvent = EVENTS.filter((e) => new Date(e.date) > new Date()).sort((a, b) => new Date(a.date) - new Date(b.date))[0] || null;
  $("#nextTitle").textContent = nextEvent ? nextEvent.title : "No upcoming events";
  $("#nextBtn").hidden = !nextEvent;
}
function tick() {
  if (!nextEvent) return;
  let diff = new Date(nextEvent.date) - new Date();
  if (diff <= 0) { pickNext(); renderGrid(); return; }
  const s = Math.floor(diff / 1000);
  $("#cd-d").textContent = pad(Math.floor(s / 86400));
  $("#cd-h").textContent = pad(Math.floor((s % 86400) / 3600));
  $("#cd-m").textContent = pad(Math.floor((s % 3600) / 60));
  $("#cd-s").textContent = pad(s % 60);
}
$("#nextBtn").addEventListener("click", () => nextEvent && openEvent(nextEvent.id));

/* ---------- Event dialog + registration ---------- */
const dlg = $("#eventDialog");
const form = $("#regForm");
let currentId = null;

function openEvent(id) {
  const ev = EVENTS.find((e) => e.id === id); if (!ev) return;
  currentId = id;
  $("#dImg").src = imageFor(ev);
  $("#dCat").textContent = ev.category;
  $("#dTitle").textContent = ev.title;
  $("#dDesc").textContent = ev.long;
  const left = seatsLeft(ev);
  $("#dFacts").innerHTML = `
    <li><b>Date:</b> ${fmtDate(ev.date)}, ${fmtTime(ev.date)}</li>
    <li><b>Venue:</b> ${esc(ev.venue)}</li>
    <li><b>Entry:</b> ${priceLabel(ev.price)}</li>
    <li><b>Availability:</b> ${left ? left + " of " + ev.seats + " seats left" : "Sold out"}</li>`;

  $("#fEvent").innerHTML = `<option value="">Choose an event</option>` +
    EVENTS.map((e) => `<option value="${e.id}">${esc(e.title)}</option>`).join("");
  $("#fEvent").value = String(id);

  form.reset(); $("#fEvent").value = String(id);
  clearErrors();
  form.hidden = left === 0;
  $("#success").hidden = true;
  if (!dlg.open) dlg.showModal();
}

/* Validation */
const rules = {
  name:  (v) => !v ? "Enter your full name." : v.length < 2 ? "Name must be at least 2 characters." : !/^[A-Za-z][A-Za-z .'-]*$/.test(v) ? "Use letters only, no numbers or symbols." : "",
  email: (v) => !v ? "Enter your email address." : !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? "Enter a valid email, like name@example.com." : "",
  phone: (v) => { const d = v.replace(/[\s-]/g, "").replace(/^(\+91|0)/, "");
    return !v ? "Enter your phone number." : !/^[6-9]\d{9}$/.test(d) ? "Enter a valid 10-digit mobile number starting with 6–9." : ""; },
  event: (v) => !v ? "Select the event you want to join." : ""
};
const fields = { name: "#fName", email: "#fEmail", phone: "#fPhone", event: "#fEvent" };
const errIds = { name: "#eName", email: "#eEmail", phone: "#ePhone", event: "#eEvent" };

function check(key) {
  const input = $(fields[key]);
  const msg = rules[key](input.value.trim());
  $(errIds[key]).textContent = msg;
  input.closest(".field").classList.toggle("invalid", !!msg);
  input.setAttribute("aria-invalid", msg ? "true" : "false");
  return !msg;
}
function clearErrors() {
  Object.keys(fields).forEach((k) => {
    $(errIds[k]).textContent = "";
    $(fields[k]).closest(".field").classList.remove("invalid");
    $(fields[k]).removeAttribute("aria-invalid");
  });
}
Object.keys(fields).forEach((k) => {
  $(fields[k]).addEventListener("blur", () => check(k));
  $(fields[k]).addEventListener("input", () => { if ($(fields[k]).closest(".field").classList.contains("invalid")) check(k); });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const results = Object.keys(fields).map(check);
  if (results.includes(false)) { const bad = Object.keys(fields).find((k) => !check(k)); $(fields[bad]).focus(); return; }

  const ev = EVENTS.find((x) => x.id === Number($("#fEvent").value));
  const email = $("#fEmail").value.trim().toLowerCase();

  if (seatsLeft(ev) === 0) { $("#eEvent").textContent = "This event is sold out. Choose another event."; return; }
  if (registrations.some((r) => r.eventId === ev.id && r.email === email)) {
    $("#eEmail").textContent = "This email is already registered for this event.";
    $("#fEmail").closest(".field").classList.add("invalid"); return;
  }

  const reg = {
    ref: "UTS-" + Math.random().toString(36).slice(2, 8).toUpperCase(),
    eventId: ev.id, name: $("#fName").value.trim(), email,
    phone: $("#fPhone").value.trim(), at: new Date().toISOString()
  };
  registrations.push(reg); saveRegs(registrations);

  form.hidden = true;
  $("#successMsg").textContent = `${reg.name}, you're confirmed for ${ev.title} on ${fmtDate(ev.date)}. A confirmation will be sent to ${reg.email}.`;
  $("#refId").textContent = reg.ref;
  $("#success").hidden = false; $("#success").focus();
  updateRegCount(); renderGrid();
});

/* ---------- My registrations ---------- */
const regsDlg = $("#regsDialog");
function updateRegCount() { $("#regCount").textContent = registrations.length; }
function renderRegs() {
  $("#regList").innerHTML = registrations.length ? registrations.map((r) => {
    const ev = EVENTS.find((e) => e.id === r.eventId);
    return `<li><div><strong>${esc(ev ? ev.title : "Event")}</strong>
      <p>${esc(r.name)} · ${esc(r.email)}</p><p>Ref ${esc(r.ref)}${ev ? " · " + fmtDate(ev.date) : ""}</p></div>
      <button class="link-danger" type="button" data-ref="${esc(r.ref)}">Cancel</button></li>`;
  }).join("") : `<li><p>You haven't registered for any events yet. Pick one from the list to get started.</p></li>`;
}
$("#myRegsBtn").addEventListener("click", () => { renderRegs(); regsDlg.showModal(); });
$("#regList").addEventListener("click", (e) => {
  const b = e.target.closest("[data-ref]"); if (!b) return;
  registrations = registrations.filter((r) => r.ref !== b.dataset.ref);
  saveRegs(registrations); renderRegs(); updateRegCount(); renderGrid();
});

/* ---------- Dialog closing ---------- */
document.querySelectorAll("dialog").forEach((d) => {
  d.addEventListener("click", (e) => { if (e.target === d || e.target.closest("[data-close]")) d.close(); });
});

/* ---------- Init ---------- */
renderChips(); pickNext(); renderGrid(); updateRegCount(); tick();
setInterval(tick, 1000);
