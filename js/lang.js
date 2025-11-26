// Caminho completo do arquivo: /js/lang.js
(function () {
  const STORAGE_KEY = 'sqlhub-lang';
  
  // Dicionário de traduções para elementos estáticos da UI (Header, Footer)
  const dictionary = {
    'pt-BR': {
      site_title: 'SQL Learning Hub',
      site_subtitle: 'Bancos de Dados Relacionais e Não Relacionais',
      menu_relational: 'Banco de Dados Relacional',
      menu_nosql: 'Banco de Dados Não Relacional',
      breadcrumb_home: 'Início',
      footer_text: 'Conteúdo didático baseado em materiais de referência sobre SQL e Data Analysis.'
    },
    'en-US': {
      site_title: 'SQL Learning Hub',
      site_subtitle: 'Relational and Non-Relational Databases',
      menu_relational: 'Relational Database',
      menu_nosql: 'Non-Relational Database',
      breadcrumb_home: 'Home',
      footer_text: 'Educational content based on reference materials about SQL and Data Analysis.'
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
    // Nota: Para uma implementação completa, o conteúdo dinâmico (arquivos .html) 
    // também precisaria ter versões em inglês. Por enquanto, muda a interface.
  }

  // Inicialização
  const savedLang = localStorage.getItem(STORAGE_KEY) || 'pt-BR';
  setLanguage(savedLang);

  // Event Listeners
  document.querySelectorAll('.lang-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      setLanguage(lang);
    });
  });

  // Expor para uso externo se necessário
  window.CurrentLang = savedLang;
})();
