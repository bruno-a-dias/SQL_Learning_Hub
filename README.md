# SQL Learning Hub

> **[👉 Site aqui! 👈](https://sql-learning-hub.vercel.app/)**

Uma plataforma educacional interativa, moderna e bilíngue para o ensino de Banco de Dados (Relacional e NoSQL), focada em análise de dados.

---

## 📚 Sobre o Projeto

O **SQL Learning Hub** é um ambiente de estudo estático (SPA-like) desenvolvido para consolidar conhecimentos fundamentais e avançados sobre bancos de dados. Inspirado em materiais de referência acadêmica e de mercado (*SQL for Data Analysis*, *SQL Basics*), o projeto oferece uma jornada completa de aprendizado, desde o primeiro `SELECT` até arquiteturas de Big Data.

### ✨ Principais Funcionalidades

- **Bilíngue (PT-BR / EN-US):** Todo o conteúdo e interface traduzidos, com alternância instantânea.
- **Playground SQL Interativo:** Terminal em JavaScript que simula um banco de dados real para execução de queries.
- **Currículo Completo:**
  - **Relacional:** Fundamentos, DML (Insert/Update/Delete), DDL (Create/View), Joins, Subqueries, Window Functions e CTEs.
  - **NoSQL:** JSON, Teorema CAP, Arquiteturas de Big Data (Lakes vs Warehouses).
- **Modo Aula:** Slides integrados para uso em apresentações ou revisão rápida.
- **Temas Visuais:** Design system adaptável com temas culturais ("Brasil" e "USA").
- **Acessibilidade:** Estrutura semântica HTML5 com suporte a leitores de tela (eMAG).

---

## 🎓 Conteúdo Educacional

### Banco de Dados Relacional

#### Nível Iniciante
- O que é uma tabela e como funciona um banco relacional
- Comando `SELECT`: selecionando colunas e linhas
- Cláusula `WHERE`: filtrando dados
- `ORDER BY`: ordenação de resultados
- Operadores de comparação e lógicos

#### Nível Intermediário
- `GROUP BY` e agregação de dados (COUNT, SUM, AVG, MAX, MIN)
- Data Cleaning: tratamento de nulos (COALESCE), manipulação de strings
- Lógica condicional com `CASE WHEN`

#### Nível Avançado
- **JOINs:** INNER, LEFT, RIGHT, FULL OUTER - Cruzando múltiplas tabelas
- **Subqueries:** Consultas aninhadas e Scalar Subqueries
- **Window Functions:** ROW_NUMBER(), RANK(), LAG(), LEAD() - Análise avançada
- **CTEs (Common Table Expressions):** Organizando lógica complexa com WITH
- **Time Series Analysis:** Cálculo de deltas, crescimento mês a mês
- **Otimização:** EXPLAIN, índices, performance de queries

### Banco de Dados Não Relacional (NoSQL)

#### Nível Iniciante
- O que é NoSQL e por que surgiu
- Schema-less: flexibilidade vs rigidez do SQL
- Principais tipos: Documentos, Chave-Valor, Grafos, Time Series

#### Nível Intermediário
- **Teorema CAP:** Consistência, Disponibilidade, Tolerância a Partição
- **ACID vs BASE:** Modelos de consistência
- Desnormalização e otimização para leitura

#### Nível Avançado
- **Data Warehouse vs Data Lake:** Arquiteturas e casos de uso
- **Lakehouse:** A convergência moderna (BigQuery, Athena, Presto)
- **Big Data:** Escalabilidade horizontal, clusters distribuídos
- **Aplicações Reais:** Netflix, Uber, Amazon - como usam NoSQL

---

## 🛠️ Tecnologias Utilizadas

O projeto foi construído com foco em performance, acessibilidade e simplicidade **(Zero Dependências de Build)**.

- **HTML5 Semântico:** Estrutura acessível e otimizada para leitores de tela
- **CSS3 Moderno:** CSS Variables, Grid Layout, Flexbox para responsividade total
- **JavaScript (Vanilla ES6+):** 
  - Roteamento SPA (Single Page Application)
  - Gerenciamento de estado (Idioma, Tema)
  - Motor de simulação SQL com parser rudimentar
- **Design System:** Temas segregados (theme-brazil.css, theme-usa.css)

---

## 🚀 Como Executar Localmente

Como o projeto utiliza carregamento dinâmico de conteúdo via `fetch` API, ele **precisa** ser servido por um servidor HTTP local (navegadores bloqueiam requisições `file://` por segurança CORS).

### Opção 1: Live Server (VS Code) ⭐ Recomendado
1. Abra a pasta do projeto no VS Code
2. Clique com botão direito no `index.html`
3. Selecione **"Open with Live Server"**

### Opção 2: Python
```bash
# Terminal, na pasta do projeto
python -m http.server
# Acesse http://localhost:8000
```

### Opção 3: Node.js (http-server)
```bash
npx http-server .
# Acesse o endereço indicado no terminal
```

### Opção 4: PHP
```bash
php -S localhost:8000
# Acesse http://localhost:8000
```

---

## 📂 Estrutura do Projeto

```
sql-learning-hub/
│
├── index.html                 # Ponto de entrada (Shell da aplicação)
│
├── css/
│   ├── style.css              # Estilos principais
│   ├── theme-brazil.css       # Tema Brasil (Verde/Amarelo/Azul)
│   └── theme-usa.css          # Tema USA (Azul/Vermelho)
│
├── js/
│   ├── main.js                # Roteamento e carregamento dinâmico
│   ├── lang.js                # Internacionalização (i18n)
│   ├── nav.js                 # Comportamento do menu lateral
│   └── sql-playground.js      # Motor de simulação SQL
│
├── content/
│   ├── relational/
│   │   ├── iniciantes.html
│   │   ├── iniciantes-en.html
│   │   ├── manipulacao-dados.html
│   │   ├── manipulacao-dados-en.html
│   │   ├── objetos-banco.html
│   │   ├── objetos-banco-en.html
│   │   ├── intermediario.html
│   │   ├── intermediario-en.html
│   │   ├── avancado.html
│   │   ├── avancado-en.html
│   │   ├── exercicios-iniciantes.html
│   │   ├── exercicios-intermediario.html
│   │   ├── exercicios-avancado.html
│   │   ├── slides-iniciantes.html
│   │   ├── slides-intermediario.html
│   │   ├── slides-avancado.html
│   │   ├── projetos-praticos.html
│   │   └── aplicacoes-reais.html
│   │
│   └── nosql/
│       ├── iniciantes.html
│       ├── iniciantes-en.html
│       ├── intermediario.html
│       ├── intermediario-en.html
│       ├── avancado.html
│       ├── avancado-en.html
│       ├── exercicios-iniciantes.html
│       ├── exercicios-intermediario.html
│       ├── exercicios-avancado.html
│       ├── slides-iniciantes.html
│       ├── slides-intermediario.html
│       ├── slides-avancado.html
│       ├── projetos-praticos.html
│       └── aplicacoes-reais.html
│
├── assets/
│   └── img/
│       ├── flag-br.svg        # Bandeira Brasil
│       └── flag-us.svg        # Bandeira USA
│
└── README.md                  # Este arquivo
```

---

## 🌍 Internacionalização (i18n)

O projeto suporta mudança instantânea entre português (Brasil) e inglês (USA):

- **Interface:** Todos os rótulos, menus e textos da UI são traduzidos
- **Conteúdo Dinâmico:** Cada aula tem versão PT-BR e EN-US (sufixo `-en.html`)
- **Armazenamento:** Preferência salva em `localStorage` (persiste entre seções)

**Como funciona:**
1. Clique nas bandeiras (Brasil ou USA) no header
2. O `lang.js` dispara um evento `languageChanged`
3. O `main.js` recarrega o conteúdo na língua selecionada
4. O tema visual (cores) também muda para refletir a identidade cultural

---

## ▶️ Como Usar a Plataforma

### 1. **Navegação Lateral**
- Menu principal à esquerda com todas as seções
- Pode ser expandido/colapsado no mobile
- Clique para carregar o conteúdo

### 2. **Breadcrumb**
- Mostra sua localização na hierarquia
- Útil para leitores de tela e acessibilidade

### 3. **Playground SQL**
- Execute queries reais nos exercícios
- Suporta `SELECT`, `WHERE`, `ORDER BY` (parser básico)
- Banco mockado em memória com tabelas de exemplo (PERSONS, COUNTRIES)

### 4. **Botão "Voltar ao Topo"**
- Aparece ao descer a página
- Clique para voltar suavemente ao início

### 5. **Slides para Aula**
- Navegue com botões "Anterior" / "Próximo"
- Ideal para usar em sala de aula ou apresentações
- Visualização em tela cheia (pressionando F11)

---

## 🎯 Roadmap Futuro

- [ ] Suporte a PostgreSQL/MySQL via WebAssembly
- [ ] Mais exercícios práticos com validação automática
- [ ] Certificado de conclusão (PDF)
- [ ] Integração com plataformas de hospedagem (GitHub Pages, Netlify)
- [ ] Chat ao vivo para dúvidas
- [ ] Análise de progresso do estudante (Dashboard)

---

## 📖 Referências e Fontes

Este projeto foi desenvolvido com base em materiais educacionais e de referência de alta qualidade:

- **SQL for Data Analysis** (Livro - Capítulos 1-31)
- **SQL Basics** (Referência Técnica)
- **SQL for Absolute Beginners** (Tutorial Introdutório)

Respeito total aos direitos autorais. Este é um trabalho derivado para fins educacionais.

---

## 📄 Licença

Este projeto é disponibilizado sob a licença **MIT**. Você é livre para:

- ✅ Usar em sala de aula ou ambiente corporativo
- ✅ Modificar e adaptarempreender
- ✅ Distribuir (com menção de autoria)

**Veja LICENSE.md para detalhes completos.**

---

## 🤝 Contribuições

Encontrou um erro? Quer sugerir melhorias?

1. Abra uma **Issue** descrevendo o problema
2. Envie um **Pull Request** com suas mudanças
3. Inclua testes ou exemplos quando possível

Toda contribuição que melhore o ambiente educacional é bem-vinda!

---

## 👤 Autor

Desenvolvido por **Bruno** com amor pela educação em tecnologia.

- 📧 Email: bruno@example.com (substitua pelo seu)
- 💼 LinkedIn: [seu-perfil](https://linkedin.com)
- 🐙 GitHub: [seu-usuario](https://github.com)

---

## ❓ FAQ

### Por que JavaScript puro (Vanilla)?
Mantém a aplicação leve, sem dependências de build, fácil de hospedar e entender o código fonte.

### O SQL é de verdade?
O motor SQL é uma simulação simplificada em JavaScript. Para produção, use PostgreSQL, MySQL ou BigQuery. O objetivo é didático.

### Posso usar offline?
Após o carregamento inicial, sim! Os conteúdos são armazenados em cache. Mas é recomendado usar online para atualizações.

### Como contribuir com conteúdo?
Abra uma Issue ou Pull Request. Siga o padrão de estrutura HTML dos arquivos existentes.

---

## 📞 Suporte

Dúvidas ou problemas? Entre em contato:

- 📧 Abra uma Issue no repositório
- 💬 Deixe um comentário nos Discussions
- 🐛 Reporte bugs com detalhes de navegador e passos para reproduzir

---

**Última atualização:** 26 de Novembro de 2025

**Status:** ✅ Em Produção | 🚀 Recebendo melhorias contínuas
