// Caminho completo do arquivo: /js/lang.js
/*
  Responsabilidades deste módulo:
  - Gerenciar idioma atual (pt-BR / en-US) em memória e em localStorage.
  - Atualizar textos marcados com data-i18n.
  - Acionar alternância de temas (Brasil/EUA) conectando idioma com paleta de cores. [attached_file:24]
*/

(function () {
    const STORAGE_KEY = 'sqlhub-lang';
  
    // Dicionário mínimo inicial; ao preencher conteúdo em /content/, podemos expandir.
    const translations = {
      'pt-BR': {
        site_title: 'SQL Learning Hub',
        site_subtitle: 'Bancos de Dados Relacionais e Não Relacionais',
        home_title: 'Bem-vindo ao SQL Learning Hub',
        home_intro_1:
          'Este ambiente foi criado para apoiar o estudo de bancos de dados relacionais e não relacionais, com foco em SQL para análise de dados.',
        home_intro_2:
          'Use o menu lateral para navegar entre níveis, exercícios com playground SQL, slides e projetos práticos.',
        breadcrumb_home: 'Início'
      },
      'en-US': {
        site_title: 'SQL Learning Hub',
        site_subtitle: 'Relational and Non-Relational Databases',
        home_title: 'Welcome to SQL Learning Hub',
        home_intro_1:
          'This environment supports the study of relational and non-relational databases, with a strong focus on SQL for data analysis.',
        home_intro_2:
          'Use the left menu to navigate between levels, SQL playground exercises, slides, and practical projects.',
        breadcrumb_home: 'Home'
      }
    };
  
    function applyLanguage(lang) {
      const dict = translations[lang] || translations['pt-BR'];
      const elements = document.querySelectorAll('[data-i18n]');
  
      elements.forEach((el) => {
        const key = el.getAttribute('data-i18n');
        if (key && dict[key]) {
          el.textContent = dict[key];
        }
      });
  
      document.documentElement.lang = lang;
    }
  
    function switchThemeByLang(lang) {
      const brazilTheme = document.getElementById('theme-brazil');
      const usaTheme = document.getElementById('theme-usa');
  
      if (!brazilTheme || !usaTheme) return;
  
      if (lang === 'en-US') {
        usaTheme.disabled = false;
        brazilTheme.disabled = true;
      } else {
        brazilTheme.disabled = false;
        usaTheme.disabled = true;
      }
    }
  
    function setLanguage(lang) {
      localStorage.setItem(STORAGE_KEY, lang);
      applyLanguage(lang);
      switchThemeByLang(lang);
    }
  
    // Inicialização: idioma salvo ou padrão pt-BR
    const savedLang = localStorage.getItem(STORAGE_KEY) || 'pt-BR';
    applyLanguage(savedLang);
    switchThemeByLang(savedLang);
  
    // Listeners para botões de idioma
    document.querySelectorAll('.lang-toggle').forEach((btn) => {
      btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang') || 'pt-BR';
        setLanguage(lang);
      });
    });
  
    // Expõe função para outros módulos (por exemplo, conteúdo dinâmico)
    window.SQLHubLang = {
      getCurrentLang: () => localStorage.getItem(STORAGE_KEY) || 'pt-BR',
      setLanguage
    };
  })();
  