---
id: milvus_and_mcp.md
summary: >-
  Questo tutorial spiega come configurare un server MCP per Milvus, consentendo
  alle applicazioni di intelligenza artificiale di eseguire ricerche vettoriali,
  gestire collezioni e recuperare dati con comandi in linguaggio naturale, senza
  dover scrivere query di database personalizzate.
title: 'MCP + Milvus: connettere l''intelligenza artificiale con i database vettoriali'
---
<h1 id="MCP-+-Milvus-Connecting-AI-with-Vector-Databases" class="common-anchor-header">MCP + Milvus: connettere l'intelligenza artificiale con i database vettoriali<button data-href="#MCP-+-Milvus-Connecting-AI-with-Vector-Databases" class="anchor-icon" translate="no">
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
    </button></h1><iframe width="560" height="315" src="https://www.youtube.com/embed/0wAsrUxv8gM?si=BVyRqLJ2PuZIBF5c" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
<h2 id="Introduction" class="common-anchor-header">Introduzione<button data-href="#Introduction" class="anchor-icon" translate="no">
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
    </button></h2><p>Il <strong>Model Context Protocol (MCP)</strong> è un protocollo aperto che consente alle applicazioni di IA, come Claude e Cursor, di interagire con fonti di dati e strumenti esterni senza soluzione di continuità. Che si tratti di costruire applicazioni AI personalizzate, integrare flussi di lavoro AI o migliorare le interfacce di chat, l'MCP fornisce un modo standardizzato per collegare modelli linguistici di grandi dimensioni (LLM) con dati contestuali rilevanti.</p>
