// Caminho completo do arquivo: /js/main.js
(function () {
  const contentArea = document.getElementById('content-area');
  const breadcrumbSection = document.getElementById('breadcrumb-section');
  const breadcrumbLevel = document.getElementById('breadcrumb-level');

  /**
   * Carrega conteúdo HTML de um arquivo externo.
   * IMPORTANTE: Scripts dentro do HTML injetado via innerHTML não rodam automaticamente.
   * Precisamos extraí-los e executá-los manualmente.
   */
  async function loadContent(section, level) {
    const url = `./content/${section}/${level}.html`;
    
    try {
      contentArea.style.opacity = '0.5'; // Feedback visual de carregamento
      
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      const html = await response.text();
      contentArea.innerHTML = html;
      
      // Atualiza Breadcrumbs
      const sectionName = section === 'relacional' ? 'Banco de Dados Relacional' : 'NoSQL';
      const levelName = level.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      
      if (breadcrumbSection) breadcrumbSection.textContent = sectionName;
      if (breadcrumbLevel) breadcrumbLevel.textContent = levelName;

      // RE-EXECUÇÃO DE SCRIPTS
      // O navegador não executa <script> inserido via innerHTML.
      // Precisamos encontrar todos os scripts no novo conteúdo e recriá-los.
      const scripts = contentArea.querySelectorAll('script');
      scripts.forEach(oldScript => {
        const newScript = document.createElement('script');
        // Se tiver src, copia. Se tiver conteúdo inline, copia.
        if (oldScript.src) {
          newScript.src = oldScript.src;
        } else {
          newScript.textContent = oldScript.textContent;
        }
        document.body.appendChild(newScript);
        // Opcional: remover o script antigo ou o novo após execução para limpeza
      });

      // Acessibilidade: focar no título principal
      const h1 = contentArea.querySelector('h1');
      if (h1) h1.focus();

    } catch (error) {
      contentArea.innerHTML = `
        <div class="alert-box" style="background:#ffebee; border-color:#d32f2f; color:#c62828;">
          <h2>Erro ao carregar conteúdo</h2>
          <p>Não foi possível acessar: <strong>${url}</strong></p>
          <p>Detalhes: ${error.message}</p>
          <p><em>Verifique se você está rodando via servidor local (http://localhost) e não direto do arquivo (file://), pois requisições fetch são bloqueadas pelo navegador em arquivos locais.</em></p>
        </div>
      `;
    } finally {
      contentArea.style.opacity = '1';
    }
  }

  // Listener para navegação
  document.querySelectorAll('.side-nav__link').forEach(link => {
    link.addEventListener('click', (e) => {
      // Previne comportamento padrão se for link real (embora estejamos usando buttons/divs)
      // e pega os atributos
      const section = link.getAttribute('data-section');
      const level = link.getAttribute('data-level');
      
      if (section && level) {
        loadContent(section, level);
        
        // Mobile: Fecha menu após clique
        const nav = document.getElementById('side-nav');
        if (nav && window.innerWidth <= 768) {
          nav.classList.remove('side-nav--open');
        }
      }
    });
  });

  // Carregamento Inicial (Landing Page ou Primeira Seção)
  // Se quiser iniciar em "Iniciantes": loadContent('relacional', 'iniciantes');
})();
