# diegoquezadaco.github.io

## Structure

```
index.html            Home page
projects.html          Full project listing
projects/<slug>/       One folder per project, index.html is the detail page
images/projects/<slug> Photos / screenshots for that project
videos/projects/<slug> Demo clips (.mp4) for that project
res/                    CV and any other downloadable PDFs
partials/               Shared header.html and footer.html
css/style.css           All site styles
js/main.js              Loads partials + nav/scroll behavior
```

## Adding a photo or video to an existing project

1. Drop the file into `images/projects/<slug>/` or `videos/projects/<slug>/`.
2. Open `projects/<slug>/index.html` and point the `<img src="...">` or
   `<source src="...">` at the file you just added.
3. Commit and push — GitHub Pages picks it up automatically.

## Adding a PDF (paper, report, CV)

1. Drop the PDF anywhere sensible, e.g. `projects/<slug>/paper.pdf` or `res/cv.pdf`.
2. Link it directly with `<a href="/projects/<slug>/paper.pdf">...</a>`,
   or embed it inline like the `hrc-digital-twins` project does with
   `<object data="..." type="application/pdf">`.

## Adding a brand new project

1. Duplicate any folder in `projects/` and rename it, e.g. `projects/new-project/`.
2. Edit `projects/new-project/index.html` with the new content.
3. Add a card for it in `projects.html` (and optionally `index.html`) linking
   to `/projects/new-project/`.
4. Create matching `images/projects/new-project/` and
   `videos/projects/new-project/` folders for its media.

## Testing locally before you push

Browsers block `fetch()` on local files, which the header/footer partials
rely on — so open the site through a local server, not by double-clicking
`index.html`:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000` in your browser.

## Deploying

Push to `main` — this repo is a `<username>.github.io` repo, so GitHub
Pages serves it automatically from the root, no extra config needed.
