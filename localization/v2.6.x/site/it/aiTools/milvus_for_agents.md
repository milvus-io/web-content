---
id: milvus_for_agents.md
title: Milvus per gli agenti AI
summary: >-
  Scoprite come gli agenti di intelligenza artificiale possono utilizzare Milvus
  come database vettoriale per la RAG, la ricerca semantica e la memoria a lungo
  termine.
---
<h1 id="Milvus-for-AI-Agents" class="common-anchor-header">Milvus per gli agenti AI<button data-href="#Milvus-for-AI-Agents" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus fornisce interfacce di facile utilizzo per gli agenti che consentono agli agenti di codifica AI e ai sistemi di agenti autonomi di interagire con i database vettoriali in modo programmatico. Che si tratti di costruire pipeline RAG, ricerca semantica o sistemi di memoria ad agenti, Milvus offre agli agenti diversi modi per connettersi e operare.</p>
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
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Abilità Milvus</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Un'abilità agente per Claude Code che insegna ai LLM a usare PyMilvus per le operazioni sui database vettoriali.</p>
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
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Server MCP progettato per Claude Code, che fornisce un accesso alla documentazione di Milvus consapevole del contesto.</p>
  </a>
</div>
</div>
<div class="card-wrapper">
<div class="start_card_container">
  <a href="/docs/it/integrations_overview.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">Quadri di agenti</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Integrazioni con LangChain, LlamaIndex, OpenAI Agents e altri framework di orchestrazione di agenti.</p>
  </a>
</div>
</div>
<h2 id="AI-prompts" class="common-anchor-header">Suggerimenti AI<button data-href="#AI-prompts" class="anchor-icon" translate="no">
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
    </button></h2><p>Suggerimenti curati che aiutano gli assistenti di codifica AI a scrivere codice Milvus corretto. Ogni prompt codifica le regole e gli schemi che prevengono gli errori più comuni.</p>
<p><strong>Come si usa:</strong></p>
<ol>
<li><strong>Copiare</strong> una richiesta dalla sezione "Richiesta completa" in qualsiasi pagina di richiesta.</li>
<li><strong>Salvarlo</strong> nel file che lo strumento di IA si aspetta (vedere la <a href="#use-in-different-environments">tabella degli ambienti</a> qui sotto).</li>
<li>L'assistente AI applicherà automaticamente le regole quando genererà o revisionerà il codice Milvus.</li>
</ol>
<h3 id="Prompt-pages" class="common-anchor-header">Pagine di prompt<button data-href="#Prompt-pages" class="anchor-icon" translate="no">
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
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">AGENTI.md</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Regole di primo livello per qualsiasi agente di codifica AI. Iniziare da qui se si desidera un solo file.</p>
  </a>
</div>
<div class="start_card_container">
  <a href="/docs/it/python_sdk.md" style="text-decoration: none; color: inherit;">
    <p class="link-btn" style="font-size: 1rem; white-space: nowrap;">SDK Python</p>
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Modelli di connessione corretti, uso di MilvusClient e divieto di API ORM.</p>
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
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Ricerca RNA, ibrida e full-text con regole di vincolo critiche.</p>
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
    <p style="font-size: 0.875rem; font-weight: 400; color: #555;">Flusso di generazione end-to-end con Milvus.</p>
  </a>
