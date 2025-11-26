// Caminho completo do arquivo: /js/main.js
(function () {
  const contentArea = document.getElementById('content-area');
  const breadcrumbSection = document.getElementById('breadcrumb-section');
  const breadcrumbLevel = document.getElementById('breadcrumb-level');
  const backToTopBtn = document.getElementById('back-to-top');
  
  // Estado atual da navegação
  let currentSection = 'home';
  let currentLevel = 'index';

  // --- Botão Voltar ao Topo ---
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      backToTopBtn.classList.toggle('visible', window.scrollY > 300);
    });
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- Carregamento de Conteúdo ---
  async function loadContent(section, level) {
    currentSection = section;
    currentLevel = level;
    
    // Verifica idioma atual
    const lang = window.SQLHubLang ? window.SQLHubLang.current() : 'pt-BR';
    const isEn = lang === 'en-US';
    
    // Define nome do arquivo: se inglês, adiciona sufixo "-en"
    // Ex: iniciantes.html -> iniciantes-en.html
    const suffix = isEn ? '-en' : '';
    const url = `./content/${section}/${level}${suffix}.html`;

    // Fallback: Se tentar carregar inglês e falhar, avisa ou carrega PT?
    // Nesta implementação, vamos tentar carregar. Se falhar (404), mostramos erro amigável.
    
    try {
      contentArea.style.opacity = '0.5';
      
      const response = await fetch(url);
      if (!response.ok) {
        // Se for erro 404 em inglês, tenta carregar a versão PT como fallback silencioso?
        // Ou mostra erro. Vamos mostrar erro para incentivar a criação dos arquivos.
        if (isEn && response.status === 404) {
          throw new Error(`English content not found for this section. (${level}-en.html)`);
        }
        throw new Error(`HTTP ${response.status}`);
      }
      
      const html = await response.text();
      contentArea.innerHTML = html;
      
      // Scripts
      contentArea.querySelectorAll('script').forEach(oldScript => {
        const newScript = document.createElement('script');
        if (oldScript.src) newScript.src = oldScript.src;
        else newScript.textContent = oldScript.textContent;
        document.body.appendChild(newScript);
      });

      // Acessibilidade
      const h1 = contentArea.querySelector('h1');
      if (h1) h1.focus();

    } catch (error) {
      const msg = isEn 
        ? `<h2>Content Not Available</h2><p>We couldn't find the English version of this topic yet.</p><small>Error: ${error.message}</small>`
        : `<h2>Conteúdo Indisponível</h2><p>Não foi possível carregar este tópico.</p><small>Erro: ${error.message}</small>`;
      
      contentArea.innerHTML = `<div class="alert-box" style="background:#ffebee; border-color:#c62828; color:#b71c1c;">${msg}</div>`;
    } finally {
      contentArea.style.opacity = '1';
    }
  }

  // --- Renderizar Home ---
  function renderHome() {
    currentSection = 'home';
    currentLevel = 'index';
    const lang = window.SQLHubLang ? window.SQLHubLang.current() : 'pt-BR';
    const isEn = lang === 'en-US';

    if (isEn) {
      contentArea.innerHTML = `
        <h1>Welcome to SQL Learning Hub</h1>
        <p class="lead">Your complete guide to mastering databases, from zero to hero.</p>
        <p>This environment supports the study of Relational and Non-Relational databases, focusing on SQL for data analysis.</p>
        <p>Select a topic from the side menu to begin your journey.</p>
      `;
      if(breadcrumbSection) breadcrumbSection.textContent = 'Home';
      if(breadcrumbLevel) breadcrumbLevel.textContent = '';
    } else {
      contentArea.innerHTML = `
        <h1>Bem-vindo ao SQL Learning Hub</h1>
        <p class="lead">Seu guia completo para dominar bancos de dados, do zero ao avançado.</p>
        <p>Este ambiente foi criado para apoiar o estudo de bancos de dados relacionais e não relacionais.</p>
        <p>Selecione um tópico no menu lateral para começar sua jornada.</p>
      `;
      if(breadcrumbSection) breadcrumbSection.textContent = 'Início';
      if(breadcrumbLevel) breadcrumbLevel.textContent = '';
    }
  }

  // --- Listeners ---
  
  // Clique no Menu
  document.querySelectorAll('.side-nav__link').forEach(link => {
    link.addEventListener('click', () => {
      const section = link.getAttribute('data-section');
      const level = link.getAttribute('data-level');
      
      if (section === 'home') {
        renderHome();
      } else {
        loadContent(section, level);
      }
      
      // Mobile close
      const nav = document.getElementById('side-nav');
      if (window.innerWidth <= 768) nav.classList.remove('side-nav--open');
    });
  });

  // Mudança de Idioma (Recarrega conteúdo atual)
  window.addEventListener('languageChanged', () => {
    if (currentSection === 'home') {
      renderHome();
    } else {
      loadContent(currentSection, currentLevel);
    }
  });

  // Inicialização
  renderHome();
})();
