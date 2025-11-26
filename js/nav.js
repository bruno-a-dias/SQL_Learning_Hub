// Caminho completo do arquivo: /js/nav.js
(function () {
  const nav = document.getElementById('side-nav');
  const navToggle = document.querySelector('.nav-toggle');
  // Seleciona apenas links que carregam conteúdo, ignora os botões de grupo
  const navLinks = document.querySelectorAll('.side-nav__link');

  // Controle do Menu Mobile
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('side-nav--open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      
      // Acessibilidade: focar no primeiro link ao abrir
      if (isOpen) {
        const firstLink = nav.querySelector('.side-nav__link');
        if (firstLink) firstLink.focus();
      }
    });

    // Fechar ao clicar fora (opcional, mas boa prática de UX)
    document.addEventListener('click', (e) => {
      if (nav.classList.contains('side-nav--open') && 
          !nav.contains(e.target) && 
          !navToggle.contains(e.target)) {
        nav.classList.remove('side-nav--open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Gerenciamento de estado "Ativo" dos links
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      // Remove ativo de todos
      navLinks.forEach((l) => l.classList.remove('side-nav__link--active'));
      
      // Adiciona ao clicado
      link.classList.add('side-nav__link--active');

      // Mobile: fecha o menu automaticamente após clicar em um link
      if (window.innerWidth <= 768 && nav.classList.contains('side-nav--open')) {
        nav.classList.remove('side-nav--open');
        navToggle?.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Acessibilidade: Fechar com ESC
  nav?.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav.classList.contains('side-nav--open')) {
      nav.classList.remove('side-nav--open');
      navToggle?.setAttribute('aria-expanded', 'false');
      navToggle?.focus();
    }
  });
})();