</div>
</div>
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
<tr><th>Ambiente</th><th>Dove mettere il prompt</th><th>Istruzioni</th></tr>
</thead>
<tbody>
<tr><td>Cursore</td><td><code translate="no">.cursor/rules/*.md</code></td><td><a href="https://docs.cursor.com/en/context/rules">Configurare le regole del progetto</a></td></tr>
<tr><td>Copilota GitHub</td><td><code translate="no">.github/copilot-instructions.md</code></td><td><a href="https://code.visualstudio.com/docs/copilot/copilot-customization#_custom-instructions">Istruzioni personalizzate</a></td></tr>
<tr><td>Codice Claude</td><td><code translate="no">CLAUDE.md</code></td><td><a href="https://docs.anthropic.com/en/docs/claude-code/overview">Documenti di Claude Code</a></td></tr>
<tr><td>IDE JetBrains</td><td><code translate="no">guidelines.md</code></td><td><a href="https://www.jetbrains.com/help/junie/customize-guidelines.html">Personalizzare le linee guida</a></td></tr>
<tr><td>Gemini CLI</td><td><code translate="no">GEMINI.md</code></td><td><a href="https://codelabs.developers.google.com/gemini-cli-hands-on">Gemini CLI codelab</a></td></tr>
<tr><td>Codice VS</td><td><code translate="no">.instructions.md</code></td><td><a href="https://code.visualstudio.com/docs/copilot/copilot-customization">Configurare .instructions.md</a></td></tr>
<tr><td>Windsurf</td><td><code translate="no">guidelines.md</code></td><td><a href="https://docs.windsurf.com/windsurf/customize">Configurare linee guida.md</a></td></tr>
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
    </button></h2><p>La scelta della giusta distribuzione di Milvus dipende dalla fase di sviluppo.</p>
<table>
<thead>
<tr><th>Fase</th><th>Distribuzione</th><th>Perché</th></tr>
</thead>
<tbody>
<tr><td>Prototipazione</td><td><a href="/docs/it/milvus_lite.md">Milvus Lite</a></td><td>Zero-config, in-process. Funziona ovunque Python - ideale per la prototipazione rapida di agenti.</td></tr>
<tr><td>Sviluppo</td><td><a href="/docs/it/install_standalone-docker.md">Milvus Standalone</a></td><td>Distribuzione Docker a singolo nodo. Ottimo per lo sviluppo locale e i test con volumi di dati realistici.</td></tr>
<tr><td>Produzione</td><td><a href="https://cloud.zilliz.com/signup">Nuvola Zilliz</a></td><td>Milvus completamente gestito e senza server. Nessuna infrastruttura da gestire: gli agenti devono solo connettersi e operare.</td></tr>
<tr><td>Produzione self-hosted</td><td><a href="/docs/it/install_cluster-helm.md">Milvus distribuito</a></td><td>Distribuzione Kubernetes a più nodi per i team che hanno bisogno di un controllo completo sulla propria infrastruttura.</td></tr>
</tbody>
</table>
<div class="alert note">
<p>Per i carichi di lavoro degli agenti, <strong>Zilliz Cloud</strong> è consigliato per l'uso in produzione. Gli agenti in genere non gestiscono l'infrastruttura, quindi un'implementazione serverless elimina i costi operativi e fornisce una scalabilità automatica.</p>
</div>
<h2 id="Quick-connection-examples" class="common-anchor-header">Esempi di connessione rapida<button data-href="#Quick-connection-examples" class="anchor-icon" translate="no">
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
    </button></h2><p>Connettetevi a Milvus dal vostro codice agente:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Milvus Lite (local, zero-config)</span>
client = MilvusClient(uri=<span class="hljs-string">&quot;./milvus_agent.db&quot;</span>)

<span class="hljs-comment"># Milvus Standalone</span>
client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Zilliz Cloud</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;YOUR_ZILLIZ_CLOUD_URI&quot;</span>,
    token=<span class="hljs-string">&quot;YOUR_ZILLIZ_CLOUD_TOKEN&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Next-steps" class="common-anchor-header">I prossimi passi<button data-href="#Next-steps" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li><a href="/docs/it/quickstart.md">Avvio rapido</a> - Eseguite la vostra prima ricerca Milvus in pochi minuti.</li>
<li><a href="/docs/it/integrations_overview.md">Integrazioni di framework di agenti</a> - Collegare Milvus con LangChain, LlamaIndex, OpenAI Agents e altro ancora.</li>
</ul>
