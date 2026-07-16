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

## Theme (Light / Dark)

- Default is **light**. A toggle button in the nav bar switches themes.
- The choice is saved to `localStorage` and restored on every visit.
- Colors live entirely in CSS custom properties in `css/style.css` under `:root`
  and `[data-theme="dark"]` — edit those two blocks to adjust the palette.

## Adding a profile photo

Replace the placeholder block in `index.html`'s hero section:

```html
<div class="hero-photo-wrap">
  <div class="hero-photo">
    <img src="images/profile.jpg" alt="Diego Quezada Colorado">
  </div>
</div>
```

Delete the `<div class="hero-photo-placeholder">…</div>` markup once the image is in place.

## Replacing a project video

Every featured/detail project card has a placeholder `<video>` pointing at a path like:

```
videos/projects/<slug>/demo.mp4       (card previews on index.html / projects.html)
videos/projects/<slug>/hero.mp4       (large hero video on the project detail page)
```

1. Drop your `.mp4` into the matching folder.
2. The `<video autoplay loop muted playsinline>` tag is already wired up — no HTML changes needed
   if you keep the same filename. Otherwise update the `<source src="...">`.
3. The dashed placeholder box automatically sits behind the video and is simply hidden once real
   video content is present visually; you can delete the `.project-media-placeholder` /
   `.gallery-placeholder` `<div>` once you've added real media, though leaving it is harmless.

## Adding a photo to a project gallery

Drop the file into `images/projects/<slug>/` and replace the corresponding
`<div class="gallery-item">` placeholder with:

```html
<div class="gallery-item">
  <img src="../../images/projects/<slug>/01.jpg" alt="Description">
</div>
```

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