<p>Questo tutorial spiega come <strong>configurare un server MCP per Milvus</strong>, consentendo alle applicazioni di IA di eseguire ricerche vettoriali, gestire collezioni e recuperare dati utilizzando <strong>comandi in linguaggio naturale, senza dover</strong>scrivere query di database personalizzate.</p>
<h2 id="Prerequisites" class="common-anchor-header">Prerequisiti<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>Prima di configurare il server MCP, assicurarsi di disporre di:</p>
<ul>
<li>Python 3.10 o superiore</li>
<li>Un'istanza <a href="https://milvus.io/">Milvus</a> in esecuzione</li>
<li><a href="https://github.com/astral-sh/uv">uv</a> (consigliato per l'esecuzione del server)</li>
</ul>
<h2 id="Getting-Started" class="common-anchor-header">Come iniziare<button data-href="#Getting-Started" class="anchor-icon" translate="no">
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
    </button></h2><p>Il modo consigliato per utilizzare questo server MCP è di eseguirlo direttamente con uv senza installazione. Questo è il modo in cui sia Claude Desktop che Cursor sono configurati per usarlo negli esempi che seguono.</p>
<p>Se si desidera clonare il repository:</p>
<pre><code translate="no" class="language-bash">git <span class="hljs-built_in">clone</span> https://github.com/zilliztech/mcp-server-milvus.git
<span class="hljs-built_in">cd</span> mcp-server-milvus
<button class="copy-code-btn"></button></code></pre>
<p>Allora è possibile eseguire il server direttamente:</p>
<pre><code translate="no" class="language-bash">uv run src/mcp_server_milvus/server.py --milvus-uri http://localhost:19530
<button class="copy-code-btn"></button></code></pre>
<h2 id="Supported-Applications" class="common-anchor-header">Applicazioni supportate<button data-href="#Supported-Applications" class="anchor-icon" translate="no">
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
    </button></h2><p>Questo server MCP può essere utilizzato con diverse applicazioni AI che supportano il Model Context Protocol, come ad esempio:</p>
<ul>
<li><strong>Claude Desktop</strong>: L'applicazione desktop di Anthropic per Claude.</li>
<li><strong>Cursor</strong>: Editor di codice alimentato dall'intelligenza artificiale con supporto MCP nella sua funzione Composer.</li>
<li><strong>Altri client MCP personalizzati</strong> Qualsiasi applicazione che implementi le specifiche del client MCP.</li>
</ul>
<h2 id="Using-MCP-with-Claude-Desktop" class="common-anchor-header">Utilizzo di MCP con Claude Desktop<button data-href="#Using-MCP-with-Claude-Desktop" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li>Installare <a href="https://claude.ai/download">Claude Desktop</a>.</li>
<li>Aprire il file di configurazione di Claude:<ul>
<li>Su macOS: <code translate="no">~/Library/Application Support/Claude/claude_desktop_config.json</code></li>
</ul></li>
<li>Aggiungere la seguente configurazione:</li>
</ol>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;mcpServers&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;milvus&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;command&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;/PATH/TO/uv&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;args&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-string">&quot;--directory&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;/path/to/mcp-server-milvus/src/mcp_server_milvus&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;run&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;server.py&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;--milvus-uri&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;http://localhost:19530&quot;</span>
      <span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="4">
<li>Riavviare Claude Desktop per applicare le modifiche.</li>
</ol>
<h2 id="Using-MCP-with-Cursor" class="common-anchor-header">Utilizzo di MCP con Cursor<button data-href="#Using-MCP-with-Cursor" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://docs.cursor.com/context/model-context-protocol">Cursor</a> supporta anche gli strumenti MCP attraverso la funzione Agent di Composer. È possibile aggiungere il server MCP Milvus a Cursor in due modi:</p>
<h3 id="Option-1-Using-Cursor-Settings-UI" class="common-anchor-header">Opzione 1: Utilizzando l'interfaccia utente delle impostazioni di Cursor.</h3><ol>
<li>Aprire <code translate="no">Cursor Settings</code> → <code translate="no">Features</code> → <code translate="no">MCP</code>.</li>
<li>Fare clic su <code translate="no">+ Add New MCP Server</code>.</li>
<li>Compilare:<ul>
<li>Tipo: <code translate="no">stdio</code></li>
<li>Nome: <code translate="no">milvus</code></li>
<li>Comando:<pre><code translate="no" class="language-bash">/PATH/TO/uv --directory /path/to/mcp-server-milvus/src/mcp_server_milvus run server.py --milvus-uri http://127.0.0.1:19530
<button class="copy-code-btn"></button></code></pre></li>
<li>⚠️ Suggerimento: Usare <code translate="no">127.0.0.1</code> invece di <code translate="no">localhost</code> per evitare potenziali problemi di risoluzione DNS.</li>
</ul></li>
</ol>
<h3 id="Option-2-Using-Project-specific-Configuration-Recommended" class="common-anchor-header">Opzione 2: Utilizzo della configurazione specifica del progetto (consigliata)</h3><ol>
<li>Creare un file <code translate="no">.cursor/mcp.json</code> nella <strong>directory principale del progetto</strong>:</li>
</ol>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;mcpServers&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;milvus&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;command&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;/PATH/TO/uv&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;args&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-string">&quot;--directory&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;/path/to/mcp-server-milvus/src/mcp_server_milvus&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;run&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;server.py&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;--milvus-uri&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-string">&quot;http://127.0.0.1:19530&quot;</span>
      <span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>Riavviare Cursor per applicare la configurazione.</li>
</ol>
<p>Dopo aver aggiunto il server, potrebbe essere necessario premere il pulsante di aggiornamento nelle impostazioni di MCP per popolare l'elenco degli strumenti. L'Agente Composer utilizzerà automaticamente gli strumenti Milvus quando sono rilevanti per le query.</p>
<h2 id="Verifying-the-Integration" class="common-anchor-header">Verifica dell'integrazione<button data-href="#Verifying-the-Integration" class="anchor-icon" translate="no">
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
    </button></h2><p>Per verificare che il server MCP sia impostato correttamente:</p>
<h3 id="For-Cursor" class="common-anchor-header">Per il Cursore</h3><ol>
<li>Andare su <code translate="no">Cursor Settings</code> → <code translate="no">Features</code> → <code translate="no">MCP</code>.</li>
<li>Confermare che <code translate="no">&quot;Milvus&quot;</code> appare nell'elenco dei server MCP.</li>
<li>Controllare se gli strumenti Milvus (ad esempio, <code translate="no">milvus_list_collections</code>, <code translate="no">milvus_vector_search</code>) sono elencati.</li>
<li>Se compaiono errori, consultare la sezione <strong>Risoluzione dei problemi</strong>.</li>
</ol>
<h2 id="MCP-Server-Tools-for-Milvus" class="common-anchor-header">Strumenti del server MCP per Milvus<button data-href="#MCP-Server-Tools-for-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Questo server MCP fornisce diversi strumenti per la <strong>ricerca, l'interrogazione e la gestione dei dati vettoriali in Milvus</strong>. Per maggiori dettagli, consultare la documentazione di <a href="https://github.com/zilliztech/mcp-server-milvus">mcp-server-milvus</a>.</p>
<h3 id="🔍-Search-and-Query-Tools" class="common-anchor-header">🔍 Strumenti di ricerca e interrogazione</h3><ul>
<li><strong><code translate="no">milvus-text-search</code></strong> → Ricerca di documenti utilizzando la ricerca full text.</li>
<li><strong><code translate="no">milvus-vector-search</code></strong> → Eseguire una ricerca di similarità vettoriale su una raccolta.</li>
<li><strong><code translate="no">milvus-hybrid-search</code></strong> → Eseguire una ricerca ibrida che combini la similarità vettoriale e il filtraggio degli attributi.</li>
<li><strong><code translate="no">milvus-multi-vector-search</code></strong> → Eseguire una ricerca per similarità vettoriale con più vettori di query.</li>
<li><strong><code translate="no">milvus-query</code></strong> → Eseguire una ricerca su un insieme utilizzando espressioni di filtro.</li>
<li><strong><code translate="no">milvus-count</code></strong> → Contare le entità in una raccolta.</li>
</ul>
<h3 id="📁-Collection-Management" class="common-anchor-header">📁 Gestione delle raccolte</h3><ul>
<li><strong><code translate="no">milvus-list-collections</code></strong> → Elenco di tutte le raccolte nel database.</li>
<li><strong><code translate="no">milvus-collection-info</code></strong> → Ottenere informazioni dettagliate su una raccolta.</li>
<li><strong><code translate="no">milvus-get-collection-stats</code></strong> → Ottenere statistiche su una raccolta.</li>
<li><strong><code translate="no">milvus-create-collection</code></strong> → Creare una nuova collezione con lo schema specificato.</li>
<li><strong><code translate="no">milvus-load-collection</code></strong> → Caricare una collezione in memoria per la ricerca e l'interrogazione.</li>
<li><strong><code translate="no">milvus-release-collection</code></strong> → Rilasciare una collezione dalla memoria.</li>
<li><strong><code translate="no">milvus-get-query-segment-info</code></strong> → Ottenere informazioni sui segmenti della query.</li>
<li><strong><code translate="no">milvus-get-collection-loading-progress</code></strong> → Ottenere l'avanzamento del caricamento di una raccolta.</li>
</ul>
<h3 id="📊-Data-Operations" class="common-anchor-header">Operazioni sui dati</h3><ul>
<li><strong><code translate="no">milvus-insert-data</code></strong> → Inserire dati in una collezione.</li>
<li><strong><code translate="no">milvus-bulk-insert</code></strong> → Inserire i dati in batch per migliorare le prestazioni.</li>
<li><strong><code translate="no">milvus-upsert-data</code></strong> → Inserire i dati in una raccolta (inserire o aggiornare se esiste).</li>
<li><strong><code translate="no">milvus-delete-entities</code></strong> → Eliminare entità da una collezione in base a un'espressione di filtro.</li>
<li><strong><code translate="no">milvus-create-dynamic-field</code></strong> → Aggiungere un campo dinamico a una collezione esistente.</li>
</ul>
<h3 id="⚙️-Index-Management" class="common-anchor-header">⚙️ Gestione degli indici</h3><ul>
<li><strong><code translate="no">milvus-create-index</code></strong> → Creare un indice su un campo vettoriale.</li>
<li><strong><code translate="no">milvus-get-index-info</code></strong> → Ottenere informazioni sugli indici in una collezione.</li>
</ul>
<h2 id="Environment-Variables" class="common-anchor-header">Variabili d'ambiente<button data-href="#Environment-Variables" class="anchor-icon" translate="no">
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
<li><strong><code translate="no">MILVUS_URI</code></strong> → URI del server Milvus (può essere impostato al posto di <code translate="no">--milvus-uri</code>).</li>
<li><strong><code translate="no">MILVUS_TOKEN</code></strong> → Token di autenticazione opzionale.</li>
<li><strong><code translate="no">MILVUS_DB</code></strong> → Nome del database (predefinito a "default").</li>
</ul>
<h2 id="Development" class="common-anchor-header">Sviluppo<button data-href="#Development" class="anchor-icon" translate="no">
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
    </button></h2><p>Per eseguire direttamente il server:</p>
<pre><code translate="no" class="language-bash">uv run server.py --milvus-uri http://localhost:19530
<button class="copy-code-btn"></button></code></pre>
<h2 id="Examples" class="common-anchor-header">Esempi<button data-href="#Examples" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Using-Claude-Desktop" class="common-anchor-header">Utilizzo di Claude Desktop</h3><h4 id="Example-1-Listing-Collections" class="common-anchor-header">Esempio 1: Elenco delle collezioni</h4><pre><code translate="no">What are the collections <span class="hljs-selector-tag">I</span> have in my Milvus DB?
<button class="copy-code-btn"></button></code></pre>
<p>Claude utilizzerà poi MCP per verificare queste informazioni sul nostro DB Milvus.</p>
<pre><code translate="no">I<span class="hljs-comment">&#x27;ll check what collections are available in your Milvus database.</span>

&gt; View result <span class="hljs-keyword">from</span> milvus-list-collections <span class="hljs-keyword">from</span> milvus (local)

Here are the collections <span class="hljs-keyword">in</span> your Milvus database:

<span class="hljs-number">1</span>. rag_demo
<span class="hljs-number">2</span>. test
<span class="hljs-number">3</span>. chat_messages
<span class="hljs-number">4</span>. text_collection
<span class="hljs-number">5</span>. image_collection
<span class="hljs-number">6</span>. customized_setup
<span class="hljs-number">7</span>. streaming_rag_demo
<button class="copy-code-btn"></button></code></pre>
<h4 id="Example-2-Searching-for-Documents" class="common-anchor-header">Esempio 2: Ricerca di documenti</h4><pre><code translate="no">Find documents in <span class="hljs-keyword">my</span> text_collection that mention <span class="hljs-string">&quot;machine learning&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Claude utilizzerà le funzionalità di ricerca full-text di Milvus per trovare i documenti rilevanti:</p>
<pre><code translate="no">I<span class="hljs-comment">&#x27;ll search for documents about machine learning in your text_collection.</span>

&gt; View result <span class="hljs-keyword">from</span> milvus-<span class="hljs-keyword">text</span>-search <span class="hljs-keyword">from</span> milvus (local)

Here are the documents I found that mention machine learning:
[Results will appear here based <span class="hljs-keyword">on</span> your actual data]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Using-Cursor" class="common-anchor-header">Uso del cursore</h3><h4 id="Example-Creating-a-Collection" class="common-anchor-header">Esempio: Creare una raccolta</h4><p>Nel Compositore di Cursor, è possibile chiedere:</p>
<pre><code translate="no">Create a <span class="hljs-keyword">new</span> collection called <span class="hljs-string">&#x27;articles&#x27;</span> <span class="hljs-function"><span class="hljs-keyword">in</span> Milvus <span class="hljs-keyword">with</span> fields <span class="hljs-keyword">for</span> <span class="hljs-title">title</span> (<span class="hljs-params"><span class="hljs-built_in">string</span></span>), <span class="hljs-title">content</span> (<span class="hljs-params"><span class="hljs-built_in">string</span></span>), <span class="hljs-keyword">and</span> a vector <span class="hljs-title">field</span> (<span class="hljs-params"><span class="hljs-number">128</span> dimensions</span>)
</span><button class="copy-code-btn"></button></code></pre>
<p>Cursor utilizzerà il server MCP per eseguire questa operazione:</p>
<pre><code translate="no">I<span class="hljs-comment">&#x27;ll create a new collection called &#x27;articles&#x27; with the specified fields.</span>

&gt; View result <span class="hljs-keyword">from</span> milvus-create-collection <span class="hljs-keyword">from</span> milvus (local)

Collection <span class="hljs-comment">&#x27;articles&#x27; has been created successfully with the following schema:</span>
- title: <span class="hljs-type">string</span>
- content: <span class="hljs-type">string</span>
- vector: float vector[<span class="hljs-number">128</span>]
<button class="copy-code-btn"></button></code></pre>
<h2 id="Troubleshooting" class="common-anchor-header">Risoluzione dei problemi<button data-href="#Troubleshooting" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Common-Issues" class="common-anchor-header">Problemi comuni</h3><h4 id="Connection-Errors" class="common-anchor-header">Errori di connessione</h4><p>Se si verificano errori come "Failed to connect to Milvus server":</p>
<ol>
<li>Verificate che l'istanza di Milvus sia in esecuzione: <code translate="no">docker ps</code> (se si usa Docker)</li>
<li>Verificare che l'URI sia corretto nella configurazione</li>
<li>Assicurarsi che non ci siano regole del firewall che bloccano la connessione.</li>
<li>Provare a usare <code translate="no">127.0.0.1</code> invece di <code translate="no">localhost</code> nell'URI.</li>
</ol>
<h4 id="Authentication-Issues" class="common-anchor-header">Problemi di autenticazione</h4><p>Se si verificano errori di autenticazione:</p>
<ol>
<li>Verificare che <code translate="no">MILVUS_TOKEN</code> sia corretto</li>
<li>Verificare se l'istanza di Milvus richiede l'autenticazione</li>
<li>Assicurarsi di avere i permessi corretti per le operazioni che si sta cercando di eseguire.</li>
</ol>
<h4 id="Tool-Not-Found" class="common-anchor-header">Strumento non trovato</h4><p>Se gli strumenti MCP non appaiono in Claude Desktop o nel Cursore:</p>
<ol>
<li>Riavviare l'applicazione</li>
<li>Controllare i log del server per verificare la presenza di eventuali errori</li>
<li>Verificare che il server MCP funzioni correttamente</li>
<li>Premere il pulsante di aggiornamento nelle impostazioni di MCP (per Cursor).</li>
</ol>
<h3 id="Getting-Help" class="common-anchor-header">Aiuto</h3><p>Se si continuano a riscontrare problemi:</p>
<ol>
<li>Controllare i <a href="https://github.com/zilliztech/mcp-server-milvus/issues">problemi di GitHub</a> per problemi simili.</li>
<li>Unitevi al <a href="https://discord.gg/zilliz">Discord della comunità Zilliz</a> per ricevere supporto</li>
<li>Segnalate un nuovo problema con informazioni dettagliate sul vostro problema.</li>
</ol>
<h2 id="Conclusion" class="common-anchor-header">Conclusione<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>Seguendo questo tutorial, ora avete un <strong>server MCP</strong> funzionante, che abilita la ricerca vettoriale AI in Milvus. Sia che usiate <strong>Claude Desktop</strong> o <strong>Cursor</strong>, ora potete interrogare, gestire e cercare nel vostro database Milvus usando <strong>comandi in linguaggio naturale, senza</strong>scrivere codice per il database!</p>
