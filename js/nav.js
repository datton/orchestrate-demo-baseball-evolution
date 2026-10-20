// Navigation behaviour (owner: UI/UX).
// Marks the nav link for the section being read (aria-current="true") and moves
// keyboard focus to the target when an in-page link or the skip link is used.
(function () {
  var links = Array.prototype.slice.call(document.querySelectorAll('.site-header nav a[href^="#"]'));
  var sections = links.map(function (a) { return document.getElementById(a.getAttribute('href').slice(1)); });

  function mark(id) {
    links.forEach(function (a) {
      if (a.getAttribute('href') === '#' + id) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    });
  }

  function update() {
    var line = window.innerHeight * 0.3, current = null;
    sections.forEach(function (s) { if (s && s.getBoundingClientRect().top <= line) current = s; });
    if (current) mark(current.id); else mark('');
  }

  function focusTarget(e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a || a.getAttribute('href').length < 2) return;
    var t = document.getElementById(a.getAttribute('href').slice(1));
    if (!t) return;
    t.setAttribute('tabindex', '-1');
    t.focus({ preventScroll: true });
  }

  document.addEventListener('click', focusTarget);
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
})();
