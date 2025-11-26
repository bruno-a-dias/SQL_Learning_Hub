// Caminho completo do arquivo: /js/main.js
/*
  Responsabilidades deste módulo:
  - Orquestrar a navegação entre seções carregando arquivos em /content/ via fetch.
  - Sincronizar breadcrumb, foco e idioma atual.
  - Servir como ponto de entrada da aplicação no lado do cliente.
*/

(function () {
    const contentArea = document.getElementById('content-area');
    const breadcrumbSection = document.getElementById('breadcrumb-section');
    const breadcrumbLevel = document.getElementById('breadcrumb-level');
  
    // Mapeia (section, level) -> caminho do arquivo de conteúdo a ser carregado
    function getContentPath(section, level) {
      // Exemplo: /content/relational/iniciantes.html
      return `./content/${section}/${level}.html`;
    }
  
    async function loadSection(section, level) {
      const path = getContentPath(section, level);
  
      try {
        const response = await fetch(path);
        if (!response.ok) {
          throw new Error(`Erro ao carregar conteúdo de ${path}.`);
        }
        const html = await response.text();
        contentArea.innerHTML = html;
  
        // Atualiza breadcrumb com rótulos simples (podem ser refinados com base no idioma).
        breadcrumbSection.textContent =
          section === 'relational' ? 'Banco de Dados Relacional' : 'Banco de Dados Não Relacional';
        breadcrumbLevel.textContent = level.replace('-', ' ');
  
        // Move foco para o início do conteúdo para acessibilidade.
        const firstHeading = contentArea.querySelector('h1, h2, h3');
        (firstHeading || contentArea).focus();
      } catch (error) {
        contentArea.innerHTML = `<p>Não foi possível carregar o conteúdo solicitado. Verifique se o arquivo ${path} existe.</p>`;
      }
    }
  
    // Listener para cliques nos itens de navegação (já criados em index.html)
    document.querySelectorAll('.side-nav__link').forEach((button) => {
      button.addEventListener('click', () => {
        const section = button.getAttribute('data-section');
        const level = button.getAttribute('data-level');
        if (section && level) {
          loadSection(section, level);
        }
      });
    });
  
    // Carrega a seção padrão na primeira visita
    loadSection('relational', 'iniciantes');
  })();
  