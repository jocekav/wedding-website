(function () {
  var STORAGE_KEY = 'envelopeOpened';
  var overlay = document.getElementById('envelopeOverlay');
  var stage = document.getElementById('envelopeStage');

  if (!overlay || !stage) return;

  // Already opened this session — skip straight past it, no flash of content.
  if (sessionStorage.getItem(STORAGE_KEY) === 'true') {
    overlay.classList.add('is-hidden');
    return;
  }

  // Lock background scroll while the envelope is showing.
  document.body.style.overflow = 'hidden';

  function openEnvelope() {
    if (stage.classList.contains('is-opened')) return;

    stage.classList.add('is-opened');
    overlay.classList.add('is-opened');
    sessionStorage.setItem(STORAGE_KEY, 'true');
    document.body.style.overflow = '';

    var prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    var delay = prefersReducedMotion ? 250 : 1300;

    window.setTimeout(function () {
      overlay.classList.add('is-hidden');
    }, delay);
  }

  stage.addEventListener('click', openEnvelope);

  stage.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openEnvelope();
    }
  });
})();