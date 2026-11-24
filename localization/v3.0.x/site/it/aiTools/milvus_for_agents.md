---
id: milvus_for_agents.md
title: Milvus per gli agenti IA
summary: >-
  Scopri come gli agenti basati sull'intelligenza artificiale possono utilizzare
  Milvus come database vettoriale per RAG, ricerca semantica e memoria a lungo
  termine.
---
<h1 id="Milvus-for-AI-Agents" class="common-anchor-header">Milvus per gli agenti IA<button data-href="#Milvus-for-AI-Agents" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus fornisce interfacce a misura di agente che consentono agli agenti di codifica IA e ai sistemi di agenti autonomi di interagire con i database vettoriali a livello di programmazione. Che si tratti di creare pipeline RAG, sistemi di ricerca semantica o sistemi di memoria per agenti, Milvus offre molteplici modalità di connessione e funzionamento per gli agenti.</p>
<h2 id="Agent-tools" class="common-anchor-header">Strumenti per gli agenti<button data-href="#Agent-tools" class="anchor-icon" translate="no">
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
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Milvus Skill</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Una skill per agenti destinata a Claude Code che insegna ai modelli di linguaggio di grandi dimensioni (LLM) a utilizzare PyMilvus per le operazioni sui database vettoriali.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="https://github.com/zilliztech/mcp-server-milvus" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Server MCP</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Server Model Context Protocol che consente a qualsiasi agente compatibile con MCP di interagire direttamente con Milvus.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="https://github.com/zilliztech/claude-context" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Claude Context MCP</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Server MCP progettato per Claude Code, che fornisce un accesso alla documentazione di Milvus sensibile al contesto.</p>
  </a>
</div>
</div>
<h2 id="AI-prompts" class="common-anchor-header">Prompt per l’IA<button data-href="#AI-prompts" class="anchor-icon" translate="no">
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
    </button></h2><p>Prompt selezionati con cura che aiutano gli assistenti di programmazione basati sull'IA a scrivere codice Milvus corretto. Ogni prompt codifica le regole e gli schemi che consentono di evitare gli errori più comuni.</p>
<p><strong>Come utilizzarlo:</strong></p>
<ol>
<li><strong>Copia</strong> un prompt dalla sezione “Prompt completo” presente in qualsiasi pagina dei prompt.</li>
<li><strong>Salvalo</strong> nel formato richiesto dal tuo strumento di IA (vedi <a href="#use-in-different-environments">la tabella degli ambienti</a> qui sotto).</li>
<li>Il tuo assistente AI applicherà automaticamente le regole quando genera o revisiona il codice Milvus.</li>
</ol>
<h3 id="Prompt-pages" class="common-anchor-header">Pagine dei prompt<button data-href="#Prompt-pages" class="anchor-icon" translate="no">
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
  <a href="/docs/it/agents_overview.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">AGENTS.md</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Regole di primo livello per qualsiasi agente di codifica AI. Inizia da qui se desideri un unico file.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/it/python_sdk.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">SDK Python</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Modelli di connessione corretti, utilizzo di MilvusClient e divieto di utilizzo dell’API ORM.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/it/schema_design.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Progettazione dello schema</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Tipi di campo, chiavi primarie, immutabilità dello schema e configurazione di BM25.</p>
  </a>
</div>
</div>
<div class="card-wrapper">
<div class="start_card_container">
  <a href="/docs/it/search_patterns.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Modelli di ricerca</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Ricerca ANN, ibrida e full-text con regole di vincolo critiche.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/it/index_selection.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Selezione dell'indice</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Albero decisionale per AUTOINDEX, HNSW, DiskANN e IVF_FLAT.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/it/rag_pipeline.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Pipeline RAG</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Flusso end-to-end di generazione potenziata dal recupero con Milvus.</p>
  </a>
</div>
</div>
<div class="card-wrapper">
<div class="start_card_container">
  <a href="/docs/it/nodejs_sdk.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">SDK Node.js</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Chiamate ai metodi MilvusClient, definizioni dei campi, verifiche dello stato delle risposte e formati dei risultati di ricerca.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/it/go_sdk.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">SDK Go</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Percorsi dei moduli dell'SDK Go v3, timeout di connessione, caricamento delle collezioni e insiemi di risultati di ricerca.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/it/restful_api.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">API RESTful v2</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Endpoint v2, campi di richiesta in camelCase, verifica dei codici di risposta e polling dello stato di caricamento.</p>
  </a>
