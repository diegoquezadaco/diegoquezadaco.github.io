/* ==========================================================================
   Diego Quezada Colorado — Portfolio
   Theme toggle · partial includes · mobile nav · scroll reveal
   ========================================================================== */

/**
 * Resolves a relative path ("partials/header.html") against the root,
 * since project detail pages live one level deeper (/projects/<slug>/).
 */
function resolvePath(path) {
  var depth = document.body.getAttribute('data-root-depth') || '0';
  var prefix = '../'.repeat(parseInt(depth, 10));
  return prefix + path;
}

async function loadPartial(selector, file) {
  var target = document.querySelector(selector);
  if (!target) return;
  try {
    var res = await fetch(resolvePath(file));
    var html = await res.text();
    target.innerHTML = html;
  } catch (err) {
    console.error('Could not load partial:', file, err);
  }
}

function fixRelativeLinks(root) {
  // Header/footer partials use root-absolute-style "/index.html" paths for
  // simplicity in the source; rewrite them to work from nested project pages.
  var depth = parseInt(document.body.getAttribute('data-root-depth') || '0', 10);
  if (depth === 0) return;
  var prefix = '../'.repeat(depth);
  root.querySelectorAll('a[href^="/"]').forEach(function (a) {
    var href = a.getAttribute('href');
    a.setAttribute('href', prefix + href.slice(1));
  });
}

function highlightActiveNav() {
  var key = document.body.getAttribute('data-page');
  if (!key) return;
  document.querySelectorAll('[data-nav-key="' + key + '"]').forEach(function (a) {
    a.classList.add('active');
  });
}

function initMobileNav() {
  var toggle = document.querySelector('[data-mobile-nav-toggle]');
  var menu = document.querySelector('[data-mobile-nav]');
  if (!toggle || !menu) return;
  toggle.addEventListener('click', function () {
    var isOpen = menu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
  menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

function initThemeToggle() {
  var btn = document.querySelector('[data-theme-toggle]');
  if (!btn) return;
  btn.addEventListener('click', function () {
    var current = document.documentElement.getAttribute('data-theme') || 'light';
    var next = current === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });
}

function initScrollReveal() {
  var items = document.querySelectorAll('.reveal');
  if (!items.length) return;
  if (!('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  items.forEach(function (el) { observer.observe(el); });
}

function initFooterYear() {
  var el = document.querySelector('[data-year]');
  if (el) el.textContent = new Date().getFullYear();
}

function initHeaderScrollState() {
  var header = document.querySelector('.site-header');
  if (!header) return;
  var lastY = window.scrollY;
  window.addEventListener('scroll', function () {
    header.style.boxShadow = window.scrollY > 4 ? 'var(--shadow-sm)' : 'none';
    lastY = window.scrollY;
  }, { passive: true });
}

document.addEventListener('DOMContentLoaded', async function () {
  await loadPartial('[data-include="header"]', 'partials/header.html');
  await loadPartial('[data-include="footer"]', 'partials/footer.html');

  fixRelativeLinks(document);
  highlightActiveNav();
  initMobileNav();
  initThemeToggle();
  initFooterYear();
  initHeaderScrollState();
  initScrollReveal();
});
