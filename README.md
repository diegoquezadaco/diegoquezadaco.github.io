# diegoquezadaco.github.io

Personal portfolio — editorial, minimal, black/white with a blue accent, light/dark theme.

## Structure

```
index.html              About / landing page (hero, about, featured projects,
                         education, experience, certifications, skills, conferences)
projects.html            Full project listing
contact.html              Contact page
projects/<slug>/          One folder per project, index.html is the detail page
images/projects/<slug>/   Photos / screenshots for that project
videos/projects/<slug>/   Demo clips (.mp4) for that project
images/logos/             Company / university logos for the experience & education timelines
images/profile.jpg        Your professional photo (add this file)
res/                      CV, technical reports, and any other downloadable PDFs
partials/                 Shared header.html and footer.html
css/style.css             All site styles (theme tokens, layout, components)
js/theme-init.js          Runs in <head>, sets the saved theme before first paint (no flash)
js/main.js                Loads partials, mobile nav, scroll reveal, theme toggle
```

## Media placeholders (no more 404s or broken boxes)

Every image and video slot on the site is built with a fallback-first pattern:

- **Videos**: a real `<img class="media-fallback">` (pointing at a "CHANGE ME" SVG in
  `images/placeholders/`) sits underneath the `<video data-video-src="...">`. JS (`js/main.js`)
  only tries to load the video, and only reveals it, once it has actually loaded data. If the
  video file is missing, the placeholder graphic just stays visible — never a black box or a
  browser error icon.
- **Images** (gallery photos, profile photo): `<img src="the real path" data-fallback="images/placeholders/....svg">`.
  If the real file 404s, JS swaps in the placeholder graphic automatically.

To replace a placeholder, just drop your real file at the path already referenced in the HTML
(e.g. `videos/projects/<slug>/demo.mp4` or `images/projects/<slug>/01.jpg`) — no HTML/CSS changes
needed, the fallback disengages automatically once the real file loads successfully.

The placeholder graphics themselves live in `images/placeholders/` (`media-16x10.svg`,
`media-16x8.svg`, `gallery-4x3.svg`, `profile.svg`, `logo.svg`) if you want to restyle them.

## Layout

The site uses a wider container (1360px) and denser spacing throughout — sections, cards, and
type sizes are intentionally compact so more content is visible per scroll, and content is
left-weighted rather than centered (hero text takes ~⅔ width with a small photo on the right,
About is a narrow stat column next to a wider text column, etc.). Featured projects and the full
projects listing both use a 3-column grid down to tablet width, collapsing to 2 then 1 column on
smaller screens.

## Light/Dark theme & readability

`color-scheme: light` / `color-scheme: dark` is declared explicitly in both CSS and a `<meta
name="color-scheme">` tag on every page. This prevents browsers with an OS-level dark mode
preference from auto-darkening native UI (form fields, scrollbars) independently of the site's
own light/dark toggle, which is what causes white-text-on-white-background rendering bugs on some
devices.



- Default is **light**. A toggle button in the nav bar switches themes.
- The choice is saved to `localStorage` and restored on every visit.
- Colors live entirely in CSS custom properties in `css/style.css` under `:root`
  and `[data-theme="dark"]` — edit those two blocks to adjust the palette.

## Adding a profile photo

Just drop your file at `images/profile.jpg` (create the `images/` file with exactly that name).
The hero section already points there — nothing else to edit. Until the file exists, a "CHANGE ME"
placeholder graphic shows automatically instead of a broken image.

## Replacing a project video

Every featured/detail project card already points at a path like:

```
videos/projects/<slug>/demo.mp4       (card previews on index.html / projects.html)
videos/projects/<slug>/hero.mp4       (large hero video on the project detail page)
```

Just drop your `.mp4` into the matching folder with that exact filename — no HTML/CSS edits
needed. The page checks whether the video actually loads; if it does, the video replaces the
placeholder automatically, and if it doesn't (wrong filename, not uploaded yet), the placeholder
graphic just stays visible instead of showing a broken/black box.

## Adding a photo to a project gallery

Drop the file into `images/projects/<slug>/` using the filename already referenced in that
project's gallery (`01.jpg`, `02.jpg`, etc. — check the project's `index.html` for the exact
names). No HTML changes needed; the placeholder swaps out automatically once the real file is
present.

## Adding a PDF (technical report, CV, paper)

1. Drop the PDF into `res/`, e.g. `res/puzzlebot-rplidar-maze-report.pdf`.
2. Each project detail page already has a "Technical Report (PDF)" button in the sidebar pointing
   at `res/<slug>-report.pdf` — just make sure the filename matches, or update the `href`.

## Adding a brand-new project

1. Duplicate any folder in `projects/`, e.g. `projects/new-project/`, and edit its `index.html`.
2. Add matching `images/projects/new-project/` and `videos/projects/new-project/` folders.
3. Add a project card in `projects.html` (and optionally the Featured Projects section of
   `index.html`) linking to `/projects/new-project/index.html`.

## Editing text content

Everything text-based (About Me, hero intro, experience/education dates, skills, certifications,
conference details) is plain HTML — search for `<!-- EDITABLE -->` comments in `index.html` and the
project detail pages for the exact spots meant to be updated first.

## Testing locally before you push

The header/footer are loaded via `fetch()`, which browsers block on `file://` URLs — always serve
the site locally instead of double-clicking `index.html`:

```
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploying

Push to `main` — this is a `<username>.github.io` repo, so GitHub Pages serves it automatically
from the root with no extra configuration.