</div>
</div>
<p>Le schede relative a AGENTS.md e ai quattro prompt tematici aprono la versione Python. Ciascuna di esse dispone anche di una versione Node.js, Go e API RESTful v2:</p>
<table>
<thead>
<tr><th>Suggerimento</th><th>Python</th><th>Node.js</th><th>Go</th><th>API RESTful v2</th></tr>
</thead>
<tbody>
<tr><td>AGENTS.md</td><td><a href="/docs/it/agents_overview.md">Python</a></td><td><a href="/docs/it/agents_overview_nodejs.md">Node.js</a></td><td><a href="/docs/it/agents_overview_go.md">Go</a></td><td><a href="/docs/it/agents_overview_restful.md">API RESTful v2</a></td></tr>
<tr><td>Progettazione dello schema</td><td><a href="/docs/it/schema_design.md">Python</a></td><td><a href="/docs/it/schema_design_nodejs.md">Node.js</a></td><td><a href="/docs/it/schema_design_go.md">Go</a></td><td><a href="/docs/it/schema_design_restful.md">API RESTful v2</a></td></tr>
<tr><td>Modelli di ricerca</td><td><a href="/docs/it/search_patterns.md">Python</a></td><td><a href="/docs/it/search_patterns_nodejs.md">Node.js</a></td><td><a href="/docs/it/search_patterns_go.md">Go</a></td><td><a href="/docs/it/search_patterns_restful.md">API RESTful v2</a></td></tr>
<tr><td>Selezione indice</td><td><a href="/docs/it/index_selection.md">Python</a></td><td><a href="/docs/it/index_selection_nodejs.md">Node.js</a></td><td><a href="/docs/it/index_selection_go.md">Go</a></td><td><a href="/docs/it/index_selection_restful.md">API RESTful v2</a></td></tr>
<tr><td>Pipeline RAG</td><td><a href="/docs/it/rag_pipeline.md">Python</a></td><td><a href="/docs/it/rag_pipeline_nodejs.md">Node.js</a></td><td><a href="/docs/it/rag_pipeline_go.md">Go</a></td><td><a href="/docs/it/rag_pipeline_restful.md">API RESTful v2</a></td></tr>
</tbody>
</table>
<h3 id="Use-in-different-environments" class="common-anchor-header">Utilizzo in diversi ambienti<button data-href="#Use-in-different-environments" class="anchor-icon" translate="no">
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
<tr><th>Ambiente</th><th>Dove inserire il prompt</th><th>Istruzioni</th></tr>
</thead>
<tbody>
<tr><td>Cursore</td><td><code translate="no">.cursor/rules/*.md</code></td><td><a href="https://docs.cursor.com/en/context/rules">Configurare le regole del progetto</a></td></tr>
<tr><td>GitHub Copilot</td><td><code translate="no">.github/copilot-instructions.md</code></td><td><a href="https://code.visualstudio.com/docs/copilot/copilot-customization#_custom-instructions">Istruzioni personalizzate</a></td></tr>
<tr><td>Claude Code</td><td><code translate="no">CLAUDE.md</code></td><td><a href="https://docs.anthropic.com/en/docs/claude-code/overview">Documentazione di Claude Code</a></td></tr>
<tr><td>IDE JetBrains</td><td><code translate="no">guidelines.md</code></td><td><a href="https://www.jetbrains.com/help/junie/customize-guidelines.html">Personalizza le linee guida</a></td></tr>
<tr><td>Gemini CLI</td><td><code translate="no">GEMINI.md</code></td><td><a href="https://codelabs.developers.google.com/gemini-cli-hands-on">Codelab Gemini CLI</a></td></tr>
<tr><td>VS Code</td><td><code translate="no">.instructions.md</code></td><td><a href="https://code.visualstudio.com/docs/copilot/copilot-customization">Configurare .instructions.md</a></td></tr>
<tr><td>Windsurf</td><td><code translate="no">guidelines.md</code></td><td><a href="https://docs.windsurf.com/windsurf/customize">Configurazione di guidelines.md</a></td></tr>
</tbody>
</table>
<h2 id="Recommended-deployment-for-agents" class="common-anchor-header">Distribuzione consigliata per gli agenti<button data-href="#Recommended-deployment-for-agents" class="anchor-icon" translate="no">
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
    </button></h2><p>La scelta della distribuzione Milvus più adatta dipende dalla fase di sviluppo in cui ti trovi.</p>
<table>
<thead>
<tr><th>Fase</th><th>Distribuzione</th><th>Motivo</th></tr>
</thead>
<tbody>
<tr><td>Prototipazione</td><td><a href="/docs/it/milvus_lite.md">Milvus Lite</a></td><td>Zero configurazione, integrato nel processo. Funziona ovunque sia disponibile Python: ideale per la prototipazione rapida di agenti.</td></tr>
<tr><td>Sviluppo</td><td><a href="/docs/it/install_standalone-docker.md">Milvus Standalone</a></td><td>Distribuzione Docker su singolo nodo. Ottimo per lo sviluppo locale e il collaudo con volumi di dati realistici.</td></tr>
<tr><td>Produzione</td><td><a href="https://cloud.zilliz.com/signup">Zilliz Cloud</a></td><td>Milvus completamente gestito e serverless. Nessuna infrastruttura da gestire: gli agenti si connettono e funzionano automaticamente.</td></tr>
<tr><td>Produzione self-hosted</td><td><a href="/docs/it/install_cluster-helm.md">Milvus distribuito</a></td><td>Distribuzione Kubernetes multi-nodo per i team che necessitano del pieno controllo sulla propria infrastruttura.</td></tr>
</tbody>
</table>
<div class="alert note">
<p>Per i carichi di lavoro degli agenti, <strong><a href="https://zilliz.com/cloud">Zilliz Cloud</a></strong> è consigliato per l’uso in produzione. Gli agenti in genere non gestiscono l’infrastruttura, quindi un’implementazione serverless elimina i costi operativi e garantisce il ridimensionamento automatico.</p>
</div>
