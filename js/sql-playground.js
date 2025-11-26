// Caminho completo do arquivo: /js/sql-playground.js
(function () {
  // Mini banco de dados em memória (Mock)
  const db = {
    COUNTRIES: [
      { COUNTRY: 'China', POP: 1398000000, AREA: 9596960, LITERACY: 96 },
      { COUNTRY: 'India', POP: 1366000000, AREA: 3287263, LITERACY: 74 },
      { COUNTRY: 'USA', POP: 331000000, AREA: 9833520, LITERACY: 99 },
      { COUNTRY: 'Brazil', POP: 212000000, AREA: 8516000, LITERACY: 94 },
      { COUNTRY: 'UK', POP: 67000000, AREA: 242495, LITERACY: 99 }
    ],
    PERSONS: [
      { ID: 1, NAME: 'Ada Lovelace', COUNTRY: 'UK', JOB: 'S' },
      { ID: 2, NAME: 'Alan Turing', COUNTRY: 'UK', JOB: 'S' },
      { ID: 3, NAME: 'Grace Hopper', COUNTRY: 'USA', JOB: 'S' },
      { ID: 4, NAME: 'Pelé', COUNTRY: 'Brazil', JOB: 'E' }
    ]
  };

  /**
   * Executa uma query SQL simulada (apenas SELECT simples).
   * @param {string} query - Comando SQL
   * @returns {object} { headers: [], rows: [] }
   */
  function execute(query) {
    // Normaliza a query
    const cleanQuery = query.trim().replace(/\s+/g, ' ');
    
    // Validação básica de segurança/syntax
    if (!cleanQuery.toLowerCase().startsWith('select')) {
      throw new Error('Apenas comandos SELECT são permitidos neste playground.');
    }

    // Regex simples para extrair partes: SELECT (cols) FROM (table) [WHERE (cond)] [ORDER BY (order)]
    // Nota: Esta é uma implementação pedagógica frágil, não um parser SQL real.
    const match = cleanQuery.match(/select\s+(.+)\s+from\s+([a-zA-Z0-9_]+)(?:\s+where\s+(.+?))?(?:\s+order by\s+(.+))?$/i);

    if (!match) {
      throw new Error('Sintaxe inválida. Use: SELECT colunas FROM tabela [WHERE condicao]');
    }

    const [_, colString, tableName, whereClause, orderClause] = match;
    const tableKey = tableName.toUpperCase();
    const cols = colString.split(',').map(c => c.trim());

    if (!db[tableKey]) {
      throw new Error(`Tabela '${tableName}' não encontrada. Tabelas disponíveis: COUNTRIES, PERSONS.`);
    }

    let results = [...db[tableKey]];

    // 1. Filtragem (WHERE) - Suporte muito básico a =, >, <, LIKE
    if (whereClause) {
      // Exemplo de parsing ingênuo: assume "COLUNA OP VALOR"
      // Removendo aspas simples para facilitar comparação
      const cleanWhere = whereClause.replace(/'/g, ''); 
      
      // Tenta achar operador
      let op, parts;
      if (cleanWhere.includes('=')) op = '=';
      else if (cleanWhere.includes('>')) op = '>';
      else if (cleanWhere.includes('<')) op = '<';
      else if (cleanWhere.toLowerCase().includes('like')) op = 'like';

      if (op) {
        parts = cleanWhere.split(new RegExp(op, 'i')).map(p => p.trim());
        const key = parts[0].toUpperCase();
        const val = parts[1];

        results = results.filter(row => {
          const rowVal = row[key];
          // Conversão para número se necessário
          const isNum = !isNaN(rowVal) && !isNaN(val);
          const v1 = isNum ? Number(rowVal) : String(rowVal).toLowerCase();
          const v2 = isNum ? Number(val) : String(val).toLowerCase();

          if (op === '=') return v1 == v2;
          if (op === '>') return v1 > v2;
          if (op === '<') return v1 < v2;
          if (op === 'like') {
             // Simula % no final (starts with)
             const pattern = v2.replace('%', '');
             return String(v1).startsWith(pattern);
          }
          return false;
        });
      }
    }

    // 2. Ordenação (ORDER BY)
    if (orderClause) {
      const [orderCol, direction] = orderClause.trim().split(/\s+/);
      const key = orderCol.toUpperCase();
      const isDesc = direction && direction.toLowerCase() === 'desc';

      results.sort((a, b) => {
        if (a[key] < b[key]) return isDesc ? 1 : -1;
        if (a[key] > b[key]) return isDesc ? -1 : 1;
        return 0;
      });
    }

    // 3. Seleção de Colunas (Projection)
    const finalRows = results.map(row => {
      if (cols[0] === '*') return Object.values(row);
      return cols.map(col => row[col.toUpperCase()]);
    });

    const finalHeaders = cols[0] === '*' ? Object.keys(db[tableKey][0]) : cols;

    return { headers: finalHeaders, rows: finalRows };
  }

  // Renderiza Tabela HTML
  function render(containerId, data) {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (data.rows.length === 0) {
      container.innerHTML = '<div style="color: #666; padding: 1rem;">Nenhum resultado encontrado.</div>';
      return;
    }

    let html = '<div class="table-wrapper"><table class="table"><thead><tr>';
    data.headers.forEach(h => html += `<th>${h.toUpperCase()}</th>`);
    html += '</tr></thead><tbody>';
    
    data.rows.forEach(row => {
      html += '<tr>';
      row.forEach(cell => html += `<td>${cell}</td>`);
      html += '</tr>';
    });
    
    html += '</tbody></table></div>';
    container.innerHTML = html;
  }

  // Exporta API Global
  window.SQLPlayground = {
    run: function (query, outputId) {
      const container = document.getElementById(outputId);
      try {
        container.innerHTML = '<div style="color: #666;">Processando...</div>';
        const result = execute(query);
        render(outputId, result);
      } catch (e) {
        container.innerHTML = `<div class="alert-box" style="background:#ffebee; border-color:#d32f2f; color:#c62828;">Erro: ${e.message}</div>`;
      }
    }
  };
})();
