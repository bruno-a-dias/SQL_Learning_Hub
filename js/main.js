// Caminho completo do arquivo: /js/main.js
(function () {
  const contentArea = document.getElementById('content-area');
  const breadcrumbSection = document.getElementById('breadcrumb-section');
  const breadcrumbLevel = document.getElementById('breadcrumb-level');
  const backToTopBtn = document.getElementById('back-to-top');

  // --- Botão Voltar ao Topo ---
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- Carregamento de Conteúdo ---
  async function loadContent(section, level) {
    const url = `./content/${section}/${level}.html`;
    
    try {
      contentArea.style.opacity = '0.5';
      
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      const html = await response.text();
      contentArea.innerHTML = html;
      
      // Atualiza Breadcrumbs e Títulos
      const sectionName = section === 'relacional' ? 'Banco de Dados Relacional' : 'NoSQL';
      let levelName = level.replace(/-/g, ' ');
      // Capitaliza primeira letra
      levelName = levelName.charAt(0).toUpperCase() + levelName.slice(1);
      
      if (breadcrumbSection) breadcrumbSection.textContent = sectionName;
      if (breadcrumbLevel) breadcrumbLevel.textContent = levelName;

      // Re-executa scripts embutidos no HTML carregado (necessário para Slides/Playground)
      const scripts = contentArea.querySelectorAll('script');
      scripts.forEach(oldScript => {
        const newScript = document.createElement('script');
        if (oldScript.src) newScript.src = oldScript.src;
        else newScript.textContent = oldScript.textContent;
        document.body.appendChild(newScript);
      });

      // Acessibilidade: focar no H1
      const h1 = contentArea.querySelector('h1');
      if (h1) h1.focus();

    } catch (error) {
      contentArea.innerHTML = `
        <div class="alert-box" style="background:#ffebee; border-color:#d32f2f; color:#c62828;">
          <h2>Erro ao carregar conteúdo</h2>
          <p>Não foi possível acessar: <strong>${url}</strong></p>
          <p>Detalhes: ${error.message}</p>
          <p><em>Nota: Este projeto deve rodar em um servidor local (http://localhost) para que o carregamento dinâmico funcione.</em></p>
        </div>
      `;
    } finally {
      contentArea.style.opacity = '1';
    }
  }

  // --- Navegação ---
  document.querySelectorAll('.side-nav__link').forEach(link => {
    link.addEventListener('click', (e) => {
      const section = link.getAttribute('data-section');
      const level = link.getAttribute('data-level');
      
      // Lógica para Home (não usa fetch)
      if (section === 'home') {
        contentArea.innerHTML = `
          <h1 data-i18n="home_title">Bem-vindo ao SQL Learning Hub</h1>
          <p class="lead">Seu guia completo para dominar bancos de dados, do zero ao avançado.</p>
          <p>Este ambiente foi criado para apoiar o estudo de bancos de dados relacionais e não relacionais, com foco em SQL para análise de dados, inspirado nos materiais anexados ao projeto.</p>
          <p>Selecione um tópico no menu lateral para começar sua jornada.</p>
        `;
        if (breadcrumbSection) breadcrumbSection.textContent = 'Início';
        if (breadcrumbLevel) breadcrumbLevel.textContent = '';
      } else if (section && level) {
        loadContent(section, level);
      }

      // Mobile: fecha menu
      const nav = document.getElementById('side-nav');
      const toggle = document.querySelector('.nav-toggle');
      if (window.innerWidth <= 768 && nav.classList.contains('side-nav--open')) {
        nav.classList.remove('side-nav--open');
        if(toggle) toggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
})();
