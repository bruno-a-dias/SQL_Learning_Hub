// Caminho completo do arquivo: /js/sql-playground.js
/*
  Responsabilidades deste módulo:
  - Simular um ambiente de execução SQL dentro do navegador, sem depender de servidor externo. [web:8][web:11][web:17]
  - Fornecer uma API simples para:
    - Inicializar bancos de exemplo (tabelas inspiradas em PERSONS, COUNTRIES, etc., presentes nos materiais). [attached_file:23]
    - Executar consultas básicas (SELECT com FROM, WHERE, ORDER BY, funções simples).
  - O objetivo pedagógico é aproximar o comportamento do SQL de verdade,
    mas com implementação didática suficiente para exercícios de iniciantes/intermediário.
*/

(function () {
    // Estrutura de dados em memória representando tabelas simples.
    // Nesta versão inicial, criamos apenas um pequeno subconjunto de dados de exemplo.
    // Os nomes de colunas foram inspirados nos PDFs, mas os dados em si devem ser fictícios. [attached_file:23][attached_file:24]
    const database = {
      PERSONS: [
        { PERSON: 1, NAME: 'Ada Lovelace', GENDER: 'Female', COUNTRY: 'UK', JOB: 'S', BDATE: '1815-12-10' },
        { PERSON: 2, NAME: 'Alan Turing', GENDER: 'Male', COUNTRY: 'UK', JOB: 'S', BDATE: '1912-06-23' },
        { PERSON: 3, NAME: 'Grace Hopper', GENDER: 'Female', COUNTRY: 'USA', JOB: 'S', BDATE: '1906-12-09' },
        { PERSON: 4, NAME: 'Edgar Poe', GENDER: 'Male', COUNTRY: 'USA', JOB: 'W', BDATE: '1809-01-19' }
      ],
      COUNTRIES: [
        { COUNTRY: 'UK', POP: 68000000, AREA: 243610, LANGUAGE: 'English', LITERACY: 99 },
        { COUNTRY: 'USA', POP: 331000000, AREA: 9834000, LANGUAGE: 'English', LITERACY: 99 },
        { COUNTRY: 'Brazil', POP: 212000000, AREA: 8516000, LANGUAGE: 'Portuguese', LITERACY: 94 }
      ]
    };
  
    /*
      Função simplificada para executar apenas consultas SELECT básicas,
      com a forma: SELECT * FROM TABELA ou SELECT col1, col2 FROM TABELA
      + WHERE com condição simples do tipo COLUNA = 'valor'.
      Futuras versões podem implementar mais operadores, inspirado nas seções
      "Selecting Specific Rows", "Sorting Rows" e operadores de comparação. [attached_file:23]
    */
    function runQuery(sql) {
      const trimmed = sql.trim().replace(/\s+/g, ' ');
      const lower = trimmed.toLowerCase();
  
      if (!lower.startsWith('select')) {
        throw new Error('Nesta versão do playground, apenas comandos SELECT são suportados.');
      }
  
      // Parsing extremamente simplificado, adequado apenas para exercícios guiados.
      const selectFromSplit = /select (.+) from ([a-z0-9_]+)/i.exec(trimmed);
      if (!selectFromSplit) {
        throw new Error('Não foi possível interpretar a consulta. Verifique a sintaxe básica: SELECT colunas FROM tabela.');
      }
  
      const columnsPart = selectFromSplit[1].trim();
      const tableName = selectFromSplit[2].trim().toUpperCase();
  
      const table = database[tableName];
      if (!table) {
        throw new Error(`Tabela "${tableName}" não encontrada no playground.`);
      }
  
      // Seleção de colunas
      let selectedRows = [...table];
      let selectedColumns;
      if (columnsPart === '*') {
        selectedColumns = Object.keys(table[0] || {});
      } else {
        selectedColumns = columnsPart.split(',').map((c) => c.trim().toUpperCase());
      }
  
      // WHERE simples (apenas igualdade) opcional
      const whereMatch = /where (.+)$/i.exec(trimmed);
      if (whereMatch) {
        const cond = whereMatch[1].trim();
        // Exemplo esperado: COUNTRY = 'USA'
        const eqMatch = /^([a-z0-9_]+)\s*=\s*'?([^']*)'?$/i.exec(cond);
        if (eqMatch) {
          const col = eqMatch[1].toUpperCase();
          const val = eqMatch[2];
          selectedRows = selectedRows.filter((row) => String(row[col]) === val);
        } else {
          throw new Error('Condição WHERE não suportada nesta versão simplificada do playground.');
        }
      }
  
      // Monta cabeçalhos e linhas
      const headers = selectedColumns;
      const rows = selectedRows.map((row) => headers.map((h) => row[h]));
  
      return { headers, rows };
    }
  
    /*
      Renderiza o resultado em uma tabela HTML dentro de um container informado.
      O container deve ser um elemento existente (por exemplo, uma <div>).
    */
    function renderResult(container, result) {
      if (!container) return;
      container.innerHTML = '';
  
      const { headers, rows } = result;
  
      if (!headers.length) {
        container.textContent = 'Nenhuma coluna selecionada.';
        return;
      }
  
      const wrapper = document.createElement('div');
      wrapper.className = 'table-wrapper';
  
      const table = document.createElement('table');
      table.className = 'table';
  
      const thead = document.createElement('thead');
      const headRow = document.createElement('tr');
      headers.forEach((h) => {
        const th = document.createElement('th');
        th.textContent = h;
        headRow.appendChild(th);
      });
      thead.appendChild(headRow);
  
      const tbody = document.createElement('tbody');
      rows.forEach((row) => {
        const tr = document.createElement('tr');
        row.forEach((cell) => {
          const td = document.createElement('td');
          td.textContent = cell;
          tr.appendChild(td);
        });
        tbody.appendChild(tr);
      });
  
      table.appendChild(thead);
      table.appendChild(tbody);
      wrapper.appendChild(table);
      container.appendChild(wrapper);
    }
  
    // Expondo API global para ser usada nos arquivos de conteúdo de exercícios.
    window.SQLPlayground = {
      runQuery,
      renderResult
    };
  })();
  