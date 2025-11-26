// Caminho completo do arquivo: /js/lang.js
(function () {
  const STORAGE_KEY = 'sqlhub-lang';
  
  // Dicionário completo da Interface
  const dictionary = {
    'pt-BR': {
      site_title: 'SQL Learning Hub',
      site_subtitle: 'Bancos de Dados Relacionais e Não Relacionais',
      
      // Menu Principal
      menu_home: 'Início',
      menu_relational: 'Banco de Dados Relacional',
      menu_relational_beginner: 'Iniciantes',
      menu_relational_dml: 'Manipulação (DML)',
      menu_relational_ddl: 'Objetos (DDL)',
      menu_relational_intermediate: 'Intermediário',
      menu_relational_advanced: 'Avançado',
      menu_relational_beginner_exercises: 'Exercícios (Iniciantes)',
      menu_relational_intermediate_exercises: 'Exercícios (Médio)',
      menu_relational_advanced_exercises: 'Exercícios (Avançado)',
      menu_relational_projects: 'Projetos Práticos',
      menu_relational_realworld: 'Aplicações Reais',
      
      menu_nosql: 'Banco de Dados Não Relacional',
      menu_nosql_beginner: 'Iniciantes',
      menu_nosql_intermediate: 'Intermediário',
      menu_nosql_advanced: 'Avançado',
      menu_nosql_exercises: 'Exercícios',
      menu_nosql_beginner_exercises: 'Exercícios (Iniciantes)', // Caso exista específico
      menu_nosql_intermediate_exercises: 'Exercícios (Médio)',
      menu_nosql_advanced_exercises: 'Exercícios (Avançado)',
      menu_nosql_beginner_slides: 'Iniciantes - Slides',
      menu_nosql_intermediate_slides: 'Intermediário - Slides',
      menu_nosql_advanced_slides: 'Avançado - Slides',
      menu_nosql_projects: 'Projetos Práticos',
      menu_nosql_realworld: 'Aplicações Reais',

      // Breadcrumb e Footer
      breadcrumb_home: 'Início',
      footer_text: 'Conteúdo didático baseado em materiais de referência (SQL Basics, Data Analysis).',
      
      // Home Content (Fallback)
      home_welcome: 'Bem-vindo ao SQL Learning Hub',
      home_lead: 'Seu guia completo para dominar bancos de dados, do zero ao avançado.',
      home_desc: 'Este ambiente apoia o estudo de bancos relacionais e NoSQL. Selecione um tópico para começar.'
    },
    'en-US': {
      site_title: 'SQL Learning Hub',
      site_subtitle: 'Relational and Non-Relational Databases',
      
      // Main Menu
      menu_home: 'Home',
      menu_relational: 'Relational Database',
      menu_relational_beginner: 'Beginners',
      menu_relational_dml: 'Data Manipulation (DML)',
      menu_relational_ddl: 'Objects (DDL)',
      menu_relational_intermediate: 'Intermediate',
      menu_relational_advanced: 'Advanced',
      menu_relational_beginner_exercises: 'Exercises (Beginner)',
      menu_relational_intermediate_exercises: 'Exercises (Intermediate)',
      menu_relational_advanced_exercises: 'Exercises (Advanced)',
      menu_relational_projects: 'Practical Projects',
      menu_relational_realworld: 'Real World Apps',
      
      menu_nosql: 'Non-Relational Database',
      menu_nosql_beginner: 'Beginners',
      menu_nosql_intermediate: 'Intermediate',
      menu_nosql_advanced: 'Advanced',
      menu_nosql_exercises: 'Exercises',
      menu_nosql_beginner_exercises: 'Exercises (Beginner)',
      menu_nosql_intermediate_exercises: 'Exercises (Intermediate)',
      menu_nosql_advanced_exercises: 'Exercises (Advanced)',
      menu_nosql_beginner_slides: 'Beginner - Slides',
      menu_nosql_intermediate_slides: 'Intermediate - Slides',
      menu_nosql_advanced_slides: 'Advanced - Slides',
      menu_nosql_projects: 'Practical Projects',
      menu_nosql_realworld: 'Real World Apps',

      // Breadcrumb and Footer
      breadcrumb_home: 'Home',
      footer_text: 'Educational content based on reference materials (SQL Basics, Data Analysis).',

      // Home Content (Fallback)
      home_welcome: 'Welcome to SQL Learning Hub',
      home_lead: 'Your complete guide to mastering databases, from zero to hero.',
      home_desc: 'This environment supports the study of Relational and NoSQL databases. Select a topic to start.'
    }
  };

  function updateStaticTexts(lang) {
    const texts = dictionary[lang] || dictionary['pt-BR'];
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (texts[key]) {
        el.textContent = texts[key];
      }
    });
    document.documentElement.lang = lang;
  }

  function updateTheme(lang) {
    const brTheme = document.getElementById('theme-brazil');
    const usTheme = document.getElementById('theme-usa');

    if (lang === 'en-US') {
      usTheme.removeAttribute('disabled');
      brTheme.setAttribute('disabled', 'true');
    } else {
      brTheme.removeAttribute('disabled');
      usTheme.setAttribute('disabled', 'true');
    }
  }

  function setLanguage(lang) {
    localStorage.setItem(STORAGE_KEY, lang);
    updateTheme(lang);
    updateStaticTexts(lang);
    
    // Dispara evento customizado para o main.js recarregar o conteúdo
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: lang }));
  }

  // Inicialização
  const savedLang = localStorage.getItem(STORAGE_KEY) || 'pt-BR';
  // Aplica sem disparar evento de recarga na inicialização para evitar loop
  updateTheme(savedLang);
  updateStaticTexts(savedLang);

  // Listeners
  document.querySelectorAll('.lang-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      setLanguage(lang);
    });
  });

  // Expor API
  window.SQLHubLang = {
    current: () => localStorage.getItem(STORAGE_KEY) || 'pt-BR'
  };
})();
