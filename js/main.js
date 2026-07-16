async function includePartials(){
  const nodes = document.querySelectorAll('[data-include]');
  await Promise.all(Array.from(nodes).map(async (el) => {
    const file = el.getAttribute('data-include');
    const res = await fetch(file);
    el.innerHTML = await res.text();
  }));
}

function markActiveNav(){
  const path = window.location.pathname;
  document.querySelectorAll('nav a').forEach((a) => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });
}

function wireNavToggle(){
  const toggle = document.getElementById('navToggle');
  const list = document.getElementById('navList');
  if (!toggle || !list) return;
  toggle.addEventListener('click', function(){
    const open = list.classList.toggle('open');
    this.setAttribute('aria-expanded', open);
  });
}

function wireReveal(){
  const targets = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('in'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  targets.forEach((el) => observer.observe(el));
}

includePartials().then(() => {
  markActiveNav();
  wireNavToggle();
  wireReveal();
});
