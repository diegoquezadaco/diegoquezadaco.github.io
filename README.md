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

