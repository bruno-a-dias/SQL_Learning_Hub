// Caminho completo do arquivo: /js/nav.js
/*
  Responsabilidades deste módulo:
  - Controlar a abertura/fechamento do menu lateral em dispositivos móveis.
  - Gerenciar o estado "ativo" dos itens de navegação.
  - Manter boas práticas de acessibilidade: aria-expanded, foco, navegação por teclado. [web:5][web:9]
*/

(function () {
    const nav = document.getElementById('side-nav');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelectorAll('.side-nav__link');
  
    if (navToggle && nav) {
      navToggle.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('side-nav--open');
        navToggle.setAttribute('aria-expanded', String(isOpen));
        if (isOpen) {
          // Move foco para o primeiro item do menu para facilitar uso por teclado
          const firstLink = nav.querySelector('.side-nav__link');
          if (firstLink) {
            firstLink.focus();
          }
        }
      });
    }
  
    // Fecha o menu ao pressionar ESC quando o foco estiver dentro da navegação
    nav?.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        nav.classList.remove('side-nav--open');
        navToggle?.setAttribute('aria-expanded', 'false');
        navToggle?.focus();
      }
    });
  
    // Atualiza estado visual do item ativo com base no clique
    navLinks.forEach((button) => {
      button.addEventListener('click', () => {
        navLinks.forEach((b) => b.classList.remove('side-nav__link--active'));
        button.classList.add('side-nav__link--active');
  
        // Em telas pequenas, fecha o menu após selecionar uma opção
        if (window.innerWidth <= 767 && nav.classList.contains('side-nav--open')) {
          nav.classList.remove('side-nav--open');
          navToggle?.setAttribute('aria-expanded', 'false');
        }
      });
    });
  })();
  