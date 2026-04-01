---
id: milvus_for_agents.md
title: Milvus para agentes de IA
summary: >-
  Saiba como os agentes de IA podem utilizar o Milvus como uma base de dados
  vetorial para RAG, pesquisa semântica e memória de longo prazo.
---
<h1 id="Milvus-for-AI-Agents" class="common-anchor-header">Milvus para agentes de IA<button data-href="#Milvus-for-AI-Agents" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h1><p>Milvus fornece interfaces amigáveis para agentes que permitem que agentes de codificação de IA e sistemas de agentes autónomos interajam com bases de dados vectoriais de forma programática. Quer esteja a construir pipelines RAG, pesquisa semântica ou sistemas de memória de agentes, o Milvus oferece várias formas de os agentes se ligarem e operarem.</p>
<h2 id="Agent-tools" class="common-anchor-header">Ferramentas de agentes<button data-href="#Agent-tools" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><div class="card-wrapper">
<div class="start_card_container">
  <a href="https://github.com/zilliztech/milvus-skill" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Habilidade Milvus</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Uma competência de agente para o Claude Code que ensina os LLMs a utilizar o PyMilvus para operações de bases de dados vectoriais.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="https://github.com/zilliztech/mcp-server-milvus" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Servidor MCP</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Servidor de Protocolo de Contexto de Modelo que permite a qualquer agente compatível com MCP interagir diretamente com Milvus.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="https://github.com/zilliztech/claude-context" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Claude Context MCP</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Servidor MCP concebido para o código Claude, que permite o acesso à documentação Milvus com conhecimento do contexto.</p>
  </a>
</div>
</div>
<h2 id="AI-prompts" class="common-anchor-header">Avisos de IA<button data-href="#AI-prompts" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>Instruções selecionadas que ajudam os assistentes de codificação de IA a escrever código Milvus correto. Cada aviso codifica as regras e os padrões que evitam os erros mais comuns.</p>
<p><strong>Como utilizar:</strong></p>
<ol>
<li><strong>Copie</strong> uma linha de comando da secção "Linha de comando completa" em qualquer página de linha de comando.</li>
<li><strong>Guarde-a</strong> no ficheiro que a sua ferramenta de IA espera (ver <a href="#use-in-different-environments">tabela de ambientes</a> abaixo).</li>
<li>O seu assistente de IA aplicará automaticamente as regras quando gerar ou rever o código Milvus.</li>
</ol>
<h3 id="Prompt-pages" class="common-anchor-header">Páginas de instruções<button data-href="#Prompt-pages" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h3><div class="card-wrapper">
<div class="start_card_container">
  <a href="/docs/pt/agents_overview.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">AGENTES.md</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Regras de nível superior para qualquer agente de codificação de IA. Comece aqui se quiser apenas um ficheiro.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/pt/python_sdk.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Python SDK</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Padrões de ligação corretos, utilização do MilvusClient e proibição da API ORM.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/pt/schema_design.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Desenho do esquema</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Tipos de campo, chaves primárias, imutabilidade do esquema e configuração do BM25.</p>
  </a>
</div>
</div>
<div class="card-wrapper">
<div class="start_card_container">
  <a href="/docs/pt/search_patterns.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Padrões de pesquisa</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Pesquisa ANN, híbrida e de texto completo com regras de restrição críticas.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/pt/index_selection.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Seleção de índices</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Árvore de decisão para AUTOINDEX, HNSW, DiskANN e IVF_FLAT.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/pt/rag_pipeline.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Pipeline RAG</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Fluxo de geração complementado por recuperação de ponta a ponta com Milvus.</p>
  </a>
</div>
</div>
<h3 id="Use-in-different-environments" class="common-anchor-header">Utilização em diferentes ambientes<button data-href="#Use-in-different-environments" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h3><table>
<thead>
<tr><th>Ambiente</th><th>Onde colocar o prompt</th><th>Instruções</th></tr>
</thead>
<tbody>
<tr><td>Cursor</td><td><code translate="no">.cursor/rules/*.md</code></td><td><a href="https://docs.cursor.com/en/context/rules">Configurar regras de projeto</a></td></tr>
<tr><td>Copiloto do GitHub</td><td><code translate="no">.github/copilot-instructions.md</code></td><td><a href="https://code.visualstudio.com/docs/copilot/copilot-customization#_custom-instructions">Instruções personalizadas</a></td></tr>
<tr><td>Código Claude</td><td><code translate="no">CLAUDE.md</code></td><td><a href="https://docs.anthropic.com/en/docs/claude-code/overview">Documentos do Claude Code</a></td></tr>
<tr><td>IDEs da JetBrains</td><td><code translate="no">guidelines.md</code></td><td><a href="https://www.jetbrains.com/help/junie/customize-guidelines.html">Personalizar diretrizes</a></td></tr>
<tr><td>Gemini CLI</td><td><code translate="no">GEMINI.md</code></td><td><a href="https://codelabs.developers.google.com/gemini-cli-hands-on">Codelab da CLI do Gemini</a></td></tr>
<tr><td>Código VS</td><td><code translate="no">.instructions.md</code></td><td><a href="https://code.visualstudio.com/docs/copilot/copilot-customization">Configurar .instructions.md</a></td></tr>
<tr><td>Windsurf</td><td><code translate="no">guidelines.md</code></td><td><a href="https://docs.windsurf.com/windsurf/customize">Configurar guidelines.md</a></td></tr>
</tbody>
</table>
<h2 id="Recommended-deployment-for-agents" class="common-anchor-header">Implantação recomendada para agentes<button data-href="#Recommended-deployment-for-agents" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>A escolha da implementação correta do Milvus depende da sua fase de desenvolvimento.</p>
<table>
<thead>
<tr><th>Estágio</th><th>Implantação</th><th>Porquê</th></tr>
</thead>
<tbody>
<tr><td>Prototipagem</td><td><a href="/docs/pt/milvus_lite.md">Milvus Lite</a></td><td>Zero-config, em processo. Funciona em qualquer lugar onde o Python funciona - ideal para prototipagem rápida de agentes.</td></tr>
<tr><td>Desenvolvimento</td><td><a href="/docs/pt/install_standalone-docker.md">Milvus Standalone</a></td><td>Implantação Docker de nó único. Ideal para desenvolvimento local e testes com volumes de dados realistas.</td></tr>
<tr><td>Produção</td><td><a href="https://cloud.zilliz.com/signup">Nuvem Zilliz</a></td><td>Milvus sem servidor e totalmente gerido. Sem infra-estruturas para gerir - os agentes apenas se ligam e operam.</td></tr>
<tr><td>Produção auto-hospedada</td><td><a href="/docs/pt/install_cluster-helm.md">Milvus Distribuído</a></td><td>Implementação Kubernetes de vários nós para equipas que necessitam de controlo total sobre a sua infraestrutura.</td></tr>
</tbody>
</table>
<div class="alert note">
<p>Para cargas de trabalho de agentes, <strong>o Zilliz Cloud</strong> é recomendado para uso em produção. Normalmente, os agentes não gerem a infraestrutura, pelo que uma implementação sem servidor elimina a sobrecarga operacional e fornece escalonamento automático.</p>
</div>
