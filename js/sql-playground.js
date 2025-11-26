// Caminho completo do arquivo: /js/sql-playground.js
(function () {
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

  function execute(query) {
    const cleanQuery = query.trim().replace(/\s+/g, ' ');
    
    // Simulação básica de validação
    if (!cleanQuery.toLowerCase().startsWith('select')) {
      // Permite DML simulado apenas visualmente
      if (/^(insert|update|delete)/i.test(cleanQuery)) {
        return { message: 'Comando DML executado com sucesso (Simulação). Dados não persistidos.' };
      }
      throw new Error('Comando não suportado no playground básico.');
    }

    // Parser rudimentar
    const match = cleanQuery.match(/select\s+(.+)\s+from\s+([a-z0-9_]+)(?:\s+where\s+(.+?))?(?:\s+order by\s+(.+))?$/i);
    if (!match) throw new Error('Sintaxe inválida. Use SELECT ... FROM ...');

    const [_, colStr, tableStr, whereStr, orderStr] = match;
    const tableKey = tableStr.toUpperCase();
    
    if (!db[tableKey]) throw new Error(`Tabela '${tableStr}' não encontrada.`);

    let rows = [...db[tableKey]];

    // 1. WHERE (Simples)
    if (whereStr) {
      const cleanWhere = whereStr.replace(/'/g, '');
      let op, parts;
      if (cleanWhere.includes('=')) op = '=';
      else if (cleanWhere.includes('>')) op = '>';
      else if (cleanWhere.toLowerCase().includes('like')) op = 'like';

      if (op) {
        parts = cleanWhere.split(new RegExp(op, 'i')).map(p => p.trim());
        const key = parts[0].toUpperCase();
        const val = parts[1];
        
        rows = rows.filter(r => {
          const v1 = r[key]; 
          // Tratamento numérico vs string simples
          const isNum = !isNaN(v1) && !isNaN(val);
          if (op === '=') return isNum ? v1 == val : String(v1) == val;
          if (op === '>') return isNum ? v1 > val : String(v1) > val;
          if (op === 'like') return String(v1).startsWith(val.replace('%',''));
          return false;
        });
      }
    }

    // 2. ORDER BY
    if (orderStr) {
      const [col, dir] = orderStr.split(/\s+/);
      const key = col.toUpperCase();
      const desc = dir && dir.toLowerCase() === 'desc';
      rows.sort((a,b) => {
        if(a[key] < b[key]) return desc ? 1 : -1;
        if(a[key] > b[key]) return desc ? -1 : 1;
        return 0;
      });
    }

    // 3. SELECT Columns
    const cols = colStr.split(',').map(c => c.trim());
    const finalHeaders = cols[0] === '*' ? Object.keys(db[tableKey][0]) : cols;
    
    const finalRows = rows.map(r => {
      if (cols[0] === '*') return Object.values(r);
      return cols.map(c => r[c.toUpperCase()]);
    });

    return { headers: finalHeaders, rows: finalRows };
  }

  window.SQLPlayground = {
    run: function (query, outputId) {
      const container = document.getElementById(outputId);
      try {
        const res = execute(query);
        if (res.message) {
          container.innerHTML = `<div style="color:green; padding:1rem;">${res.message}</div>`;
        } else {
          let html = '<div class="table-wrapper"><table class="table"><thead><tr>';
          res.headers.forEach(h => html += `<th>${h}</th>`);
          html += '</tr></thead><tbody>';
          res.rows.forEach(row => {
            html += '<tr>';
            row.forEach(cell => html += `<td>${cell}</td>`);
            html += '</tr>';
          });
          html += '</tbody></table></div>';
          container.innerHTML = html;
        }
      } catch (e) {
        container.innerHTML = `<div class="alert-box" style="background:#ffebee; color:#c62828;">Erro: ${e.message}</div>`;
      }
    }
  };
})();
