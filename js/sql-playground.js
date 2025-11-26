// Caminho completo do arquivo: /js/sql-playground.js
(function () {
  // --- Banco de Dados Mockado (Em Memória) ---
  const db = {
    COUNTRIES: [
      { COUNTRY: 'China', POP: 1398000000, AREA: 9596960 },
      { COUNTRY: 'India', POP: 1366000000, AREA: 3287263 },
      { COUNTRY: 'USA', POP: 331000000, AREA: 9833520 },
      { COUNTRY: 'Brazil', POP: 212000000, AREA: 8516000 },
      { COUNTRY: 'UK', POP: 67000000, AREA: 242495 }
    ],
    PERSONS: [
      { ID: 1, NAME: 'Ada Lovelace', COUNTRY: 'UK', JOB: 'S' },
      { ID: 2, NAME: 'Alan Turing', COUNTRY: 'UK', JOB: 'S' },
      { ID: 3, NAME: 'Grace Hopper', COUNTRY: 'USA', JOB: 'S' },
      { ID: 4, NAME: 'Santos Dumont', COUNTRY: 'Brazil', JOB: 'E' }
    ]
  };

  /**
   * Interpreta e executa a query SQL.
   * Retorna um objeto { headers: [], rows: [] } ou lança erro.
   */
  function execute(query) {
    const cleanQuery = query.trim().replace(/\s+/g, ' ');
    const lowerQuery = cleanQuery.toLowerCase();

    // Simulação de DML (apenas mensagem de sucesso)
    if (/^(insert|update|delete)/i.test(cleanQuery)) {
      return { 
        headers: ['STATUS'], 
        rows: [['Comando executado com sucesso (Simulação). Dados não persistidos.']] 
      };
    }

    // Validação básica
    if (!lowerQuery.startsWith('select')) {
      throw new Error('Apenas comandos SELECT (ou DML simulado) são permitidos.');
    }

    // Regex para extrair partes: SELECT ... FROM ... [WHERE ...] [ORDER BY ...]
    const match = cleanQuery.match(/select\s+(.+)\s+from\s+([a-z0-9_]+)(?:\s+where\s+(.+?))?(?:\s+order by\s+(.+))?$/i);
    
    if (!match) {
      throw new Error('Sintaxe inválida. Estrutura esperada: SELECT colunas FROM tabela [WHERE condicao]');
    }

    const [_, colStr, tableStr, whereStr, orderStr] = match;
    const tableKey = tableStr.toUpperCase();

    if (!db[tableKey]) {
      throw new Error(`Tabela '${tableStr}' não encontrada. Disponíveis: COUNTRIES, PERSONS.`);
    }

    // Copia os dados para não mutar o original
    let rows = [...db[tableKey]];

    // 1. Filtragem (WHERE)
    if (whereStr) {
      const cleanWhere = whereStr.replace(/'/g, ''); // Remove aspas simples para simplificar
      let op = null;
      
      if (cleanWhere.includes('=')) op = '=';
      else if (cleanWhere.includes('>')) op = '>';
      else if (cleanWhere.includes('<')) op = '<';
      else if (cleanWhere.toLowerCase().includes('like')) op = 'like';

      if (op) {
        const parts = cleanWhere.split(new RegExp(op, 'i')).map(p => p.trim());
        const key = parts[0].toUpperCase(); // Coluna
        const val = parts[1]; // Valor

        rows = rows.filter(r => {
          if (r[key] === undefined) return false; // Coluna não existe

          const v1 = r[key]; 
          // Tenta tratar como número se ambos forem numéricos
          const isNum = !isNaN(v1) && !isNaN(val) && val !== '';
          
          if (op === '=') return isNum ? v1 == val : String(v1).toLowerCase() == val.toLowerCase();
          if (op === '>') return isNum ? v1 > val : String(v1) > val;
          if (op === '<') return isNum ? v1 < val : String(v1) < val;
          if (op === 'like') {
             // Simula LIKE 'Texto%' (Começa com)
             const pattern = val.replace(/%/g, '').toLowerCase();
             return String(v1).toLowerCase().startsWith(pattern);
          }
          return false;
        });
      }
    }

    // 2. Ordenação (ORDER BY)
    if (orderStr) {
      const parts = orderStr.trim().split(/\s+/);
      const key = parts[0].toUpperCase();
      const isDesc = parts[1] && parts[1].toLowerCase() === 'desc';

      rows.sort((a, b) => {
        if (a[key] < b[key]) return isDesc ? 1 : -1;
        if (a[key] > b[key]) return isDesc ? -1 : 1;
        return 0;
      });
    }

    // 3. Seleção de Colunas (SELECT)
    const cols = colStr.split(',').map(c => c.trim());
    let finalHeaders = [];
    let finalRows = [];

    if (cols[0] === '*') {
      if (db[tableKey].length > 0) {
        finalHeaders = Object.keys(db[tableKey][0]);
      } else {
        finalHeaders = ['Resultado']; // Fallback se tabela vazia
      }
      finalRows = rows.map(r => Object.values(r));
    } else {
      finalHeaders = cols;
      finalRows = rows.map(r => {
        return cols.map(c => r[c.toUpperCase()] !== undefined ? r[c.toUpperCase()] : 'NULL');
      });
    }

    return { headers: finalHeaders, rows: finalRows };
  }

  /**
   * Renderiza o resultado na DOM.
   * @param {HTMLElement} container - Elemento onde a tabela será injetada.
   * @param {Object} data - Objeto { headers, rows } retornado por runQuery.
   */
  function render(container, data) {
    if (!container) return;
    container.innerHTML = ''; // Limpa anterior

    if (!data || !data.rows || data.rows.length === 0) {
      container.innerHTML = '<div style="color: #666; padding: 0.5rem; font-style: italic;">Nenhum resultado encontrado.</div>';
      return;
    }

    const wrapper = document.createElement('div');
    wrapper.className = 'table-wrapper';

    const table = document.createElement('table');
    table.className = 'table';

    // Cabeçalho
    const thead = document.createElement('thead');
    const trHead = document.createElement('tr');
    data.headers.forEach(h => {
      const th = document.createElement('th');
      th.textContent = h;
      trHead.appendChild(th);
    });
    thead.appendChild(trHead);
    table.appendChild(thead);

    // Corpo
    const tbody = document.createElement('tbody');
    data.rows.forEach(row => {
      const tr = document.createElement('tr');
      row.forEach(cell => {
        const td = document.createElement('td');
        td.textContent = cell;
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);

    wrapper.appendChild(table);
    container.appendChild(wrapper);
  }

  // --- API Pública (Exposta para window) ---
  window.SQLPlayground = {
    // Método 1: Executa e retorna dados (usado pelos scripts inline nos exercícios)
    runQuery: function(sql) {
      return execute(sql);
    },
    
    // Método 2: Renderiza os dados (usado pelos scripts inline nos exercícios)
    renderResult: function(container, data) {
      render(container, data);
    },

    // Método 3: Atalho (Executa e Renderiza direto pelo ID) - Opcional, útil para debug
    run: function(sql, containerId) {
      const container = document.getElementById(containerId);
      try {
        const result = execute(sql);
        render(container, result);
      } catch (e) {
        if(container) container.innerHTML = `<div class="error-message" style="color: #d32f2f;">${e.message}</div>`;
      }
    }
  };
})();
