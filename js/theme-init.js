/* Runs synchronously in <head> before first paint to avoid a light/dark flash. */
(function () {
  try {
    var saved = localStorage.getItem('theme');
    var theme = saved === 'dark' || saved === 'light' ? saved : 'light';
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();
