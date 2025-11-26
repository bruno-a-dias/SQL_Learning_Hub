// Caminho completo do arquivo: /js/nav.js
(function () {
  const nav = document.getElementById('side-nav');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelectorAll('.side-nav__link');

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('side-nav--open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      if (isOpen) {
        const firstLink = nav.querySelector('.side-nav__link');
        if (firstLink) firstLink.focus();
      }
    });

    document.addEventListener('click', (e) => {
      if (nav.classList.contains('side-nav--open') && 
          !nav.contains(e.target) && 
          !navToggle.contains(e.target)) {
        nav.classList.remove('side-nav--open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.forEach((l) => l.classList.remove('side-nav__link--active'));
      link.classList.add('side-nav__link--active');
    });
  });
})();
